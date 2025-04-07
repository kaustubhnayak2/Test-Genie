import { Groq } from "groq-sdk";
import { QuestionType } from "../types/quiz";

// Initialize Groq client with API key if available
let groq: Groq | null = null;
try {
  console.log("Checking for GROQ_API_KEY environment variable...");
  
  // Use hardcoded API key for testing
  const apiKey = "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";
  console.log("Using hardcoded API key for testing");
  
  groq = new Groq({
    apiKey: apiKey,
  });
  console.log("Groq client initialized successfully");
} catch (error) {
  console.error("Error initializing Groq client:", error);
}

export const generateQuizWithGroq = async (
  subject: string, 
  numQuestions: number,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): Promise<any> => {
  try {
    if (!groq) {
      throw new Error('Groq client not available');
    }
    
    console.log(`Generating ${difficulty} difficulty quiz about "${subject}" with ${numQuestions} questions using Groq...`);
    
    const prompt = `Generate a ${difficulty} difficulty quiz about ${subject} with ${numQuestions} multiple-choice questions. 
Each question should have 4 options with only one correct answer.
For ${difficulty} difficulty:
- Easy: Basic concepts, straightforward questions
- Medium: Moderate complexity, some application of concepts
- Hard: Complex scenarios, deep understanding required

IMPORTANT: Generate completely unique questions that are different from any previous questions.
Make sure each question is specific to ${subject} and tests different aspects of the topic.

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

    console.log('Sending request to Groq...');
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.9, // Increased temperature for more variety
      response_format: { type: 'json_object' },
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('Failed to generate quiz content');
    }

    console.log('Successfully received response from Groq');
    const parsedResponse = JSON.parse(responseContent);
    console.log(`Generated ${parsedResponse.questions?.length || 0} questions`);
    
    return parsedResponse;
  } catch (error) {
    console.error('Error generating quiz with Groq:', error);
    throw error; // Throw error instead of falling back
  }
};

export const generateQuizFromTextWithGroq = async (
  text: string, 
  numQuestions: number,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): Promise<any> => {
  try {
    if (!groq) {
      throw new Error('Groq client not available');
    }
    
    const prompt = `Based on the following text, generate a ${difficulty} difficulty quiz with ${numQuestions} multiple-choice questions. 
Each question should have 4 options with only one correct answer.
For ${difficulty} difficulty:
- Easy: Basic concepts, straightforward questions
- Medium: Moderate complexity, some application of concepts
- Hard: Complex scenarios, deep understanding required

IMPORTANT: Generate completely unique questions that are different from any previous questions.
Make sure each question is specific to the content of the provided text.

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

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.9, // Increased temperature for more variety
      response_format: { type: 'json_object' },
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('Failed to generate quiz content from text');
    }

    return JSON.parse(responseContent);
  } catch (error) {
    console.error('Error generating quiz from text with Groq:', error);
    throw error; // Throw error instead of falling back
  }
};

export const generateExplanation = async (question: string, answer: string): Promise<string> => {
  try {
    if (!groq) {
      throw new Error('Groq client not available');
    }
    
    const prompt = `The question is: "${question}"
The correct answer is: "${answer}"
Please provide a detailed explanation of why this answer is correct, including relevant facts and concepts.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
    });

    const explanation = completion.choices[0].message.content;
    if (!explanation) {
      throw new Error('Failed to generate explanation');
    }

    return explanation;
  } catch (error) {
    console.error('Error generating explanation with Groq:', error);
    throw error; // Throw error instead of falling back
  }
}; 