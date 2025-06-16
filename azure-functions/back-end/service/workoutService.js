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
const workout_db_1 = __importDefault(require("../repository/workout.db"));
const user_db_1 = __importDefault(require("../repository/user.db"));
const type_db_1 = __importDefault(require("../repository/type.db"));
const getAllWorkouts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield workout_db_1.default.getAllWorkouts();
});
const getWorkoutByUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_db_1.default.getUserByEmail(email);
    if (!user) {
        throw new Error('There is no user with that email address.');
    }
    return yield workout_db_1.default.getWorkoutByUser(user.id);
});
const createWorkout = ({ title, date, type: typeInput, user: userInput }) => __awaiter(void 0, void 0, void 0, function* () {
    const type = yield type_db_1.default.getTypeById(typeInput.title);
    if (!type) {
        throw new Error('There is no type like that');
    }
    const user = yield user_db_1.default.getUserByEmail(userInput.email);
    if (!user) {
        throw new Error('There is no user like that');
    }
    const workoutData = {
        title,
        date,
        type: type.id,
        user: user.id,
    };
    return yield workout_db_1.default.createWorkout(workoutData);
});
exports.default = {
    getAllWorkouts,
    getWorkoutByUser,
    createWorkout,
};
//# sourceMappingURL=workoutService.js.map