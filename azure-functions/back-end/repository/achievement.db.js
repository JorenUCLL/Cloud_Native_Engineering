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
const Achievement_1 = __importDefault(require("../mongo-models/Achievement"));
const getAllAchievements = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Achievement_1.default.find().populate('user');
});
const createAchievement = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const achievement = new Achievement_1.default(data);
    return yield achievement.save();
});
const getAchievementsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Achievement_1.default.find({ user: userId });
});
exports.default = {
    getAllAchievements,
    createAchievement,
    getAchievementsByUser,
};
//# sourceMappingURL=achievement.db.js.map