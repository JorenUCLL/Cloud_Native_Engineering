"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const achievement_db_1 = __importDefault(require("../repository/achievement.db"));
const user_db_1 = __importDefault(require("../repository/user.db"));
const getAchievementsByUser = async (email) => {
    const user = await user_db_1.default.getUserByEmail(email);
    if (!user) {
        throw new Error('There is no user with that email address.');
    }
    return await achievement_db_1.default.getAchievementsByUser(user.id);
};
const getAllAchievements = async () => {
    return await achievement_db_1.default.getAllAchievements();
};
exports.default = {
    getAchievementsByUser,
    getAllAchievements,
};
