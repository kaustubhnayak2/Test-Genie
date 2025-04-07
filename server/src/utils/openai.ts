import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Debug: Log the OpenAI API key format (first and last 4 chars)
const apiKey = process.env.OPENAI_API_KEY;
if (apiKey) {
  const keyLength = apiKey.length;
  const maskedKey = apiKey.substring(0, 4) + '...' + apiKey.substring(keyLength - 4);
  console.log(`OpenAI API Key loaded [${maskedKey}], length: ${keyLength}`);
} else {
  console.error('OpenAI API Key not found in environment variables!');
  
  // For debugging: Try to read the .env file directly
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    console.log(`Attempting to read .env file from: ${envPath}`);
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const lines = envContent.split('\n');
      const openaiKeyLine = lines.find(line => line.startsWith('OPENAI_API_KEY='));
      if (openaiKeyLine) {
        console.log('Found OPENAI_API_KEY in .env file');
      } else {
        console.log('OPENAI_API_KEY not found in .env file');
      }
    } else {
      console.log('.env file not found');
    }
  } catch (error) {
    console.error('Error reading .env file:', error);
  }
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateQuizWithAI = async (
  subject: string, 
  numQuestions: number
): Promise<any> => {
  try {
    console.log(`Generating quiz about "${subject}" with ${numQuestions} questions...`);
    
    const prompt = `Generate a quiz about ${subject} with ${numQuestions} multiple-choice questions. 
Each question should have 4 options with only one correct answer.
Format the response as a valid JSON with the following structure:
{
  "questions": [
    {
      "text": "Question text",
      "options": [
        { "text": "Option 1", "isCorrect": false },
        { "text": "Option 2", "isCorrect": true },
        { "text": "Option 3", "isCorrect": false },
        { "text": "Option 4", "isCorrect": false }
      ],
      "explanation": "A brief explanation of why the correct answer is right"
    }
  ]
}`;

    console.log('Sending request to OpenAI...');
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('Failed to generate quiz content');
    }

    console.log('Successfully received response from OpenAI');
    const parsedResponse = JSON.parse(responseContent);
    console.log(`Generated ${parsedResponse.questions?.length || 0} questions`);
    
    return parsedResponse;
  } catch (error) {
    console.error('Error generating quiz with OpenAI:', error);
    throw error;
  }
};

export const generateExplanation = async (question: string, answer: string): Promise<string> => {
  try {
    const prompt = `The question is: "${question}"
The correct answer is: "${answer}"
Please provide a detailed explanation of why this answer is correct, including relevant facts and concepts.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
    });

    const explanation = completion.choices[0].message.content;
    if (!explanation) {
      throw new Error('Failed to generate explanation');
    }

    return explanation;
  } catch (error) {
    console.error('Error generating explanation with OpenAI:', error);
    throw error;
  }
};

export const generateQuizFromText = async (
  text: string, 
  numQuestions: number
): Promise<any> => {
  try {
    const prompt = `Based on the following text, generate a quiz with ${numQuestions} multiple-choice questions. 
Each question should have 4 options with only one correct answer.
Format the response as a valid JSON with the following structure:
{
  "questions": [
    {
      "text": "Question text",
      "options": [
        { "text": "Option 1", "isCorrect": false },
        { "text": "Option 2", "isCorrect": true },
        { "text": "Option 3", "isCorrect": false },
        { "text": "Option 4", "isCorrect": false }
      ],
      "explanation": "A brief explanation of why the correct answer is right"
    }
  ]
}

The text to generate questions from is:
${text}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo-16k',
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('Failed to generate quiz content from text');
    }

    return JSON.parse(responseContent);
  } catch (error) {
    console.error('Error generating quiz from text with OpenAI:', error);
    throw error;
  }
}; 