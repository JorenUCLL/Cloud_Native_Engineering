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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../mongo-models/User");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield User_1.default.find().populate('achievements').populate('workouts');
    }
    catch (error) {
        console.log('Error fetch users:', error);
        throw new Error('Failed to fetch users');
    }
});
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.default(userData);
    return yield user.save();
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findOne({ email }).populate('achievements').populate('workouts');
});
exports.default = {
    getAllUsers,
    createUser,
    getUserByEmail,
};
//# sourceMappingURL=user.db.js.map