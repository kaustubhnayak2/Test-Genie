"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Get leaderboard
router.get('/leaderboard', user_controller_1.getLeaderboard);
// Get user profile
router.get('/profile', auth_middleware_1.authenticateToken, user_controller_1.getUserProfile);
// Update user profile
router.put('/profile', auth_middleware_1.authenticateToken, user_controller_1.updateUserProfile);
exports.default = router;
