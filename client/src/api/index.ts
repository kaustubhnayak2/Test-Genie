import axios, { AxiosError } from 'axios';
import { 
  User, 
  Quiz, 
  QuizSettings, 
  QuizUpdateData, 
  LeaderboardEntry,
  UserStats,
  APIResponse,
  QuizSubmissionResult,
  AuthResponse
} from '../types';

// Configuration and Constants
const USE_MOCK_API = false; // Set to false to use real MongoDB backend

// Get the server IP address from environment variable or use the current hostname
const SERVER_IP = import.meta.env.VITE_SERVER_IP || '192.168.168.60'; // Your computer's IP address
const API_URL = import.meta.env.VITE_API_URL || `http://${SERVER_IP}:5000/api`;

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Timeout after 10 seconds
  timeout: 10000,
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const err = error as AxiosError;
    
    console.error('API Response Error:', {
      status: err.response?.status,
      message: err.message,
      data: err.response?.data
    });
    
    // Handle session expiration
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Mock data helpers
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const randomId = () => Math.random().toString(36).substring(2, 15);

const mockQuizzes: Quiz[] = [
  {
    _id: '1',
    title: 'Introduction to JavaScript',
    subject: 'Programming',
    description: 'Test your knowledge of JavaScript basics',
    questions: 10,
    userId: '1',
    createdAt: new Date().toISOString(),
    isCompleted: false,
    attempts: 0
  },
  {
    _id: '2',
    title: 'World History',
    subject: 'History',
    description: 'Quiz on major historical events',
    questions: 15,
    userId: '1',
    createdAt: new Date().toISOString(),
    isCompleted: true,
    score: 80,
    attempts: 2
  }
];

// Auth API
export const authAPI = {
  register: async (name: string, email: string, password: string): Promise<APIResponse<AuthResponse>> => {
    if (USE_MOCK_API) {
      await delay(800); // Simulate network delay
      
      const mockUser: User = {
        _id: randomId(),
        name,
        email,
        quizzesTaken: 0,
        averageScore: 0,
        totalScore: 0,
        createdAt: new Date().toISOString(),
        role: 'user'
      };
      
      const mockToken = 'mock-token-' + randomId();
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return {
        success: true,
        message: 'Registration successful',
        data: {
          token: mockToken,
          user: mockUser
        }
      };
    }
    
    const { data } = await api.post('/auth/register', { name, email, password });
    return data;
  },
  
  login: async (email: string, password: string): Promise<APIResponse<AuthResponse>> => {
    if (USE_MOCK_API) {
      await delay(800);
      
      const mockUser: User = {
        _id: '1',
        name: 'Test User',
        email,
        quizzesTaken: 12,
        averageScore: 85.5,
        totalScore: 1026,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        role: 'user',
        averageCompletionTime: 276
      };
      
      const mockToken = 'mock-token-' + randomId();
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return {
        success: true,
        message: 'Login successful',
        data: {
          token: mockToken,
          user: mockUser
        }
      };
    }
    
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },
  
  getCurrentUser: async (): Promise<APIResponse<User>> => {
    if (USE_MOCK_API) {
      await delay(500);
      
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        throw new Error('User not found');
      }
      
      const user = JSON.parse(userStr);
      
      return {
        success: true,
        data: user
      };
    }
    
    const { data } = await api.get('/auth/me');
    return data;
  },
  
  updateProfile: async (userData: Partial<User>): Promise<APIResponse<User>> => {
    if (USE_MOCK_API) {
      await delay(800);
      
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        throw new Error('User not found');
      }
      
      const user = JSON.parse(userStr);
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return {
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser
      };
    }
    
    const { data } = await api.put('/auth/profile', userData);
    return data;
  },
  
  getUserStats: async (): Promise<APIResponse<UserStats>> => {
    if (USE_MOCK_API) {
      await delay(600);
      
      return {
        success: true,
        data: {
          quizzesTaken: 12,
          averageScore: 85.5,
          totalScore: 1026,
          quizzesCreated: 5,
          averageCompletionTime: 192
        }
      };
    }
    
    const { data } = await api.get('/auth/stats');
    return data;
  }
};

interface SubmitQuizParams {
  quizId: string;
  answers: string[];
  completionTime: number; // in seconds
  isRetake?: boolean;
}

// Quiz API
export const quizAPI = {
  createQuiz: async (quizData: Partial<Quiz>): Promise<Quiz> => {
    if (USE_MOCK_API) {
      await delay(1000);
      
      const newQuiz: Quiz = {
        _id: randomId(),
        title: quizData.title || 'Untitled Quiz',
        subject: quizData.subject || 'General',
        description: quizData.description || '',
        questions: Array.isArray(quizData.questions) ? quizData.questions.length : 0,
        userId: '1',
        createdAt: new Date().toISOString(),
        isCompleted: false,
        attempts: 0
      };
      
      mockQuizzes.push(newQuiz);
      
      return newQuiz;
    }
    
    const { data } = await api.post('/quiz', quizData);
    return data.data;
  },
  
  generateQuiz: async (quizSettings: QuizSettings): Promise<Quiz> => {
    if (USE_MOCK_API) {
      await delay(2000);
      
      const newQuiz: Quiz = {
        _id: randomId(),
        title: quizSettings.title || `${quizSettings.subject} Quiz`,
        subject: quizSettings.subject,
        description: quizSettings.description || `A quiz about ${quizSettings.subject}`,
        questions: quizSettings.numQuestions,
        userId: '1',
        createdAt: new Date().toISOString(),
        isCompleted: false,
        attempts: 0
      };
      
      mockQuizzes.push(newQuiz);
      
      return newQuiz;
    }
    
    console.log('Sending quiz generation request:', quizSettings);
    const response = await api.post('/quiz/generate', quizSettings);
    console.log('Received quiz response:', response.data);
    
    // Check if the response has the expected structure
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    } else {
      console.error('Unexpected response format:', response.data);
      throw new Error('Invalid response format from server');
    }
  },
  
  generateQuizFromFile: async (file: File, quizSettings: Partial<QuizSettings>): Promise<Quiz> => {
    if (USE_MOCK_API) {
      await delay(3000);
      
      const newQuiz: Quiz = {
        _id: randomId(),
        title: quizSettings.title || `Quiz from ${file.name}`,
        subject: quizSettings.subject || 'File Upload',
        description: quizSettings.description || `Quiz generated from uploaded file ${file.name}`,
        questions: quizSettings.numQuestions || 10,
        userId: '1',
        createdAt: new Date().toISOString(),
        isCompleted: false,
        attempts: 0
      };
      
      mockQuizzes.push(newQuiz);
      
      return newQuiz;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    
    if (quizSettings.title) {
      formData.append('title', quizSettings.title);
    }
    
    if (quizSettings.description) {
      formData.append('description', quizSettings.description);
    }
    
    if (quizSettings.numQuestions) {
      formData.append('numQuestions', quizSettings.numQuestions.toString());
    }
    
    const { data } = await api.post('/quiz/generate-from-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return data.data;
  },
  
  getQuizById: async (quizId: string): Promise<Quiz> => {
    if (USE_MOCK_API) {
      await delay(500);
      
      const quiz = mockQuizzes.find(q => q._id === quizId);
      if (!quiz) {
        throw new Error('Quiz not found');
      }
      
      return quiz;
    }
    
    try {
      console.log('Fetching quiz with ID:', quizId);
      const response = await api.get(`/quiz/${quizId}`);
      console.log('Quiz response:', response);
      
      // The server returns the quiz directly in the response data
      if (!response.data) {
        console.error('No quiz data received');
        throw new Error('No quiz data received');
      }
      
      // Log the quiz data for debugging
      console.log('Quiz data:', response.data);
      
      // Ensure the quiz data has the required properties
      if (!response.data._id || !response.data.questions) {
        console.error('Invalid quiz data structure:', response.data);
        throw new Error('Invalid quiz data structure');
      }
      
      // Process the quiz data to ensure it has the correct structure
      // The server intentionally strips isCorrect for incomplete quizzes
      // For completed quizzes, we should use the isCorrect value from the server
      const processedQuiz = {
        ...response.data,
        questions: response.data.questions.map((question: any) => ({
          ...question,
          options: question.options.map((option: any) => {
            // For completed quizzes, use the server's isCorrect value
            // For incomplete quizzes, the server strips isCorrect, so we set it to false
            const isCorrect = response.data.isCompleted ? option.isCorrect : false;
            
            // Log the option and its isCorrect value for debugging
            console.log('Option:', option.text, 'isCorrect:', isCorrect);
            
            return {
              ...option,
              isCorrect
            };
          })
        }))
      };
      
      console.log('Processed quiz data:', processedQuiz);
      return processedQuiz;
    } catch (error: any) {
      console.error('Error fetching quiz:', error);
      if (error.response?.status === 404) {
        throw new Error('Quiz not found');
      }
      throw error;
    }
  },
  
  updateQuiz: async (quizId: string, quizData: QuizUpdateData): Promise<Quiz> => {
    if (USE_MOCK_API) {
      await delay(800);
      
      const quizIndex = mockQuizzes.findIndex(q => q._id === quizId);
      if (quizIndex === -1) {
        throw new Error('Quiz not found');
      }
      
      const updatedQuiz = {
        ...mockQuizzes[quizIndex],
        ...quizData,
      };
      
      mockQuizzes[quizIndex] = updatedQuiz;
      
      return updatedQuiz;
    }
    
    try {
      const response = await api.put(`/quiz/${quizId}`, quizData);
      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to update quiz');
      }
    } catch (error: any) {
      console.error('Error updating quiz:', error);
      throw error;
    }
  },
  
  deleteQuiz: async (quizId: string): Promise<APIResponse<null>> => {
    if (USE_MOCK_API) {
      await delay(700);
      
      const quizIndex = mockQuizzes.findIndex(q => q._id === quizId);
      if (quizIndex !== -1) {
        mockQuizzes.splice(quizIndex, 1);
      }
      
      return {
        success: true,
        message: 'Quiz deleted successfully',
        data: null
      };
    }
    
    try {
      const response = await api.delete(`/quiz/${quizId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error deleting quiz:', error);
      throw error;
    }
  },
  
  submitQuiz: async (params: SubmitQuizParams): Promise<QuizSubmissionResult> => {
    if (USE_MOCK_API) {
      await delay(1000);
      
      const quizIndex = mockQuizzes.findIndex(q => q._id === params.quizId);
      if (quizIndex === -1) {
        throw new Error('Quiz not found');
      }
      
      const quiz = mockQuizzes[quizIndex];
      const score = Math.floor(Math.random() * 101);
      
      mockQuizzes[quizIndex] = {
        ...quiz,
        isCompleted: true,
        score,
        attempts: (quiz.attempts || 0) + 1
      };
      
      return {
        quiz: mockQuizzes[quizIndex],
        score,
        correctAnswers: Math.floor(score / 10),
        totalQuestions: 10,
        timeTaken: params.completionTime,
        feedback: 'Great job! Keep practicing to improve your score.'
      };
    }
    
    const { quizId, answers, completionTime, isRetake } = params;
    console.log('Submitting quiz answers:', { quizId, answers, completionTime, isRetake });
    
    try {
      // Add retake parameter to the URL if it's a retake attempt
      const url = `/quiz/${quizId}/submit${isRetake ? '?retake=true' : ''}`;
      
      const response = await api.post(url, { 
        answers, 
        completionTime 
      });
      
      console.log('Server response:', response.data);
      
      if (!response.data || !response.data.quiz) {
        throw new Error('Invalid response from server');
      }
      
      // Process the quiz data to ensure isCorrect is properly set
      const processedQuiz = {
        ...response.data.quiz,
        questions: response.data.quiz.questions.map((question: any) => ({
          ...question,
          options: question.options.map((option: any) => {
            // Log the option and its isCorrect value for debugging
            console.log('Submitted quiz option:', option.text, 'isCorrect:', option.isCorrect);
            
            return {
              ...option,
              isCorrect: option.isCorrect
            };
          })
        }))
      };
      
      return {
        quiz: processedQuiz,
        score: response.data.score,
        correctAnswers: response.data.correctAnswers,
        totalQuestions: response.data.totalQuestions,
        timeTaken: response.data.timeTaken || completionTime,
        feedback: response.data.feedback || 'Quiz completed successfully!'
      };
    } catch (error: any) {
      console.error('Error submitting quiz:', error);
      throw error;
    }
  },
  
  getUserQuizzes: async (): Promise<Quiz[]> => {
    if (USE_MOCK_API) {
      await delay(700);
      return mockQuizzes;
    }
    
    const { data } = await api.get('/quiz/user/quizzes');
    return data.data;
  },
  
  getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
    if (USE_MOCK_API) {
      await delay(1000);
      
      // Generate mock leaderboard data
      const mockLeaderboard = Array.from({ length: 20 }, (_, i) => ({
        _id: randomId(),
        userName: `User ${i + 1}`,
        quizCount: Math.floor(Math.random() * 50) + 1,
        totalScore: Math.floor(Math.random() * 5000),
        averageScore: Math.floor(Math.random() * 100),
        avgCompletionTime: Math.floor(Math.random() * 300) + 60,
        rank: i + 1
      }));
      
      // Sort by score descending
      return mockLeaderboard.sort((a, b) => b.averageScore - a.averageScore);
    }
    
    try {
      const { data } = await api.get('/user/leaderboard');
      if (data.success && Array.isArray(data.data)) {
        return data.data;
      } else {
        console.error('Invalid leaderboard data format:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  },
  
  getPublicQuizzes: async (): Promise<Quiz[]> => {
    if (USE_MOCK_API) {
      await delay(600);
      
      return mockQuizzes.filter(quiz => quiz.isPublic);
    }
    
    const { data } = await api.get('/quiz/public');
    return data.data;
  },
  
  // Generate quiz with basic pre-defined questions (no AI needed)
  generateBasicQuiz: async (settings: QuizSettings): Promise<Quiz> => {
    if (USE_MOCK_API) {
      await delay(1000);
      
      // Create mock quiz with basic structure
      const newQuiz: Quiz = {
        _id: randomId(),
        title: settings.title || `${settings.subject} Quiz`,
        subject: settings.subject,
        description: settings.description || `A basic quiz about ${settings.subject}`,
        questions: settings.numQuestions,
        userId: '1',
        createdAt: new Date().toISOString(),
        isCompleted: false,
        attempts: 0
      };
      
      mockQuizzes.push(newQuiz);
      
      return newQuiz;
    }
    
    const response = await api.post('/quiz/generate-basic', settings);
    return response.data.data;
  },
  
  getQuestionExplanation: async (questionId: string, quizId: string): Promise<{ explanation: string }> => {
    if (USE_MOCK_API) {
      await delay(1000);
      return {
        explanation: 'This is a mock explanation for the question.'
      };
    }
    
    const { data } = await api.get(`/quiz/question/${questionId}/explanation?quizId=${quizId}`);
    return data;
  },
};

export default api; 