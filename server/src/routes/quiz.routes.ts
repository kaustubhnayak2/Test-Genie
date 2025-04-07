import express, { RequestHandler } from 'express';
import { 
  generateQuiz, 
  getQuizById, 
  submitQuiz,
  generateQuizFromFile,
  getUserQuizzes,
  getQuestionExplanation,
  createQuiz,
  generateBasicQuiz,
  deleteQuiz,
  updateQuiz
} from '../controllers/quiz.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create a quiz manually
router.post('/', authenticateToken as RequestHandler, createQuiz as RequestHandler);

// Generate a quiz from a subject
router.post('/generate', authenticateToken as RequestHandler, (async (req, res, next) => {
  try {
    await generateQuiz(req, res);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

// Generate a basic quiz without using AI
router.post('/generate-basic', authenticateToken as RequestHandler, (async (req, res, next) => {
  try {
    await generateBasicQuiz(req, res);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

// Generate a quiz from an uploaded file
router.post('/generate-from-file', authenticateToken as RequestHandler, upload.single('file'), generateQuizFromFile as RequestHandler);

// Get a specific quiz
router.get('/:id', authenticateToken as RequestHandler, getQuizById as RequestHandler);

// Delete a quiz
router.delete('/:id', authenticateToken as RequestHandler, deleteQuiz as RequestHandler);

// Update a quiz
router.put('/:id', authenticateToken as RequestHandler, updateQuiz as RequestHandler);

// Submit a quiz (with answers)
router.post('/:id/submit', authenticateToken as RequestHandler, submitQuiz as RequestHandler);

// Get all quizzes for a user
router.get('/user/quizzes', authenticateToken as RequestHandler, getUserQuizzes as RequestHandler);

// Get AI-generated explanation for a question
router.get('/question/:questionId/explanation', authenticateToken as RequestHandler, getQuestionExplanation as RequestHandler);

export default router; 