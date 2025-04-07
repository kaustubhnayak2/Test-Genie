import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import { quizAPI } from '../api';

interface LeaderboardUser {
  _id: string;
  name: string;
  imageUrl?: string;
  score: number;
  quizzesTaken: number;
  avgCompletionTime: number; // average completion time in seconds
  rank: number;
}

const Leaderboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'allTime'>('allTime');
  const [currentPage, setCurrentPage] = useState(1);
  const [userRank, setUserRank] = useState<LeaderboardUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const usersPerPage = 10;

  // Format time for display (MM:SS)
  const formatTime = (seconds: number): string => {
    if (!seconds) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch real leaderboard from API
        const leaderboardData = await quizAPI.getLeaderboard();
        
        // Transform to our format and add rank
        const rankedUsers: LeaderboardUser[] = leaderboardData.map((userData, index) => ({
          _id: userData._id,
          name: userData.userName,
          imageUrl: userData.userImage,
          score: userData.averageScore,
          quizzesTaken: userData.quizCount,
          avgCompletionTime: userData.avgCompletionTime || 0,
          rank: index + 1
        }));
        
        // If no users returned, set error message
        if (rankedUsers.length === 0) {
          setError('No users found in the leaderboard. Be the first to take a quiz!');
        }
        
        // Find current user's rank if they're in the list
        if (user) {
          const currentUserInList = rankedUsers.find(u => u._id === user._id);
          if (currentUserInList) {
            setUserRank(currentUserInList);
          }
        }
        
        setUsers(rankedUsers);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load leaderboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [timeFilter, user]);

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          <p className="mt-2 text-gray-600">See how you rank against other quiz takers</p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setTimeFilter('week')}
              className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-lg ${
                timeFilter === 'week' 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeFilter('month')}
              className={`px-4 py-2 text-sm font-medium border-t border-b border-gray-200 ${
                timeFilter === 'month' 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeFilter('allTime')}
              className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-lg ${
                timeFilter === 'allTime' 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Time
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <LoadingSpinner text="Loading leaderboard..." />
        ) : error ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <p className="text-gray-600">{error}</p>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* User's Rank */}
            {userRank && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-blue-200">
                <h3 className="text-lg font-medium text-blue-800 mb-3">Your Ranking</h3>
                <div className="flex items-center">
                  <div className="w-10 flex-shrink-0 text-center font-bold text-blue-800">
                    #{userRank.rank}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center overflow-hidden mr-3">
                    {userRank.imageUrl ? (
                      <img src={userRank.imageUrl} alt={userRank.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-bold text-blue-600">{userRank.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-gray-900">{userRank.name} <span className="text-blue-600 text-xs ml-2">(You)</span></div>
                    <div className="text-sm text-gray-500">{userRank.quizzesTaken} quizzes taken</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-blue-700">{userRank.score.toFixed(1)} pts</div>
                    <div className="text-sm text-gray-600">Avg. time: {formatTime(userRank.avgCompletionTime)}</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Empty state if no users */}
            {users.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600">No users have taken quizzes yet. Be the first!</p>
              </div>
            ) : (
              <>
                {/* Leaderboard Table */}
                <div className="overflow-x-auto">
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quizzes
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Avg. Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentUsers.map((userData) => (
                        <tr 
                          key={userData._id} 
                          className={`${userData.rank <= 3 ? 'bg-yellow-50' : ''} hover:bg-gray-50`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`
                              w-8 h-8 rounded-full flex items-center justify-center font-bold
                              ${userData.rank === 1 ? 'bg-yellow-400 text-white' : 
                                userData.rank === 2 ? 'bg-gray-300 text-gray-800' : 
                                userData.rank === 3 ? 'bg-yellow-700 text-white' : 
                                'bg-gray-100 text-gray-700'}
                            `}>
                              {userData.rank}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
                                {userData.imageUrl ? (
                                  <img src={userData.imageUrl} alt={userData.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-lg font-bold text-gray-500">{userData.name.charAt(0)}</span>
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{userData.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            {userData.quizzesTaken}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            {formatTime(userData.avgCompletionTime)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-lg font-bold text-gray-900">{userData.score.toFixed(1)}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md
                          ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                        disabled={currentPage === totalPages}
                        className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md
                          ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
                          <span className="font-medium">{Math.min(indexOfLastUser, users.length)}</span> of{' '}
                          <span className="font-medium">{users.length}</span> users
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button
                            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium
                              ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                          >
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            // Logic to show pages around current page
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                              <button
                                key={i}
                                onClick={() => paginate(pageNum)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                  ${currentPage === pageNum 
                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' 
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          
                          <button
                            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                            disabled={currentPage === totalPages}
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium
                              ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                          >
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard; 