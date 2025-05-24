"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Achievement_1 = __importDefault(require("../mongo-models/Achievement"));
const getAllAchievements = async () => {
    return await Achievement_1.default.find().populate('user');
};
const createAchievement = async (data) => {
    const achievement = new Achievement_1.default(data);
    return await achievement.save();
};
exports.default = {
    getAllAchievements,
    createAchievement,
};
