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
const achievement_db_1 = __importDefault(require("../repository/achievement.db"));
const user_db_1 = __importDefault(require("../repository/user.db"));
const getAchievementsByUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_db_1.default.getUserByEmail(email);
    if (!user) {
        throw new Error('There is no user with that email address.');
    }
    return yield achievement_db_1.default.getAchievementsByUser(user.id);
});
const getAllAchievements = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield achievement_db_1.default.getAllAchievements();
});
exports.default = {
    getAchievementsByUser,
    getAllAchievements,
};
//# sourceMappingURL=achievementService.js.map