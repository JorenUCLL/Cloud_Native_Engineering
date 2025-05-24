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
const createWorkout = async (data) => {
    // 1) Lookup type by ID
    const type = await type_db_1.default.getTypeById(data.typeId);
    if (!type)
        throw new Error('There is no type like that');
    // 2) Lookup user by email
    const user = await user_db_1.default.getUserByEmail(data.userEmail);
    if (!user)
        throw new Error('There is no user like that');
    // 3) Build payload for repository
    const workoutData = {
        title: data.title,
        date: data.date,
        type: type._id,
        user: user._id,
    };
    // 4) Save
    return await workout_db_1.default.createWorkout(workoutData);
};
exports.default = {
    getAllWorkouts,
    getWorkoutByUser,
    createWorkout,
};
