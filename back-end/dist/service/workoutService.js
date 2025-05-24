"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workout_db_1 = __importDefault(require("../repository/workout.db"));
const user_db_1 = __importDefault(require("../repository/user.db"));
const type_db_1 = __importDefault(require("../repository/type.db"));
const getAllWorkouts = async () => {
    return await workout_db_1.default.getAllWorkouts();
};
const getWorkoutByUser = async (email) => {
    const user = await user_db_1.default.getUserByEmail(email);
    if (!user) {
        throw new Error('There is no user with that email address.');
    }
    return await workout_db_1.default.getWorkoutsByUser(user.id);
};
const createWorkout = async ({ title, date, type: typeInput, user: userInput }) => {
    const type = await type_db_1.default.getTypeById(typeInput.title);
    if (!type) {
        throw new Error('There is no type like that');
    }
    const user = await user_db_1.default.getUserByEmail(userInput.email);
    if (!user) {
        throw new Error('There is no user like that');
    }
    const workoutData = {
        title,
        date,
        type: type.id,
        user: user.id,
    };
    return await workout_db_1.default.createWorkout(workoutData);
};
exports.default = {
    getAllWorkouts,
    getWorkoutByUser,
    createWorkout,
};
