import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, updateProfile, deleteAccount } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    currentPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate password fields if attempting to change password
    if (formData.password || formData.confirmPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required to change password';
      }
      
      if (formData.password && formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // Create update data
      const updateData: any = {
        name: formData.name,
        email: formData.email
      };
      
      // Add password fields if changing password
      if (formData.password && formData.currentPassword) {
        updateData.newPassword = formData.password;
        updateData.currentPassword = formData.currentPassword;
      }
      
      // Add profile image if selected
      if (profileImage) {
        updateData.profileImage = profileImage;
      }
      
      // Call the updateProfile method from auth context
      if (updateProfile) {
        await updateProfile(updateData);
        toast.success('Profile updated successfully');
        
        // Clear password fields
        setFormData({
          ...formData,
          password: '',
          confirmPassword: '',
          currentPassword: ''
        });
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      toast.error('Please type DELETE to confirm account deletion');
      return;
    }

    try {
      setIsDeleting(true);
      
      if (deleteAccount) {
        await deleteAccount();
        // Navigate to home page after successful deletion
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (authLoading) {
    return <LoadingSpinner fullScreen text="Loading profile..." />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="mt-2 text-gray-600">Update your personal information and password</p>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-6 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative mb-4 sm:mb-0 sm:mr-6">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : user?.imageUrl ? (
                    <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-blue-200 flex items-center justify-center text-blue-600">
                      <span className="text-2xl font-bold">{user?.name?.charAt(0) || '?'}</span>
                    </div>
                  )}
                  <label htmlFor="profileImage" className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-gray-200 cursor-pointer hover:bg-gray-100">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <input 
                      id="profileImage" 
                      type="file" 
                      className="sr-only" 
                      accept="image/*"
                      onChange={handleImageChange} 
                    />
                  </label>
              </div>
              </div>
              <div className="text-center sm:text-left text-white">
                <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
                <p className="text-blue-100">{user?.email || 'Email not available'}</p>
                <p className="text-blue-100 text-sm mt-1">
                  Member since: {user?.lastLogin 
                    ? new Date(user.lastLogin).toLocaleDateString() 
                    : new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <div className="px-4 py-6 sm:p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="col-span-1 sm:col-span-2">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
                    
                    {/* Email */}
                    <div className="col-span-1 sm:col-span-2">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>
        </div>
        
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                  <p className="text-sm text-gray-600 mb-4">Leave blank if you don't want to change your password</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Current Password */}
                    <div className="col-span-1 sm:col-span-2">
                      <label htmlFor="currentPassword" className="form-label">Current Password</label>
                      <input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        autoComplete="current-password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className={`form-input ${errors.currentPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      />
                      {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
            </div>
                    
                    {/* New Password */}
                    <div>
                      <label htmlFor="password" className="form-label">New Password</label>
            <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`form-input ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      />
                      {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
          
                    {/* Confirm New Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
            <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`form-input ${errors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      />
                      {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>
                  </div>
          </div>
          
                {/* Submit Button */}
                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    className="btn btn-danger px-6 py-2"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Account
                  </button>
          <button
            type="submit"
                    className="btn btn-primary px-6 py-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full mr-2"></div>
                        Saving Changes...
                      </div>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </div>
        </form>
          </div>
        </div>
      </div>
      
      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-xl font-bold text-red-600 mb-4">Delete Account</h3>
            <p className="text-gray-700 mb-4">
              Warning: This action is irreversible. All your data, including quizzes and results, will be permanently deleted from our database.
            </p>
            <p className="text-gray-700 mb-6">
              Type <span className="font-bold">DELETE</span> to confirm:
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="form-input w-full mb-6"
              placeholder="Type DELETE to confirm"
            />
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={isDeleting}
                onClick={handleDeleteAccount}
              >
                {isDeleting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full mr-2"></div>
                    Deleting...
                  </div>
                ) : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 