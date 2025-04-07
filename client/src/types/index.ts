export interface User {
  _id: string;
  name: string;
  email: string;
  imageUrl?: string;
  quizzesTaken: number;
  averageScore: number;
  totalScore: number;
  createdAt: string;
  lastLogin?: string;
  role?: 'user' | 'admin';
  averageCompletionTime?: number;
}

export interface QuizOption {
  _id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  _id: string;
  text: string;
  options: QuizOption[];
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: 'multiple-choice' | 'true-false';
}

export interface Quiz {
  _id: string;
  title: string;
  subject: string;
  description?: string;
  questions: QuizQuestion[];
  userId: string;
  createdAt: string;
  updatedAt?: string;
  isCompleted: boolean;
  score?: number;
  userAnswers?: Record<string, string>;
  timeLimit?: number; // in minutes
  completionTime?: number; // in seconds - how long it took to complete
  isPublic?: boolean;
  tags?: string[];
  attempts: number;
}

export interface QuizUpdateData {
  title?: string;
  subject?: string;
  description?: string;
  questions?: QuizQuestion[];
  isPublic?: boolean;
  tags?: string[];
}

export interface LeaderboardEntry {
  _id: string;
  userId?: string;
  userName: string;
  userEmail?: string;
  userImage?: string;
  quizCount: number;
  totalScore: number;
  averageScore: number;
  avgCompletionTime?: number; // average completion time in seconds
  rank?: number;
}

export interface QuizSettings {
  subject: string;
  numQuestions: number;
  title?: string;
  description?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed';
  timeLimit?: number;
}

export interface UserStats {
  quizzesTaken: number;
  averageScore: number;
  totalScore: number;
  quizzesCreated: number;
  lastQuizTaken?: Quiz;
  averageCompletionTime?: number;
}

export interface APIResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface QuizSubmissionResult {
  quiz: Quiz;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number; // in seconds
  feedback?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  authError: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  clearAuthError: () => void;
}

export interface RouteParams {
  quizId: string;
}

export interface ToastOptions {
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  autoClose?: number | false;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  theme?: 'light' | 'dark' | 'colored';
}

export interface FormErrors {
  [key: string]: string;
} 