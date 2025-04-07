import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Add custom interface for Ethereal test accounts which include testMessageUrl
interface EtherealMessageInfo extends nodemailer.SentMessageInfo {
  testMessageUrl?: string;
}

// Configure nodemailer with test account or env variables
// For development/testing, we'll use Ethereal Email
const createTransporter = async () => {
  // For production, use your own SMTP settings
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      console.log('Using production email configuration');
      
      // Get port and secure settings
      const port = parseInt(process.env.EMAIL_PORT || '587');
      const secure = process.env.EMAIL_SECURE === 'true';
      
      console.log(`Email config: host=${process.env.EMAIL_HOST}, port=${port}, secure=${secure}`);
      
      // Create transport with SSL/TLS options
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: port,
        secure: secure,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        // Add this option to ignore SSL certificate errors for testing
        tls: {
          rejectUnauthorized: process.env.NODE_ENV === 'production' 
        }
      });
    } catch (error) {
      console.error('Failed to create email transport with production settings:', error);
      console.log('Falling back to Ethereal test account');
      // Fall through to Ethereal
    }
  }

  // For development, create a test account using Ethereal
  try {
    console.log('Attempting to create Ethereal test email account');
    const testAccount = await nodemailer.createTestAccount();
    console.log('Ethereal account created successfully');
    
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (error) {
    console.error('Failed to create Ethereal test account:', error);
    console.log('Falling back to mock email implementation');
    
    // Fallback to a mock implementation if Ethereal fails
    return createMockTransporter();
  }
};

// Create a mock transporter that saves emails to files
const createMockTransporter = () => {
  return {
    sendMail: async (mailOptions: any): Promise<any> => {
      const mockFilePath = path.join(process.cwd(), 'mock-emails');
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(mockFilePath)) {
        fs.mkdirSync(mockFilePath, { recursive: true });
      }
      
      // Generate a unique ID for this email
      const emailId = Date.now().toString();
      const filePath = path.join(mockFilePath, `email-${emailId}.html`);
      
      // Create email content
      const emailContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .email-container { border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
              .header { border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 20px; }
              .footer { border-top: 1px solid #eee; padding-top: 10px; margin-top: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <strong>From:</strong> ${mailOptions.from}<br>
                <strong>To:</strong> ${mailOptions.to}<br>
                <strong>Subject:</strong> ${mailOptions.subject}
              </div>
              
              <div class="body">
                ${mailOptions.html || `<pre>${mailOptions.text}</pre>` || '(No content)'}
              </div>
              
              <div class="footer">
                This is a mock email created by Test Genie application.<br>
                Generated at: ${new Date().toISOString()}
              </div>
            </div>
          </body>
        </html>
      `;
      
      // Write email to file
      fs.writeFileSync(filePath, emailContent);
      
      console.log(`Mock email saved to: ${filePath}`);
      
      // Return mock info
      return {
        messageId: `mock-${emailId}@testgenie.com`,
        testMessageUrl: `file://${filePath}`
      };
    }
  };
};

// Email sending function
export const sendEmail = async (options: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) => {
  try {
    const transporter = await createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Test Genie <noreply@testgenie.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };
    
    console.log(`Sending email to: ${options.to}, subject: ${options.subject}`);
    const info = await transporter.sendMail(mailOptions) as EtherealMessageInfo;
    
    // For Ethereal emails, return the URL to view the test email
    if (info.messageId && info.testMessageUrl) {
      console.log('Email sent successfully, preview URL:', info.testMessageUrl);
      return info.testMessageUrl;
    }
    
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}; 