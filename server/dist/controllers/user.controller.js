"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserProfile = exports.getLeaderboard = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
// Get leaderboard (top users by average score)
const getLeaderboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leaderboard = yield user_model_1.default.find({ quizzesTaken: { $gt: 0 } })
            .select('name quizzesTaken averageScore')
            .sort({ averageScore: -1 })
            .limit(10);
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getLeaderboard = getLeaderboard;
// Get user profile
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const user = yield user_model_1.default.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserProfile = getUserProfile;
// Update user profile
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const { name, email } = req.body;
        // Validation
        if (email) {
            const existingUser = yield user_model_1.default.findOne({ email, _id: { $ne: req.user.id } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }
        // Update user
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(req.user.id, { $set: { name, email } }, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateUserProfile = updateUserProfile;
