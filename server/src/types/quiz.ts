export interface OptionType {
  text: string;
  isCorrect: boolean;
}

export interface QuestionType {
  text: string;
  options: OptionType[];
  explanation?: string;
} 