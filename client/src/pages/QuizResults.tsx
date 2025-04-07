import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizAPI } from '../api';
import { Quiz } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-hot-toast';

const QuizResults = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!id) return;
        
        const data = await quizAPI.getQuizById(id);
        
        // If quiz is not completed, redirect to take the quiz
        if (!data.isCompleted) {
          navigate(`/quiz/${id}`);
          return;
        }
        
        setQuiz(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load quiz results');
        console.error('Error fetching quiz results:', err);
        toast.error('Failed to load quiz results');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id, navigate]);

  const toggleQuestion = (index: number) => {
    if (expandedQuestion === index) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(index);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading quiz results..." />;
  }

  if (error || !quiz) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Results</h2>
          <p className="text-gray-600 mb-6">{error || 'Failed to load quiz results'}</p>
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

  const score = quiz.score || 0;

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
              {quiz.completionTime && (
                <p className="text-gray-600 font-medium">
                  Time taken: {Math.floor(quiz.completionTime / 60)}m {quiz.completionTime % 60}s
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {quiz.questions.map((question, index) => {
              const userAnswer = quiz.userAnswers?.[index];
              const selectedOption = question.options.find(opt => opt._id === userAnswer);
              const correctOption = question.options.find(opt => opt.isCorrect);
              const isCorrect = selectedOption?._id === correctOption?._id;

              return (
                <div 
                  key={index}
                  className={`border rounded-lg p-4 ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleQuestion(index)}
                  >
                    <h3 className="text-lg font-medium text-gray-900">
                      Question {index + 1}
                    </h3>
                    <span className={`badge ${isCorrect ? 'badge-success' : 'badge-error'}`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  {expandedQuestion === index && (
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-700">{question.text}</p>
                      
                      <div className="space-y-2">
                        {question.options.map((option) => {
                          const isSelected = option._id === userAnswer;
                          const isCorrectAnswer = option.isCorrect;
                          
                          return (
                            <div
                              key={option._id}
                              className={`p-3 rounded-lg ${
                                isSelected && isCorrectAnswer
                                  ? 'bg-green-100 border border-green-200'
                                  : isSelected
                                  ? 'bg-red-100 border border-red-200'
                                  : isCorrectAnswer
                                  ? 'bg-green-100 border border-green-200'
                                  : 'bg-gray-50 border border-gray-200'
                              }`}
                            >
                              <div className="flex items-center">
                                <span className="mr-2">
                                  {isSelected && isCorrectAnswer ? '✓' :
                                   isSelected ? '✗' :
                                   isCorrectAnswer ? '✓' : ''}
                                </span>
                                <span>{option.text}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {question.explanation && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">Explanation</h4>
                          <p className="text-blue-800">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="btn btn-primary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults; 