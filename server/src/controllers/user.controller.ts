import { Request, Response } from 'express';
import User from '../models/user.model';

// Get leaderboard (top users by average score)
export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboard = await User.find({ quizzesTaken: { $gt: 0 } })
      .select('name email quizzesTaken totalScore averageScore avgCompletionTime')
      .sort({ averageScore: -1 }) // Sort by highest score first
      .limit(100);
      
    // Format the data for the frontend
    const formattedLeaderboard = leaderboard.map((user, index) => ({
      _id: user._id,
      userName: user.name,
      userEmail: user.email,
      quizCount: user.quizzesTaken,
      totalScore: user.totalScore,
      averageScore: user.averageScore,
      avgCompletionTime: user.avgCompletionTime || 0,
      rank: index + 1 // Add rank based on sorted position
    }));
      
    res.status(200).json({
      success: true,
      data: formattedLeaderboard
    });
  } catch (error: any) {
    console.error('Leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching leaderboard data'
    });
  }
};

// Get user profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { name, email, currentPassword, newPassword } = req.body;
    
    // Get user with password for validation
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Validation
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: req.user.id } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    // Prepare update data
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    // Handle password change
    if (currentPassword && newPassword) {
      // Verify current password
      const isPasswordValid = await user.comparePassword(currentPassword);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      
      // Set new password - this will be hashed automatically by the User model pre-save hook
      user.password = newPassword;
      await user.save();
      
      // Update other fields if needed
      if (Object.keys(updateData).length > 0) {
        Object.assign(user, updateData);
        await user.save();
      }
      
      // Return updated user without password
      const userToReturn = user.toObject();
      const { password, ...userWithoutPassword } = userToReturn;
      
      return res.json(userWithoutPassword);
    }

    // If no password change, just update other fields
    if (Object.keys(updateData).length > 0) {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updateData },
        { new: true }
      ).select('-password');
      
      return res.json(updatedUser);
    }

    // If nothing to update
    return res.status(400).json({ message: 'No changes to update' });
  } catch (error: any) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: error.message });
  }
}; 