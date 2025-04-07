import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import { quizAPI } from '../api';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form states
  const [quizTitle, setQuizTitle] = useState('');
  const [generationType, setGenerationType] = useState('subject'); // 'subject' or 'custom'
  const [subject, setSubject] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isLoading, setIsLoading] = useState(false);

  // Predefined subjects
  const subjects = [
    'Programming Languages', 
    'Data Structures & Algorithms', 
    'Database Systems', 
    'Web Development', 
    'Computer Networks'
  ];

  // Form validation
  const validateForm = () => {
    if (!quizTitle.trim()) {
      toast.error('Please enter a quiz title');
      return false;
    }
    
    if (generationType === 'subject' && !subject) {
      toast.error('Please select a subject');
      return false;
    }
    
    if (generationType === 'custom' && !customSubject.trim()) {
      toast.error('Please enter a subject');
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      
      // Determine subject based on generation type
      const subjectToUse = generationType === 'subject' ? subject : customSubject;
      
      console.log('Creating quiz with settings:', {
        title: quizTitle,
        subject: subjectToUse,
        numQuestions,
        difficulty
      });
      
      let newQuiz;
      
      // Generate quiz from subject using AI
      try {
        newQuiz = await quizAPI.generateQuiz({
          title: quizTitle,
          subject: subjectToUse,
          numQuestions,
          difficulty
        });
        
        console.log('Quiz created successfully:', newQuiz);
        
        if (!newQuiz || !newQuiz._id) {
          console.error('Invalid quiz response:', newQuiz);
          throw new Error('Invalid quiz response: missing quiz data');
        }
        
        toast.success('Quiz created successfully!');
        navigate('/dashboard');
      } catch (aiError: any) {
        console.error('Error creating quiz:', aiError);
        
        // If AI generation fails due to quota limits, fall back to basic questions
        if (aiError.response?.data?.message?.includes('quota') || 
            aiError.response?.data?.message?.includes('limit')) {
          
          toast.info('AI quota exceeded. Using basic questions instead.');
          
          try {
            newQuiz = await quizAPI.generateBasicQuiz({
              title: quizTitle,
              subject: subjectToUse,
              numQuestions,
              difficulty
            });
            
            console.log('Basic quiz created successfully:', newQuiz);
            
            if (!newQuiz || !newQuiz._id) {
              console.error('Invalid basic quiz response:', newQuiz);
              throw new Error('Invalid basic quiz response: missing quiz data');
            }
            
            toast.success('Quiz created successfully!');
            navigate('/dashboard');
          } catch (basicError: any) {
            console.error('Error creating basic quiz:', basicError);
            throw new Error(`Failed to create basic quiz: ${basicError.message}`);
          }
        } else {
          // If it's another error, rethrow it
          throw aiError;
        }
      }
    } catch (error: any) {
      console.error('Error creating quiz:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create quiz. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Quiz</h1>
          <p className="mt-2 text-gray-600">Generate questions by selecting a subject or typing a subject name</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          {isLoading ? (
            <div className="py-12">
              <LoadingSpinner text="Generating your quiz..." />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Quiz Title */}
              <div>
                <label htmlFor="quizTitle" className="form-label">Quiz Title</label>
                <input
                  id="quizTitle"
                  type="text"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  className="form-input"
                  placeholder="Enter a title for your quiz"
                  required
                />
              </div>
              
              {/* Generation Type */}
              <div>
                <label className="form-label">Select Option</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setGenerationType('subject')}
                    className={`p-4 rounded-lg border-2 text-center hover:border-blue-500 ${
                      generationType === 'subject' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-center mb-2">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                      </svg>
                    </div>
                    <p className="font-medium">Select Subject</p>
                    <p className="text-sm text-gray-500 mt-1">Choose from predefined subjects</p>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setGenerationType('custom')}
                    className={`p-4 rounded-lg border-2 text-center hover:border-blue-500 ${
                      generationType === 'custom' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-center mb-2">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                      </svg>
                    </div>
                    <p className="font-medium">Custom Subject</p>
                    <p className="text-sm text-gray-500 mt-1">Enter any subject or topic</p>
                  </button>
                </div>
              </div>
              
              {/* Subject Selection (if generation type is 'subject') */}
              {generationType === 'subject' && (
                <div>
                  <label htmlFor="subject" className="form-label">Select Subject</label>
                  <select
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-select"
                    required
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subj) => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                </div>
              )}
              
              {/* Custom Subject (if generation type is 'custom') */}
              {generationType === 'custom' && (
                <div>
                  <label htmlFor="customSubject" className="form-label">Enter Subject or Topic</label>
                  <input
                    id="customSubject"
                    type="text"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="form-input"
                    placeholder="E.g., Quantum Physics, American Civil War, etc."
                    required
                  />
                </div>
              )}
              
              {/* Number of Questions */}
              <div>
                <label htmlFor="numQuestions" className="form-label">Number of Questions</label>
                <select
                  id="numQuestions"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                  className="form-select"
                >
                  <option value={5}>5 questions</option>
                  <option value={10}>10 questions</option>
                  <option value={15}>15 questions</option>
                  <option value={20}>20 questions</option>
                  <option value={25}>25 questions</option>
                  <option value={30}>30 questions</option>
                </select>
              </div>
              
              {/* Difficulty */}
              <div>
                <label htmlFor="difficulty" className="form-label">Difficulty Level</label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                  className="form-select"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full btn btn-primary"
                >
                  Create Quiz
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz; 