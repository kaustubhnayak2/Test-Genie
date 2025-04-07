import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';

/**
 * Custom hook to access the authentication context
 * @returns AuthContextType - The authentication context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    console.error('AuthContext not found - using default values');
    // Return a default context instead of throwing
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: true,
      error: null,
      register: async () => {},
      login: async () => {},
      logout: () => {},
      updateProfile: async () => {},
      deleteAccount: async () => {},
      clearErrors: () => {},
    };
  }
  
  return context;
}; 