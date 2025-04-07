import { QuestionType } from '../../types/quiz';
import { programmingQuestions } from './programming';
import { dataStructuresQuestions } from './dataStructures';
import { databaseQuestions } from './database';
import { webdevQuestions } from './webdev';
import { networksQuestions } from './networks';

// Define type for predefined questions map
export type PredefinedQuestionsMap = {
  [key: string]: QuestionType[];
};

// Export all question sets
export const predefinedQuestions: PredefinedQuestionsMap = {
  'Programming Languages': programmingQuestions,
  'Data Structures & Algorithms': dataStructuresQuestions,
  'Database Systems': databaseQuestions,
  'Web Development': webdevQuestions,
  'Computer Networks': networksQuestions
};

// Helper function to get available subjects
export const getAvailableSubjects = (): string[] => {
  return Object.keys(predefinedQuestions);
};

// Helper function to check if a subject has predefined questions
export const hasQuestionsForSubject = (subject: string): boolean => {
  return Object.keys(predefinedQuestions).includes(subject);
};

// Helper function to get random questions for a subject with specific count and difficulty
export const getRandomQuestions = (
  subject: string,
  count: number = 10,
  difficulty: string = 'medium'
): QuestionType[] => {
  if (!hasQuestionsForSubject(subject)) {
    return [];
  }

  const allQuestions = predefinedQuestions[subject];
  
  // Shuffle questions
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  
  // Take requested count
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Helper function to get question count for a subject
export const getQuestionCountForSubject = (subject: string): number => {
  if (!hasQuestionsForSubject(subject)) {
    return 0;
  }
  
  return predefinedQuestions[subject].length;
};

// Helper function to get total question count across all subjects
export const getTotalQuestionCount = (): number => {
  return Object.values(predefinedQuestions)
    .reduce((total, questions) => total + questions.length, 0);
}; 