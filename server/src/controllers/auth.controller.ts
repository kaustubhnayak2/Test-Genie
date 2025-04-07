import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sendEmail } from '../utils/email';

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        quizzesTaken: user.quizzesTaken,
        averageScore: user.averageScore,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        quizzesTaken: user.quizzesTaken,
        averageScore: user.averageScore,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Handle forgot password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    
    // Generate a reset token even if user doesn't exist (security measure)
    // This prevents attackers from determining if an email exists
    const token = crypto.randomBytes(20).toString('hex');
    const resetUrl = `${req.headers.origin || process.env.CLIENT_URL}/reset-password/${token}`;
    
    // If user exists, save the token to their account
    if (user) {
      // Save the token and expiry to the user's account
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
      await user.save();
      
      console.log(`Reset token for ${email}: ${token}`);
      console.log(`Reset URL: ${resetUrl}`);
    }
    
    // Send a response with the token and URL for testing (in production, this would be emailed)
    res.json({
      success: true,
      message: 'If your email is registered with us, you will receive password reset instructions shortly.',
      resetToken: token, // Only for testing/development
      resetUrl: resetUrl // Only for testing/development
    });
  } catch (error: any) {
    console.error('Error in forgot password:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error processing request'
    });
  }
};

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Password reset token is invalid or has expired.'
      });
    }

    // Update password (will be hashed by pre-save hook)
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    // Generate a JWT for auto-login
    const payload = {
      id: user._id,
      email: user.email
    };

    const jwtSecret = process.env.JWT_SECRET || 'default_secret';
    const tokenJWT = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
    
    // Return a response with token and user info for auto-login
    res.json({
      success: true,
      message: 'Password has been reset successfully.',
      token: tokenJWT,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error: any) {
    console.error('Error in reset password:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error resetting password'
    });
  }
}; 