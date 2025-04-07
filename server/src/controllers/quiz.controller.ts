import { Request, Response } from 'express';
import fs from 'fs';
import Quiz, { IQuiz } from '../models/quiz.model';
import User from '../models/user.model';
import { 
  generateQuizWithGroq, 
  generateQuizFromTextWithGroq,
  generateExplanation 
} from '../utils/groq';
import { getRandomQuestions, hasQuestionsForSubject, getAvailableSubjects } from '../utils/predefinedQuestions';

// Helper function for generating mock questions when OpenAI fails
const generateMockQuestions = (subject: string, numQuestions: number = 10, difficulty: string = 'medium'): any[] => {
  // First check if we have predefined questions for this subject
  if (hasQuestionsForSubject(subject)) {
    return getRandomQuestions(subject, numQuestions, difficulty as 'easy' | 'medium' | 'hard');
  }
  
  // Fall back to existing mock questions if subject not in predefined list
  // Sample questions by subject
  const questionsBySubject: Record<string, any[]> = {
    'Mathematics': [
      {
        text: 'What is the value of π (pi) to two decimal places?',
        options: [
          { text: '3.14', isCorrect: true },
          { text: '3.16', isCorrect: false },
          { text: '3.12', isCorrect: false },
          { text: '3.18', isCorrect: false }
        ]
      },
      {
        text: 'What is the square root of 144?',
        options: [
          { text: '12', isCorrect: true },
          { text: '14', isCorrect: false },
          { text: '10', isCorrect: false },
          { text: '16', isCorrect: false }
        ]
      },
      {
        text: 'What is the result of 7 × 8?',
        options: [
          { text: '56', isCorrect: true },
          { text: '54', isCorrect: false },
          { text: '58', isCorrect: false },
          { text: '62', isCorrect: false }
        ]
      },
      {
        text: 'What is the formula for the area of a circle?',
        options: [
          { text: 'πr²', isCorrect: true },
          { text: '2πr', isCorrect: false },
          { text: 'πd', isCorrect: false },
          { text: 'πr²/2', isCorrect: false }
        ]
      },
      {
        text: 'What is the sum of the angles in a triangle?',
        options: [
          { text: '180 degrees', isCorrect: true },
          { text: '90 degrees', isCorrect: false },
          { text: '360 degrees', isCorrect: false },
          { text: '270 degrees', isCorrect: false }
        ]
      }
    ],
    'Science': [
      {
        text: 'What is the chemical symbol for gold?',
        options: [
          { text: 'Au', isCorrect: true },
          { text: 'Ag', isCorrect: false },
          { text: 'Fe', isCorrect: false },
          { text: 'Cu', isCorrect: false }
        ]
      },
      {
        text: 'What is the largest planet in our solar system?',
        options: [
          { text: 'Jupiter', isCorrect: true },
          { text: 'Saturn', isCorrect: false },
          { text: 'Neptune', isCorrect: false },
          { text: 'Earth', isCorrect: false }
        ]
      },
      {
        text: 'What is the process by which plants make their own food called?',
        options: [
          { text: 'Photosynthesis', isCorrect: true },
          { text: 'Respiration', isCorrect: false },
          { text: 'Digestion', isCorrect: false },
          { text: 'Fermentation', isCorrect: false }
        ]
      },
      {
        text: 'Which subatomic particle has a positive charge?',
        options: [
          { text: 'Proton', isCorrect: true },
          { text: 'Electron', isCorrect: false },
          { text: 'Neutron', isCorrect: false },
          { text: 'Positron', isCorrect: false }
        ]
      },
      {
        text: 'What is the closest star to Earth?',
        options: [
          { text: 'The Sun', isCorrect: true },
          { text: 'Proxima Centauri', isCorrect: false },
          { text: 'Alpha Centauri', isCorrect: false },
          { text: 'Sirius', isCorrect: false }
        ]
      }
    ],
    'History': [
      {
        text: 'In which year did World War II end?',
        options: [
          { text: '1945', isCorrect: true },
          { text: '1939', isCorrect: false },
          { text: '1944', isCorrect: false },
          { text: '1947', isCorrect: false }
        ]
      },
      {
        text: 'Who was the first President of the United States?',
        options: [
          { text: 'George Washington', isCorrect: true },
          { text: 'Thomas Jefferson', isCorrect: false },
          { text: 'Abraham Lincoln', isCorrect: false },
          { text: 'John Adams', isCorrect: false }
        ]
      },
      {
        text: 'Which civilization built the Machu Picchu?',
        options: [
          { text: 'Inca', isCorrect: true },
          { text: 'Maya', isCorrect: false },
          { text: 'Aztec', isCorrect: false },
          { text: 'Egyptian', isCorrect: false }
        ]
      },
      {
        text: 'Which empire was ruled by Julius Caesar?',
        options: [
          { text: 'Roman Empire', isCorrect: true },
          { text: 'Greek Empire', isCorrect: false },
          { text: 'Byzantine Empire', isCorrect: false },
          { text: 'Ottoman Empire', isCorrect: false }
        ]
      },
      {
        text: 'Which event marked the beginning of World War I?',
        options: [
          { text: 'Assassination of Archduke Franz Ferdinand', isCorrect: true },
          { text: 'German invasion of Poland', isCorrect: false },
          { text: 'The sinking of the Lusitania', isCorrect: false },
          { text: 'Russian Revolution', isCorrect: false }
        ]
      }
    ],
    'Computer Science': [
      {
        text: 'What does CPU stand for?',
        options: [
          { text: 'Central Processing Unit', isCorrect: true },
          { text: 'Central Processing Update', isCorrect: false },
          { text: 'Computer Personal Unit', isCorrect: false },
          { text: 'Core Processing Unit', isCorrect: false }
        ]
      },
      {
        text: 'Which programming language is often used for web development?',
        options: [
          { text: 'JavaScript', isCorrect: true },
          { text: 'C++', isCorrect: false },
          { text: 'Swift', isCorrect: false },
          { text: 'Rust', isCorrect: false }
        ]
      },
      {
        text: 'What does HTML stand for?',
        options: [
          { text: 'Hypertext Markup Language', isCorrect: true },
          { text: 'Hyper Transfer Markup Language', isCorrect: false },
          { text: 'High Text Machine Language', isCorrect: false },
          { text: 'Hyperlink Text Markup Language', isCorrect: false }
        ]
      },
      {
        text: 'Which of these is not a database management system?',
        options: [
          { text: 'Apache', isCorrect: true },
          { text: 'MySQL', isCorrect: false },
          { text: 'PostgreSQL', isCorrect: false },
          { text: 'MongoDB', isCorrect: false }
        ]
      },
      {
        text: 'What is the binary code for the letter A in ASCII?',
        options: [
          { text: '01000001', isCorrect: true },
          { text: '01000010', isCorrect: false },
          { text: '01000011', isCorrect: false },
          { text: '01000100', isCorrect: false }
        ]
      }
    ]
  };

  // Default questions for subjects not in our predefined list
  const defaultQuestions = [
    {
      text: `What is the most important concept in ${subject}?`,
      options: [
        { text: 'Fundamental principles', isCorrect: true },
        { text: 'Historical development', isCorrect: false },
        { text: 'Modern applications', isCorrect: false },
        { text: 'Theoretical frameworks', isCorrect: false }
      ]
    },
    {
      text: `Who is considered the founder of ${subject}?`,
      options: [
        { text: 'The pioneering researcher', isCorrect: true },
        { text: 'A contemporary scholar', isCorrect: false },
        { text: 'An ancient philosopher', isCorrect: false },
        { text: 'A collective group of thinkers', isCorrect: false }
      ]
    },
    {
      text: `What year was ${subject} formally established as a field of study?`,
      options: [
        { text: 'Early 20th century', isCorrect: true },
        { text: 'Late 19th century', isCorrect: false },
        { text: 'Mid 18th century', isCorrect: false },
        { text: 'Ancient times', isCorrect: false }
      ]
    },
    {
      text: `Which of these is NOT a common application of ${subject}?`,
      options: [
        { text: 'Underwater basket weaving', isCorrect: true },
        { text: 'Modern technology', isCorrect: false },
        { text: 'Education', isCorrect: false },
        { text: 'Business', isCorrect: false }
      ]
    },
    {
      text: `What is the most influential book on ${subject}?`,
      options: [
        { text: 'The definitive textbook', isCorrect: true },
        { text: 'An obscure manuscript', isCorrect: false },
        { text: 'A popular science book', isCorrect: false },
        { text: 'A recent publication', isCorrect: false }
      ]
    }
  ];

  // Choose the appropriate question set
  let baseQuestions: any[] = [];
  const normalizedSubject = subject.toLowerCase().trim();
  
  // Find the closest match from our predefined subjects
  for (const [key, questions] of Object.entries(questionsBySubject)) {
    if (key.toLowerCase().includes(normalizedSubject) || normalizedSubject.includes(key.toLowerCase())) {
      baseQuestions = questions;
      break;
    }
  }
  
  // If no matching subject found, use default questions
  if (baseQuestions.length === 0) {
    baseQuestions = defaultQuestions;
  }
  
  // Generate the requested number of questions
  const questions: any[] = [];
  
  // Add all base questions first
  questions.push(...baseQuestions);
  
  // If we need more questions than in our base set, start generating variations
  let i = 0;
  while (questions.length < numQuestions) {
    const baseQuestion = baseQuestions[i % baseQuestions.length];
    
    // Create a variation of the question
    const variation = {
      ...baseQuestion,
      text: `${baseQuestion.text} (variation ${Math.floor(i / baseQuestions.length) + 1})`,
      // Shuffle the options
      options: [...baseQuestion.options].sort(() => Math.random() - 0.5)
    };
    
    questions.push(variation);
    i++;
  }
  
  // Trim to the exact number requested
  return questions.slice(0, numQuestions);
};

// Generate a quiz from a subject
export const generateQuiz = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const { subject, numQuestions = 10, difficulty = 'medium' } = req.body;

    if (!subject) {
      return res.status(400).json({
        success: false,
        message: 'Subject is required'
      });
    }

    console.log('Generating quiz:', { subject, numQuestions, difficulty });

    let questions;
    try {
      // Try to generate questions using AI
      const aiResponse = await generateQuizWithGroq(subject, numQuestions, difficulty);
      console.log('AI response received:', aiResponse);

      if (!aiResponse || !Array.isArray(aiResponse.questions)) {
        console.error('Invalid AI response format:', aiResponse);
        throw new Error('Invalid AI response format');
      }

      questions = aiResponse.questions;
    } catch (aiError) {
      console.error('AI generation failed:', aiError);
      
      // Fall back to predefined questions
      try {
        const predefinedQuestions = getRandomQuestions(subject, numQuestions, difficulty);
        if (predefinedQuestions && predefinedQuestions.length > 0) {
          console.log('Using predefined questions');
          questions = predefinedQuestions;
        } else {
          // If no predefined questions, use mock questions
          console.log('Using mock questions');
          questions = generateMockQuestions(numQuestions);
        }
      } catch (fallbackError) {
        console.error('Fallback question generation failed:', fallbackError);
        throw fallbackError;
      }
    }

    // Create the quiz in the database
    const quiz = new Quiz({
      title: `${subject} Quiz`,
      subject,
      questions,
      difficulty,
      userId: userId
    });

    const savedQuiz = await quiz.save();
    console.log('Quiz saved successfully:', { quizId: savedQuiz._id });

    return res.status(201).json({
      success: true,
      message: 'Quiz generated successfully',
      data: savedQuiz
    });

  } catch (error: any) {
    console.error('Error generating quiz:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate quiz'
    });
  }
};

// Generate a quiz from an uploaded file
export const generateQuizFromFile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authenticated' 
      });
    }

    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'No file uploaded' 
      });
    }

    const { title, description, numQuestions = 10, difficulty = 'medium' } = req.body;
    const filePath = req.file.path;
    const fileSubject = req.file.originalname.split('.')[0] || 'Uploaded file';

    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Generate quiz questions using Groq based on file content
    try {
      const aiResponse = await generateQuizFromTextWithGroq(fileContent, numQuestions, difficulty as 'easy' | 'medium' | 'hard');
    
    // Delete the file after processing
    fs.unlinkSync(filePath);

    // Create quiz in database
    const quiz = new Quiz({
      title: title || `Quiz on ${fileSubject}`,
      subject: fileSubject,
      description: description || `A quiz generated from ${req.file.originalname}`,
      questions: aiResponse.questions,
      userId: req.user.id,
    });

    await quiz.save();

      res.status(201).json({
        success: true,
        data: quiz
      });
    } catch (error) {
      console.error('Error generating quiz from file with AI:', error);
      
      // Fall back to predefined questions if AI fails
      const questions = getRandomQuestions(fileSubject, numQuestions, difficulty as 'easy' | 'medium' | 'hard');
      
      if (questions.length === 0) {
        const mockQuestions = generateMockQuestions(fileSubject, numQuestions, difficulty);
        
        const quiz = new Quiz({
          title: title || `Quiz on ${fileSubject}`,
          subject: fileSubject,
          description: description || `A quiz generated from ${req.file.originalname}`,
          questions: mockQuestions,
          userId: req.user.id,
        });

        await quiz.save();
        
        const availableSubjects = getAvailableSubjects();
        
        return res.status(201).json({
          success: true,
          message: 'Quiz created with mock questions',
          data: quiz,
          availableSubjects
        });
      }
      
      const quiz = new Quiz({
        title: title || `Quiz on ${fileSubject}`,
        subject: fileSubject,
        description: description || `A quiz generated from ${req.file.originalname}`,
        questions,
        userId: req.user.id,
      });

      await quiz.save();
      
      return res.status(201).json({
        success: true,
        message: 'Quiz created with predefined questions',
        data: quiz
      });
    }
  } catch (error) {
    console.error('Error in generateQuizFromFile:', error);
    res.status(500).json({ 
      success: false,
      message: error instanceof Error ? error.message : 'Failed to generate quiz from file' 
    });
  }
};

// Get a specific quiz
export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // If the quiz is not completed, hide the correct answers
    if (!quiz.isCompleted) {
      const strippedQuiz = JSON.parse(JSON.stringify(quiz));
      strippedQuiz.questions = strippedQuiz.questions.map((q: any) => ({
        ...q,
        options: q.options.map((o: any) => ({
          text: o.text,
          _id: o._id,
        })),
      }));
      return res.json(strippedQuiz);
    }

    res.json(quiz);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Submit a quiz with answers
export const submitQuiz = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { id } = req.params;
    const { answers, completionTime } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Answers are required' });
    }

    // Validate completion time if provided
    if (completionTime !== undefined && (!Number.isInteger(completionTime) || completionTime <= 0)) {
      return res.status(400).json({ message: 'Completion time must be a positive integer' });
    }

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check if this is a retake attempt
    const isRetake = req.query.retake === 'true';
    
    // If it's a retake, we don't check if the quiz is already completed
    if (!isRetake && quiz.isCompleted) {
      return res.status(400).json({ message: 'Quiz already completed' });
    }

    if (quiz.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to submit this quiz' });
    }

    // Calculate score
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      const selectedOption = answers[index];
      const correctOption = question.options.find(option => option.isCorrect);
      
      if (correctOption && selectedOption === correctOption._id?.toString()) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / quiz.questions.length) * 100;

    // Update quiz
    quiz.isCompleted = true;
    quiz.score = score;
    quiz.userAnswers = answers;
    
    // Increment attempts counter
    quiz.attempts = (quiz.attempts || 0) + 1;
    
    // Save completion time if provided
    if (completionTime) {
      quiz.completionTime = completionTime;
    }
    
    await quiz.save();

    // Update user stats
    const user = await User.findById(req.user.id);
    if (user) {
      user.quizzesTaken += 1;
      user.totalScore += score;
      user.averageScore = user.totalScore / user.quizzesTaken;
      
      // Update time statistics if completion time is provided
      if (completionTime) {
        // Make sure totalCompletionTime is initialized if it doesn't exist
        if (!user.totalCompletionTime) {
          user.totalCompletionTime = 0;
        }
        
        user.totalCompletionTime += completionTime;
        user.avgCompletionTime = user.totalCompletionTime / user.quizzesTaken;
        
        console.log(`User ${user._id} updated: quizzesTaken=${user.quizzesTaken}, totalScore=${user.totalScore}, avgScore=${user.averageScore}, totalTime=${user.totalCompletionTime}, avgTime=${user.avgCompletionTime}`);
      }
      
      await user.save();
    }

    res.json({
      quiz,
      score,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      timeTaken: completionTime || undefined
    });
  } catch (error: any) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get quizzes for a user
export const getUserQuizzes = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const quizzes = await Quiz.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ 
      success: true,
      data: quizzes 
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Get AI-generated explanation for a question
export const getQuestionExplanation = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const { quizId } = req.query;
    
    if (!quizId) {
      return res.status(400).json({ message: 'Quiz ID is required' });
    }
    
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    const question = quiz.questions.find(q => q._id?.toString() === questionId);
    
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
    const explanation = await generateExplanation(
      question.text, 
      correctOption.text
    );
    
    // Update the quiz with the explanation
    await Quiz.updateOne(
      { _id: quizId, 'questions._id': questionId },
      { $set: { 'questions.$.explanation': explanation } }
    );
    
    res.json({ explanation });
  } catch (error: any) {
    console.error('Error generating explanation:', error);
    res.status(500).json({ message: error.message || 'Failed to generate explanation' });
  }
};

// Create a quiz manually (without AI generation)
export const createQuiz = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authenticated' 
      });
    }

    const { title, subject, description, questions } = req.body;

    if (!title || !subject || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Required fields missing: title, subject, and questions are required' 
      });
    }
    
    // Validate questions structure
    if (!questions.every(q => 
      q.text && 
      Array.isArray(q.options) && 
      q.options.length >= 2 && 
      q.options.some((o: any) => o.isCorrect)
    )) {
      return res.status(400).json({ 
        success: false,
        message: 'Questions must have text, at least 2 options, and at least 1 correct option' 
      });
    }

    // Create quiz in database
    const quiz = new Quiz({
      title,
      subject,
      description: description || `A quiz about ${subject}`,
      questions,
      userId: req.user.id,
    });

    await quiz.save();

    res.status(201).json({
      success: true,
      data: quiz
    });
  } catch (error: any) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to create quiz' 
    });
  }
};

// Generate a quiz with pre-defined questions (no AI needed)
export const generateBasicQuiz = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { title, subject, numQuestions = 10, difficulty = 'medium' } = req.body;

    if (!subject) {
      return res.status(400).json({ message: 'Subject is required' });
    }

    console.log(`Quiz generation started for subject: ${subject}, numQuestions: ${numQuestions}, difficulty: ${difficulty}`);

    try {
      // Generate questions using Groq
      const response = await generateQuizWithGroq(subject, numQuestions, difficulty as 'easy' | 'medium' | 'hard');
      
      if (!response.questions || response.questions.length === 0) {
        throw new Error('No questions generated');
      }

      // Create the quiz with AI-generated questions
      const quiz = new Quiz({
        title: title || `${subject} Quiz`,
        subject,
        description: `A quiz about ${subject}`,
        questions: response.questions,
        userId: req.user.id
      });

      await quiz.save();
      console.log(`Quiz saved to database with ID: ${quiz._id}`);

      res.status(201).json({
        success: true,
        message: 'Quiz created successfully with AI-generated questions',
        data: quiz
      });
    } catch (error: any) {
      console.error('Error generating quiz with AI:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to generate quiz with AI. Please try again later.',
        error: error.message
      });
    }
  } catch (error: any) {
    console.error('Error creating basic quiz:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Delete a quiz
export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authenticated' 
      });
    }

    const quizId = req.params.id;
    
    // Check if quiz exists
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({ 
        success: false, 
        message: 'Quiz not found' 
      });
    }
    
    // Check if user owns the quiz
    if (quiz.userId.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'You do not have permission to delete this quiz' 
      });
    }
    
    // Delete the quiz
    await Quiz.findByIdAndDelete(quizId);
    
    res.json({ 
      success: true,
      message: 'Quiz deleted successfully' 
    });
    
  } catch (error: any) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Update a quiz
export const updateQuiz = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authenticated' 
      });
    }

    const quizId = req.params.id;
    const { title, subject, description, questions } = req.body;
    
    // Check if quiz exists
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({ 
        success: false,
        message: 'Quiz not found' 
      });
    }
    
    // Check if user owns the quiz
    if (quiz.userId.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'You do not have permission to update this quiz' 
      });
    }
    
    // Prepare update data
    const updateData: any = {};
    
    if (title) updateData.title = title;
    if (subject) updateData.subject = subject;
    if (description) updateData.description = description;
    if (questions) updateData.questions = questions;
    
    // Update the quiz
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      { $set: updateData },
      { new: true }
    );
    
    res.json({ 
      success: true,
      message: 'Quiz updated successfully',
      data: updatedQuiz
    });
    
  } catch (error: any) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
}; 