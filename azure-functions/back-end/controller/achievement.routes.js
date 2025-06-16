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
exports.achievementRouter = void 0;
const express_1 = __importDefault(require("express"));
const achievementService_1 = __importDefault(require("../service/achievementService"));
const achievementRouter = express_1.default.Router();
exports.achievementRouter = achievementRouter;
achievementRouter.get('/user/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const achievements = yield achievementService_1.default.getAchievementsByUser(req.params.email);
        res.json(achievements);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch achievements.' });
    }
}));
// test
achievementRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const achievements = yield achievementService_1.default.getAllAchievements();
        res.json(achievements);
    }
    catch (error) {
        console.error('Error in GET /achievements:', error);
        res.status(500).json({ error: 'Failed to fetch achievements.' });
    }
}));
//# sourceMappingURL=achievement.routes.js.map