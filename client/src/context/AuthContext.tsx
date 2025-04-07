import { createContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Set to false to use real backend connection
const USE_MOCK_AUTH = false;

// Types
export interface User {
  _id: string;
  name: string;
  email: string;
  imageUrl?: string;
  role?: string;
  lastLogin?: string;
  quizzesTaken?: number;
  averageScore?: number;
  totalScore?: number;
  createdAt?: string;
  averageCompletionTime?: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  deleteAccount: () => Promise<void>;
  clearErrors: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface UpdateProfileData {
  name?: string;
  email?: string;
  password?: string;
  currentPassword?: string;
  profileImage?: File;
}

// Default context value
const defaultAuthContext: AuthContextType = {
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

// Create the context
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Create API instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Create provider
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load user on initial render
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        
        // Check if token exists
        const storedToken = localStorage.getItem('token');
        
        if (!storedToken) {
          setLoading(false);
          return;
        }
        
        setToken(storedToken);
        
        // For development/testing without a backend
        if (USE_MOCK_AUTH) {
          const userStr = localStorage.getItem('user');
          if (userStr) {
            const mockUser = JSON.parse(userStr);
            setUser(mockUser);
            setIsAuthenticated(true);
          }
          setLoading(false);
          return;
        }
        
        // Fetch the real user data
        const res = await api.get('/auth/me');
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (err: any) {
        console.error('Auth Error:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        
        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  // Login user
  const login = async (data: LoginData) => {
    try {
      setLoading(true);
      setError(null);
      
      if (USE_MOCK_AUTH) {
        // Mock login for testing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check against mock credentials
        const { email, password } = data;
        
        const mockUser: User = {
          _id: '1',
          name: 'Test User',
          email: email,
          imageUrl: 'https://via.placeholder.com/150',
          role: 'user',
          lastLogin: new Date().toISOString(),
          quizzesTaken: 12,
          averageScore: 85.5,
          totalScore: 1026,
          createdAt: new Date().toISOString(),
          averageCompletionTime: 276
        };
        
        const mockToken = 'mock-token-' + Math.random().toString(36).substring(2);
        
        // Store in localStorage for persistence
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        setToken(mockToken);
        setUser(mockUser);
        setIsAuthenticated(true);
        toast.success(`Welcome back, ${mockUser.name}!`);
        
        // Navigate to dashboard after successful login
        navigate('/dashboard');
        return;
      }
      
      // Real login implementation
      const res = await api.post('/auth/login', data);
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      toast.success(`Welcome back, ${user.name}!`);
      
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      
      const errorMessage = err.response?.data?.message || 'Failed to login. Please check your credentials.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      
      if (USE_MOCK_AUTH) {
        // Mock registration for testing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          _id: Math.random().toString(36).substring(2),
          name: data.name,
          email: data.email,
          imageUrl: 'https://via.placeholder.com/150',
          role: 'user',
          lastLogin: new Date().toISOString(),
          quizzesTaken: 0,
          averageScore: 0,
          totalScore: 0,
          createdAt: new Date().toISOString(),
          averageCompletionTime: 0
        };
        
        const mockToken = 'mock-token-' + Math.random().toString(36).substring(2);
        
        // Store in localStorage for persistence
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        setToken(mockToken);
        setUser(mockUser);
        setIsAuthenticated(true);
        toast.success('Registration successful! Welcome to Test Genie.');
        
        // Navigate to dashboard after successful registration
        navigate('/dashboard');
        return;
      }
      
      // Real registration implementation
      const res = await api.post('/auth/register', data);
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      toast.success('Registration successful! Welcome to Test Genie.');
      
      // Navigate to dashboard after successful registration
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Registration error:', err);
      
      const errorMessage = err.response?.data?.message || 'Failed to create account. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Update user profile
  const updateProfile = async (data: UpdateProfileData) => {
    try {
      setLoading(true);
      setError(null);
      
      if (USE_MOCK_AUTH) {
        // Mock profile update for testing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const updatedUser = {
          ...user,
          name: data.name || user?.name,
          email: data.email || user?.email,
        };
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser as User);
        toast.success('Profile updated successfully');
        return;
      }
      
      // Handle password change separately if present
      if (data.currentPassword && data.newPassword) {
        const updateData = {
          name: data.name,
          email: data.email,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        };
        
        const response = await api.put('/user/profile', updateData);
        
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        toast.success('Profile and password updated successfully');
        return;
      }
      
      // Regular profile update (no password change)
      const updateData = {
        name: data.name,
        email: data.email
      };
      
      const response = await api.put('/user/profile', updateData);
      
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Profile updated successfully');
    } catch (err: any) {
      console.error('Update profile error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update profile. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Delete user account
  const deleteAccount = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (USE_MOCK_AUTH) {
        // Mock account deletion
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Reset state
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        
        toast.success('Your account has been deleted.');
        navigate('/login');
        return;
      }
      
      // Real account deletion
      await api.delete('/user/account');
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Reset state
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      
      toast.success('Your account has been deleted.');
      navigate('/login');
    } catch (err: any) {
      console.error('Account deletion error:', err);
      
      const errorMessage = err.response?.data?.message || 'Failed to delete account. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Clear errors
  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        deleteAccount,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 