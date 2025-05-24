"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Workout_1 = __importDefault(require("../mongo-models/Workout"));
const getAllWorkouts = async () => {
    return await Workout_1.default.find().populate('type').populate('user').populate('exercises');
};
const getWorkoutsByUser = async (userId) => {
    return await Workout_1.default.find({ user: userId })
        .populate('type')
        .populate('user')
        .populate('exercises');
};
const createWorkout = async (data) => {
    const workout = new Workout_1.default(data);
    return await workout.save();
};
exports.default = {
    getAllWorkouts,
    getWorkoutsByUser,
    createWorkout,
};
