import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { quizAPI } from '../api';
import { Quiz, QuizUpdateData, QuizQuestion, QuizOption } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';

// Predefined list of subjects (same as in CreateQuiz)
const SUBJECT_LIST = [
  'Mathematics', 
  'Physics', 
  'Chemistry', 
  'Biology', 
  'History',
  'Geography', 
  'Literature', 
  'Computer Science',
  'Economics', 
  'Psychology',
  'Art',
  'Music',
  'Political Science',
  'Philosophy',
  'Engineering',
  'Medicine',
  'Law',
  'Business',
  'Finance',
  'Marketing'
];

const EditQuiz = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [formData, setFormData] = useState<QuizUpdateData>({
    title: '',
    subject: '',
    description: '',
    questions: [],
    isPublic: false,
    tags: []
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);
  const [tagInput, setTagInput] = useState('');

  // Fetch quiz data on component mount
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!quizId) {
          throw new Error('Quiz ID is required');
        }
        
        const data = await quizAPI.getQuizById(quizId);
        setQuiz(data);
        
        // Initialize form data
        setFormData({
          title: data.title,
          subject: data.subject,
          description: data.description || '',
          questions: data.questions,
          isPublic: data.isPublic || false,
          tags: data.tags || []
        });
        
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Failed to load quiz data';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Error fetching quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Handle basic form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox for isPublic
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle question text change
  const handleQuestionChange = (questionIndex: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    const updatedQuestions = [...formData.questions!];
    if (name === 'text') {
      updatedQuestions[questionIndex].text = value;
    } else if (name === 'explanation') {
      updatedQuestions[questionIndex].explanation = value;
    }
    
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  // Handle option text change
  const handleOptionChange = (questionIndex: number, optionIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    const updatedQuestions = [...formData.questions!];
    updatedQuestions[questionIndex].options[optionIndex].text = value;
    
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  // Set an option as correct
  const handleSetCorrectOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...formData.questions!];
    
    // Set all options as not correct
    updatedQuestions[questionIndex].options.forEach(option => {
      option.isCorrect = false;
    });
    
    // Set the selected option as correct
    updatedQuestions[questionIndex].options[optionIndex].isCorrect = true;
    
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  // Add a new tag
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    // Don't add duplicate tags
    if (formData.tags?.includes(tagInput.trim())) {
      toast.warning('This tag already exists');
      return;
    }
    
    setFormData({
      ...formData,
      tags: [...(formData.tags || []), tagInput.trim()]
    });
    
    setTagInput('');
  };

  // Remove a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(tag => tag !== tagToRemove)
    });
  };

  // Validate the form before submission
  const validateForm = () => {
    if (!formData.title?.trim()) {
      setError('Quiz title is required');
      toast.error('Quiz title is required');
      return false;
    }
    
    if (!formData.subject?.trim()) {
      setError('Subject is required');
      toast.error('Subject is required');
      return false;
    }
    
    if (!formData.questions?.length) {
      setError('At least one question is required');
      toast.error('At least one question is required');
      return false;
    }
    
    // Check if all questions have text
    for (let i = 0; i < formData.questions.length; i++) {
      if (!formData.questions[i].text.trim()) {
        setError(`Question ${i + 1} text is required`);
        toast.error(`Question ${i + 1} text is required`);
        return false;
      }
      
      // Check if all questions have options
      if (!formData.questions[i].options.length) {
        setError(`Question ${i + 1} must have at least one option`);
        toast.error(`Question ${i + 1} must have at least one option`);
        return false;
      }
      
      // Check if all options have text
      for (let j = 0; j < formData.questions[i].options.length; j++) {
        if (!formData.questions[i].options[j].text.trim()) {
          setError(`Option ${j + 1} in Question ${i + 1} text is required`);
          toast.error(`Option ${j + 1} in Question ${i + 1} text is required`);
          return false;
        }
      }
      
      // Check if each question has a correct option
      const hasCorrectOption = formData.questions[i].options.some(option => option.isCorrect);
      if (!hasCorrectOption) {
        setError(`Question ${i + 1} must have a correct option`);
        toast.error(`Question ${i + 1} must have a correct option`);
        return false;
      }
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setSubmitting(true);
      setError(null);
      
      if (!quizId) {
        throw new Error('Quiz ID is required');
      }
      
      await quizAPI.updateQuiz(quizId, formData);
      
      toast.success('Quiz updated successfully!');
      navigate(`/quiz/${quizId}`);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update quiz. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error updating quiz:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading quiz data" />;
  }

  if (error && !quiz) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-20 pb-12">
        <div className="container-custom">
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-neutral-100 text-center">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Failed to load quiz</h2>
            <p className="text-neutral-600 mb-6">{error}</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="btn btn-primary"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 pb-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 sm:p-10 text-white mb-8 shadow-soft">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h1 className="text-3xl font-display font-bold mb-2">Edit Quiz</h1>
                <p className="text-primary-100">Update your quiz content and settings</p>
              </div>
              <motion.button 
                onClick={() => navigate(`/quiz/${quizId}`)}
                className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl inline-flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414 0l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Preview Quiz</span>
              </motion.button>
            </div>
          </div>
          
          {/* Edit Quiz Form */}
          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-neutral-100 mb-8"
            >
              <h2 className="text-xl font-semibold text-neutral-800 mb-6">Basic Information</h2>
              
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="form-label">
                      Quiz Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="form-label">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        list="subjectOptions"
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="input pr-10"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <datalist id="subjectOptions">
                      {SUBJECT_LIST.map(subject => (
                        <option key={subject} value={subject} />
                      ))}
                    </datalist>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input min-h-[100px] resize-y"
                    placeholder="Add a description for your quiz"
                  ></textarea>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="form-label mb-0">Tags</label>
                    <span className="text-xs text-neutral-500">
                      {formData.tags?.length || 0} tags added
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags?.map(tag => (
                      <div 
                        key={tag} 
                        className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {tag}
                        <button 
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-primary-400 hover:text-primary-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      className="input rounded-r-none"
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 rounded-r-lg flex items-center transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2">
                    Press Enter or click the add button to add a tag
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPublic"
                      name="isPublic"
                      checked={formData.isPublic}
                      onChange={handleChange}
                      className="form-checkbox"
                    />
                    <label htmlFor="isPublic" className="ml-2 text-neutral-800">
                      Make this quiz public
                    </label>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    Public quizzes can be discovered and taken by other users
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Questions Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-neutral-100 mb-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-neutral-800">
                  Questions ({formData.questions?.length || 0})
                </h2>
              </div>
              
              <div className="space-y-6">
                {formData.questions?.map((question, questionIndex) => (
                  <div 
                    key={question._id || questionIndex}
                    className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                      activeQuestionIndex === questionIndex 
                        ? 'border-primary-500 shadow-md' 
                        : 'border-neutral-200'
                    }`}
                  >
                    <div 
                      className={`p-4 flex justify-between items-center cursor-pointer hover:bg-neutral-50 ${
                        activeQuestionIndex === questionIndex 
                          ? 'bg-primary-50' 
                          : 'bg-white'
                      }`}
                      onClick={() => setActiveQuestionIndex(
                        activeQuestionIndex === questionIndex ? null : questionIndex
                      )}
                    >
                      <div className="flex items-center">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium mr-3">
                          {questionIndex + 1}
                        </span>
                        <h3 className="font-medium text-neutral-800 line-clamp-1">
                          {question.text || 'Untitled Question'}
                        </h3>
                      </div>
                      <div className="flex items-center">
                        <span className="text-neutral-500 text-sm mr-2">
                          {question.options.length} options
                        </span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 text-neutral-400 transition-transform ${
                            activeQuestionIndex === questionIndex ? 'transform rotate-180' : ''
                          }`} 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {activeQuestionIndex === questionIndex && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-neutral-200 p-4"
                        >
                          <div className="space-y-4">
                            <div>
                              <label className="form-label">
                                Question Text <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="text"
                                value={question.text}
                                onChange={(e) => handleQuestionChange(questionIndex, e)}
                                className="input"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="form-label">
                                Options <span className="text-red-500">*</span>
                              </label>
                              <div className="space-y-2">
                                {question.options.map((option, optionIndex) => (
                                  <div 
                                    key={option._id || optionIndex}
                                    className="flex items-center"
                                  >
                                    <div className="flex-grow flex items-center">
                                      <input
                                        type="radio"
                                        name={`correct-option-${questionIndex}`}
                                        checked={option.isCorrect}
                                        onChange={() => handleSetCorrectOption(questionIndex, optionIndex)}
                                        className="form-checkbox mr-2"
                                      />
                                      <input
                                        type="text"
                                        value={option.text}
                                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                                        className="input"
                                        placeholder={`Option ${optionIndex + 1}`}
                                        required
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="text-xs text-neutral-500 mt-1">
                                Select the radio button next to the correct answer
                              </div>
                            </div>
                            
                            <div>
                              <label className="form-label">Explanation (Optional)</label>
                              <textarea
                                name="explanation"
                                value={question.explanation || ''}
                                onChange={(e) => handleQuestionChange(questionIndex, e)}
                                className="input resize-y"
                                placeholder="Explain why the correct answer is right"
                              ></textarea>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <motion.button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn btn-outline"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              
              <motion.button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {submitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving Changes...
                  </div>
                ) : 'Save Changes'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EditQuiz; 