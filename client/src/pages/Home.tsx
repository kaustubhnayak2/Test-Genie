import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="py-12 px-4">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            {isAuthenticated && user
              ? `Welcome back, ${user.name}!`
              : 'Create AI-Powered Quizzes in Seconds'}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {isAuthenticated
              ? 'Continue your learning journey with personalized quizzes powered by artificial intelligence.'
              : 'Test Genie uses artificial intelligence to generate quizzes from any subject. Perfect for students, teachers, and learning enthusiasts.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-primary px-6 py-3">
                  Go to Dashboard
                </Link>
                <Link to="/create-quiz" className="btn btn-outline px-6 py-3">
                  Create a Quiz
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary px-6 py-3">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline px-6 py-3">
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="card p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quick Generation</h3>
            <p className="text-gray-600">Create quizzes within seconds using our AI technology. Just provide a topic or upload your notes.</p>
          </div>
          
          <div className="card p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Analysis</h3>
            <p className="text-gray-600">Get detailed analysis of your quiz performance, with personalized feedback and improvement suggestions.</p>
          </div>
          
          <div className="card p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Share & Compete</h3>
            <p className="text-gray-600">Share your quizzes with friends or classmates, and compete on our leaderboard for top scores.</p>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Create a Quiz</h3>
              <p className="text-gray-600">Enter a topic, upload study materials or use our templates to generate questions.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Take the Quiz</h3>
              <p className="text-gray-600">Answer the questions and see your results instantly with detailed explanations.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor your improvement over time with our analytics dashboard.</p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Learning?</h2>
          <p className="text-xl text-gray-600 mb-8">
            {isAuthenticated 
              ? 'Access your dashboard to see your quizzes and progress.'
              : 'Join thousands of students and educators using Test Genie to improve their learning experience.'}
          </p>
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-primary px-8 py-3 text-lg">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/register" className="btn btn-primary px-8 py-3 text-lg">
              Get Started for Free
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 