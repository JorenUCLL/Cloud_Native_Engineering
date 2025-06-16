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
const express_1 = __importDefault(require("express"));
const workoutService_1 = __importDefault(require("../service/workoutService"));
const workoutRouter = express_1.default.Router();
workoutRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workouts = yield workoutService_1.default.getAllWorkouts();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts.' });
    }
}));
workoutRouter.get('/user/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workouts = yield workoutService_1.default.getWorkoutByUser(req.params.email);
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts.' });
    }
}));
workoutRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Data = req.body;
        const newWorkout = yield workoutService_1.default.createWorkout(req.body);
        res.status(201).json(newWorkout);
    }
    catch (error) {
        console.error('Error creating workout:', error);
        res.status(500).json({ error: 'Failed to create workout.' });
    }
}));
exports.default = workoutRouter;
//# sourceMappingURL=workout.routes.js.map