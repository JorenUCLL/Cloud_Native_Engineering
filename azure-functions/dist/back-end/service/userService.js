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
const user_db_1 = require("../repository/user.db");
const bcrypt = require("bcrypt");
const jwt_1 = require("../util/jwt");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return user_db_1.default.getAllUsers(); });
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_db_1.default.getUserByEmail(email);
    if (!user) {
        throw new Error('There is no user with that email address.');
    }
    return user;
});
const authenticate = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const newEmail = email.trim().toLowerCase();
    const user = yield user_db_1.default.getUserByEmail(newEmail);
    if (!user) {
        throw new Error('No user with that email');
    }
    const isValidPassword = yield bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: (0, jwt_1.generateJwtToken)({ email, role: user.role }),
        email: user.email,
        role: user.role,
    };
});
exports.default = {
    getAllUsers,
    authenticate,
    getUserByEmail,
};
//# sourceMappingURL=userService.js.map