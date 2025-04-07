import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import { quizAPI } from '../api';
import { Quiz } from '../types';

const TakeQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Add time tracking
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  // Start timer when quiz loads
  useEffect(() => {
    if (quiz && !isQuizCompleted) {
      startTime.current = Date.now();
      setTimerActive(true);
    }
  }, [quiz, isQuizCompleted]);

  // Timer effect
  useEffect(() => {
    if (timerActive) {
      timerRef.current = window.setInterval(() => {
        if (startTime.current) {
          const currentTime = Math.floor((Date.now() - startTime.current) / 1000);
          setElapsedTime(currentTime);
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerActive]);

  useEffect(() => {
    // Fetch the quiz data from the API
    const fetchQuiz = async () => {
      setIsLoading(true);
      try {
        if (!id) {
          toast.error('Quiz ID is required');
          navigate('/dashboard');
          return;
        }
        
        // Check if this is a retake attempt
        const urlParams = new URLSearchParams(window.location.search);
        const isRetake = urlParams.get('retake') === 'true';
        
        console.log('Fetching quiz with ID:', id, 'Retake:', isRetake);
        const quizData = await quizAPI.getQuizById(id);
        console.log('Received quiz data:', quizData);
        
        // Check if the quiz is already completed and this is not a retake attempt
        if (quizData.isCompleted && !isRetake) {
          console.log('Quiz is already completed and this is not a retake attempt');
          toast.info('This quiz has already been completed. You can view your results or try again.');
          // Set the quiz data but mark it as already completed
          setQuiz({
            ...quizData,
            isCompleted: true
          });
          setIsQuizCompleted(true);
          setIsLoading(false);
          return;
        }
        
        // If this is a retake attempt, create a new quiz object with isCompleted set to false
        if (isRetake) {
          console.log('Setting up quiz for retake');
          const retakeQuiz: Quiz = {
            ...quizData,
            isCompleted: false,
            score: undefined,
            userAnswers: undefined,
            completionTime: undefined
          };
          setQuiz(retakeQuiz);
          setSelectedOptions(new Array(retakeQuiz.questions.length).fill(-1));
          setIsLoading(false);
          return;
        }
        
        // Validate and process the quiz data
        if (!quizData || !quizData.questions || !Array.isArray(quizData.questions)) {
          throw new Error('Invalid quiz data received');
        }
        
        // Process each question to ensure options have isCorrect property
        const validQuestions = quizData.questions.map((question: any) => {
          // Ensure options array exists and is valid
          if (!question.options || !Array.isArray(question.options)) {
            console.error('Invalid options for question:', question);
            throw new Error('Invalid question options');
          }
          
          // Process each option to ensure isCorrect is properly set
          const validOptions = question.options.map((option: any) => {
            // Log the option for debugging
            console.log('Processing option:', option);
            
            // Use the isCorrect value from the API response
            // The API already handles setting isCorrect to false for incomplete quizzes
            return {
              _id: option._id || Math.random().toString(36).substring(2, 9),
              text: option.text || 'Invalid option',
              isCorrect: option.isCorrect
            };
          });
          
          return {
            _id: question._id || Math.random().toString(36).substring(2, 9),
            text: question.text || 'Invalid question',
            options: validOptions,
            explanation: question.explanation || ''
          };
        });
        
        // Create a valid quiz object
        const validQuiz: Quiz = {
          _id: quizData._id,
          title: quizData.title || 'Untitled Quiz',
          subject: quizData.subject || 'General',
          description: quizData.description || '',
          questions: validQuestions,
          userId: quizData.userId || '',
          createdAt: quizData.createdAt || new Date().toISOString(),
          updatedAt: quizData.updatedAt,
          isCompleted: false,
          score: quizData.score,
          userAnswers: quizData.userAnswers,
          timeLimit: quizData.timeLimit,
          completionTime: quizData.completionTime,
          isPublic: quizData.isPublic,
          tags: quizData.tags,
          attempts: quizData.attempts || 0
        };
        
        console.log('Valid quiz object:', validQuiz);
        setQuiz(validQuiz);
        setSelectedOptions(new Array(validQuestions.length).fill(-1));
      } catch (error: any) {
        console.error('Error fetching quiz:', error);
        toast.error(error.message || 'Failed to load quiz. Please try again.');
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuiz();
  }, [id, navigate]);

  const handleOptionSelect = (optionIndex: number) => {
    if (!quiz) return;
    
    // Update selected options
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
    
    // Get the selected option
    const selectedOption = quiz.questions[currentQuestionIndex].options[optionIndex];
    
    // Log the selected option
    console.log('Selected option:', {
      questionText: quiz.questions[currentQuestionIndex].text,
      optionText: selectedOption.text,
      optionId: selectedOption._id,
      isCorrect: selectedOption.isCorrect
    });
    
    // Show the answer
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const handleFinishQuiz = async () => {
    if (!quiz) return;
    
    // Check if the quiz is already completed
    if (quiz.isCompleted) {
      toast.info('This quiz has already been completed. You can view your results or try again.');
      navigate(`/quiz-results/${quiz._id}`);
      return;
    }
    
    // Format answers for submission - convert to array format expected by server
    const answers: string[] = [];
    quiz.questions.forEach((question, index) => {
      const selectedOptionIndex = selectedOptions[index];
      if (selectedOptionIndex !== -1) {
        const selectedOption = question.options[selectedOptionIndex];
        // Make sure we're using the option ID, not the index
        answers[index] = selectedOption._id;
        console.log(`Question ${index}: Selected option ID: ${selectedOption._id}, Text: ${selectedOption.text}`);
      } else {
        // If no option was selected, use an empty string
        answers[index] = '';
        console.log(`Question ${index}: No option selected`);
      }
    });
    
    // Calculate completion time with fallback
    const completionTime = Math.floor((Date.now() - (startTime.current || Date.now())) / 1000);
    
    // Check if this is a retake attempt
    const urlParams = new URLSearchParams(window.location.search);
    const isRetake = urlParams.get('retake') === 'true';
    
    // Log the submission data for debugging
    console.log('Submitting quiz:', {
      quizId: quiz._id,
      answers,
      completionTime,
      isRetake
    });
    
    try {
      // Submit quiz results
      const result = await quizAPI.submitQuiz({
        quizId: quiz._id,
        answers,
        completionTime,
        isRetake
      });
      
      console.log('Quiz submission result:', result);
      
      // Update the quiz with the server response
      if (result && result.quiz) {
        // Update the quiz with the server response
        setQuiz(result.quiz);
        
        // Update the score with the server-calculated score
        if (result.score !== undefined) {
          setScore(result.score);
        }
        
        // Log the correct answers from the server
        console.log('Server-calculated score:', result.score);
        console.log('Server-calculated correct answers:', result.correctAnswers);
        
        // Show success message with the server-calculated score
        toast.success(`Quiz completed! Your score: ${result.score.toFixed(1)}%`);
      } else {
        // Show success message with a default score
        toast.success('Quiz completed!');
      }
      
      // Set quiz as completed
      setIsQuizCompleted(true);
      
      // Navigate to results page
      navigate(`/quiz-results/${quiz._id}`);
    } catch (error: any) {
      console.error('Error submitting quiz:', error);
      
      // More detailed error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        
        // Check if the error is because the quiz is already completed
        if (error.response.status === 400 && error.response.data.message && 
            error.response.data.message.includes('already completed')) {
          toast.info('This quiz has already been completed. You can view your results or try again.');
          navigate(`/quiz-results/${quiz._id}`);
          return;
        }
        
        toast.error(`Error: ${error.response.data.message || 'Failed to submit quiz'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        toast.error('Network error. Please check your connection and try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        toast.error(error.message || 'Failed to submit quiz. Please try again.');
      }
    }
  };

  const handleTryAgain = () => {
    if (!quiz) return;
    
    // Navigate to the quiz with the retake parameter
    navigate(`/quiz/${quiz._id}?retake=true`);
  };
  
  // Format time for display (MM:SS)
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Loading quiz..." />;
  }

  if (!quiz) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Not Found</h2>
          <p className="text-gray-600 mb-6">The quiz you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="btn btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isAllQuestionsAnswered = selectedOptions.every(option => option !== -1);

  if (isQuizCompleted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Quiz Results</h1>
              <p className="mt-2 text-gray-600">{quiz.title}</p>
            </div>
            
            <div className="flex flex-col items-center justify-center py-10">
              <div className="relative w-48 h-48 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-40 h-40">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                      strokeDasharray="100, 100"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={score >= 70 ? "#10B981" : score >= 40 ? "#FBBF24" : "#EF4444"}
                      strokeWidth="3"
                      strokeDasharray={`${score}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-900">
                    {Math.round(score)}%
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {score >= 80 ? "Excellent!" : 
                   score >= 60 ? "Good job!" : 
                   score >= 40 ? "Not bad!" : "Keep practicing!"}
                </h2>
                <p className="text-gray-600 mb-2">
                  You answered {Math.round((score / 100) * quiz.questions.length)} 
                  {" "}out of {quiz.questions.length} questions correctly.
                </p>
                <p className="text-gray-600 font-medium">
                  Time taken: {formatTime(elapsedTime)}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleTryAgain} 
                  className="btn btn-primary px-6 py-2"
                >
                  Try Again
                </button>
                <button 
                  onClick={() => navigate('/dashboard')} 
                  className="btn btn-secondary px-6 py-2"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 md:p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
              <span className="badge badge-blue">{quiz.subject}</span>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Time: <span className="font-medium ml-1">{formatTime(elapsedTime)}</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {currentQuestion.text}
            </h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOptions[currentQuestionIndex] === index;
                
                // Determine the button color based on selection and correctness
                let buttonColorClass = 'border-gray-200 hover:border-gray-300 hover:bg-gray-50';
                if (showAnswer) {
                  if (isSelected) {
                    // If this is the selected option, show green if correct, red if incorrect
                    buttonColorClass = option.isCorrect 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-red-500 bg-red-50';
                  } else if (option.isCorrect) {
                    // If this is not the selected option but is correct, show green
                    buttonColorClass = 'border-green-500 bg-green-50';
                  }
                } else if (isSelected) {
                  // If not showing answer yet but this is selected
                  buttonColorClass = 'border-blue-500 bg-blue-50';
                }
                
                return (
                  <button
                    key={index}
                    className={`w-full text-left p-4 border rounded-lg transition-colors ${buttonColorClass}`}
                    onClick={() => handleOptionSelect(index)}
                    disabled={showAnswer}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        showAnswer && option.isCorrect
                          ? 'bg-green-500 text-white'
                          : showAnswer && isSelected && !option.isCorrect
                            ? 'bg-red-500 text-white'
                            : isSelected && !showAnswer
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {showAnswer && currentQuestion.explanation && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Explanation:</h3>
                <p className="text-blue-700">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center pt-4 border-t border-gray-200">
            <div className="mt-4 sm:mt-0 w-full sm:w-auto">
              <button
                onClick={handlePreviousQuestion}
                className="btn btn-secondary px-4 py-2"
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
            </div>
            
            <div className="flex w-full sm:w-auto gap-3">
              {isLastQuestion ? (
                <button
                  onClick={handleFinishQuiz}
                  className="btn btn-primary px-4 py-2"
                  disabled={!isAllQuestionsAnswered}
                >
                  Finish Quiz
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="btn btn-primary px-4 py-2"
                  disabled={!showAnswer}
                >
                  Next Question
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;