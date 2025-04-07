import mongoose, { Schema, Document } from 'mongoose';

interface IOption extends Document {
  text: string;
  isCorrect: boolean;
}

interface IQuestion extends Document {
  text: string;
  options: IOption[];
  explanation?: string;
}

export interface IQuiz extends Document {
  title: string;
  subject: string;
  description?: string;
  questions: IQuestion[];
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  isCompleted: boolean;
  score?: number;
  userAnswers?: string[];
  completionTime?: number; // in seconds - how long it took to complete
  attempts?: number; // number of attempts made on this quiz
}

const OptionSchema: Schema = new Schema({
  text: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  }
});

const QuestionSchema: Schema = new Schema({
  text: {
    type: String,
    required: true
  },
  options: {
    type: [OptionSchema],
    required: true,
    validate: [
      {
        validator: function(options: IOption[]) {
          return options.length >= 2 && options.length <= 5;
        },
        message: 'Questions must have between 2 and 5 options'
      },
      {
        validator: function(options: IOption[]) {
          return options.some(option => option.isCorrect === true);
        },
        message: 'At least one option must be correct'
      }
    ]
  },
  explanation: {
    type: String
  }
});

const QuizSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  questions: {
    type: [QuestionSchema],
    required: true,
    validate: {
      validator: function(questions: IQuestion[]) {
        return questions.length > 0;
      },
      message: 'A quiz must have at least one question'
    }
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number
  },
  userAnswers: {
    type: [String]
  },
  completionTime: {
    type: Number
  },
  attempts: {
    type: Number,
    default: 0
  }
});

export default mongoose.model<IQuiz>('Quiz', QuizSchema); 