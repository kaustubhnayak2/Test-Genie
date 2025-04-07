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
exports.getQuestionExplanation = exports.getUserQuizzes = exports.submitQuiz = exports.getQuizById = exports.generateQuizFromFile = exports.generateQuiz = void 0;
const fs_1 = __importDefault(require("fs"));
const quiz_model_1 = __importDefault(require("../models/quiz.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const openai_1 = require("../utils/openai");
// Generate a quiz from a subject
const generateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const { subject, title, description, numQuestions = 10 } = req.body;
        if (!subject) {
            return res.status(400).json({ message: 'Subject is required' });
        }
        // Generate quiz questions using OpenAI
        const aiResponse = yield (0, openai_1.generateQuizWithAI)(subject, numQuestions);
        // Create quiz in database
        const quiz = new quiz_model_1.default({
            title: title || `Quiz on ${subject}`,
            subject,
            description: description || `A quiz about ${subject}`,
            questions: aiResponse.questions,
            userId: req.user.id,
        });
        yield quiz.save();
        res.status(201).json(quiz);
    }
    catch (error) {
        console.error('Error generating quiz:', error);
        res.status(500).json({ message: error.message || 'Failed to generate quiz' });
    }
});
exports.generateQuiz = generateQuiz;
// Generate a quiz from an uploaded file
const generateQuizFromFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const { title, description, numQuestions = 10 } = req.body;
        const filePath = req.file.path;
        // Read file content
        const fileContent = fs_1.default.readFileSync(filePath, 'utf8');
        // Generate quiz questions using OpenAI based on file content
        const aiResponse = yield (0, openai_1.generateQuizFromText)(fileContent, numQuestions);
        // Delete the file after processing
        fs_1.default.unlinkSync(filePath);
        // Determine the subject from the file
        const fileSubject = req.file.originalname.split('.')[0] || 'Uploaded file';
        // Create quiz in database
        const quiz = new quiz_model_1.default({
            title: title || `Quiz on ${fileSubject}`,
            subject: fileSubject,
            description: description || `A quiz generated from ${req.file.originalname}`,
            questions: aiResponse.questions,
            userId: req.user.id,
        });
        yield quiz.save();
        res.status(201).json(quiz);
    }
    catch (error) {
        console.error('Error generating quiz from file:', error);
        res.status(500).json({ message: error.message || 'Failed to generate quiz from file' });
    }
});
exports.generateQuizFromFile = generateQuizFromFile;
// Get a specific quiz
const getQuizById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const quiz = yield quiz_model_1.default.findById(id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        // If the quiz is not completed, hide the correct answers
        if (!quiz.isCompleted) {
            const strippedQuiz = JSON.parse(JSON.stringify(quiz));
            strippedQuiz.questions = strippedQuiz.questions.map((q) => (Object.assign(Object.assign({}, q), { options: q.options.map((o) => ({
                    text: o.text,
                    _id: o._id,
                })) })));
            return res.json(strippedQuiz);
        }
        res.json(quiz);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getQuizById = getQuizById;
// Submit a quiz with answers
const submitQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const { id } = req.params;
        const { answers } = req.body;
        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ message: 'Answers are required' });
        }
        const quiz = yield quiz_model_1.default.findById(id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        if (quiz.isCompleted) {
            return res.status(400).json({ message: 'Quiz already completed' });
        }
        if (quiz.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to submit this quiz' });
        }
        // Calculate score
        let correctAnswers = 0;
        quiz.questions.forEach((question, index) => {
            var _a;
            const selectedOption = answers[index];
            const correctOption = question.options.find(option => option.isCorrect);
            if (correctOption && selectedOption === ((_a = correctOption._id) === null || _a === void 0 ? void 0 : _a.toString())) {
                correctAnswers++;
            }
        });
        const score = (correctAnswers / quiz.questions.length) * 100;
        // Update quiz
        quiz.isCompleted = true;
        quiz.score = score;
        quiz.userAnswers = answers;
        yield quiz.save();
        // Update user stats
        const user = yield user_model_1.default.findById(req.user.id);
        if (user) {
            user.quizzesTaken += 1;
            user.totalScore += score;
            user.averageScore = user.totalScore / user.quizzesTaken;
            yield user.save();
        }
        res.json({
            quiz,
            score,
            correctAnswers,
            totalQuestions: quiz.questions.length,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.submitQuiz = submitQuiz;
// Get quizzes for a user
const getUserQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const quizzes = yield quiz_model_1.default.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(quizzes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserQuizzes = getUserQuizzes;
// Get AI-generated explanation for a question
const getQuestionExplanation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { questionId } = req.params;
        const { quizId } = req.query;
        if (!quizId) {
            return res.status(400).json({ message: 'Quiz ID is required' });
        }
        const quiz = yield quiz_model_1.default.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        const question = quiz.questions.find(q => { var _a; return ((_a = q._id) === null || _a === void 0 ? void 0 : _a.toString()) === questionId; });
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        // If explanation already exists, return it
        if (question.explanation) {
            return res.json({ explanation: question.explanation });
        }
        // Find the correct answer
        const correctOption = question.options.find(o => o.isCorrect);
        if (!correctOption) {
            return res.status(400).json({ message: 'No correct answer found for this question' });
        }
        // Generate explanation with AI
        const explanation = yield (0, openai_1.generateExplanation)(question.text, correctOption.text);
        // Update the quiz with the explanation
        yield quiz_model_1.default.updateOne({ _id: quizId, 'questions._id': questionId }, { $set: { 'questions.$.explanation': explanation } });
        res.json({ explanation });
    }
    catch (error) {
        console.error('Error generating explanation:', error);
        res.status(500).json({ message: error.message || 'Failed to generate explanation' });
    }
});
exports.getQuestionExplanation = getQuestionExplanation;
