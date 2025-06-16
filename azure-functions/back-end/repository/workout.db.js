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
const Workout_1 = __importDefault(require("../mongo-models/Workout"));
const getAllWorkouts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Workout_1.default.find().populate('type').populate('user').populate('exercises');
});
const getWorkoutByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Workout_1.default.find({ user: userId })
        .populate('type')
        .populate('user')
        .populate('exercises');
});
const createWorkout = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const workout = new Workout_1.default(data);
    return yield workout.save();
});
exports.default = {
    getAllWorkouts,
    getWorkoutByUser,
    createWorkout,
};
//# sourceMappingURL=workout.db.js.map