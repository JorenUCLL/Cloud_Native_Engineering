"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Exercise_1 = __importDefault(require("../mongo-models/Exercise"));
const getAllExercises = async () => {
    return await Exercise_1.default.find().populate('workout');
};
const createExercise = async (data) => {
    const exercise = new Exercise_1.default(data);
    return await exercise.save();
};
exports.default = {
    getAllExercises,
    createExercise,
};
