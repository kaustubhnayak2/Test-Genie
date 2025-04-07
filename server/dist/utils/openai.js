"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuizFromText = exports.generateExplanation = exports.generateQuizWithAI = void 0;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const generateQuizWithAI = (subject, numQuestions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
        const completion = yield openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
            temperature: 0.7,
            response_format: { type: 'json_object' },
        });
        const responseContent = completion.choices[0].message.content;
        if (!responseContent) {
            throw new Error('Failed to generate quiz content');
        }
        return JSON.parse(responseContent);
    }
    catch (error) {
        console.error('Error generating quiz with OpenAI:', error);
        throw error;
    }
});
exports.generateQuizWithAI = generateQuizWithAI;
const generateExplanation = (question, answer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prompt = `The question is: "${question}"
The correct answer is: "${answer}"
Please provide a detailed explanation of why this answer is correct, including relevant facts and concepts.`;
        const completion = yield openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
            temperature: 0.7,
        });
        const explanation = completion.choices[0].message.content;
        if (!explanation) {
            throw new Error('Failed to generate explanation');
        }
        return explanation;
    }
    catch (error) {
        console.error('Error generating explanation with OpenAI:', error);
        throw error;
    }
});
exports.generateExplanation = generateExplanation;
const generateQuizFromText = (text, numQuestions) => __awaiter(void 0, void 0, void 0, function* () {
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
        const completion = yield openai.chat.completions.create({
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
    }
    catch (error) {
        console.error('Error generating quiz from text with OpenAI:', error);
        throw error;
    }
});
exports.generateQuizFromText = generateQuizFromText;
