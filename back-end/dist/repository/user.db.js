"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../mongo-models/User"));
const getAllUsers = async () => {
    try {
        return await User_1.default.find().populate('achievements').populate('workouts');
    }
    catch (error) {
        console.log('Error fetch users:', error);
        throw new Error('Failed to fetch users');
    }
};
const createUser = async (userData) => {
    const user = new User_1.default(userData);
    return await user.save();
};
const getUserByEmail = async (email) => {
    return await User_1.default.findOne({ email }).populate('achievements').populate('workouts');
};
exports.default = {
    getAllUsers,
    createUser,
    getUserByEmail,
};
