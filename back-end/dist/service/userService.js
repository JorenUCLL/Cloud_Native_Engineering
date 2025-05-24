"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_db_1 = __importDefault(require("../repository/user.db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../util/jwt");
const getAllUsers = async () => user_db_1.default.getAllUsers();
const getUserByEmail = async (email) => {
    const user = await user_db_1.default.getUserByEmail(email);
    if (!user) {
        throw new Error('There is no user with that email address.');
    }
    return user;
};
const authenticate = async ({ email, password }) => {
    const newEmail = email.trim().toLowerCase();
    const user = await user_db_1.default.getUserByEmail(newEmail);
    if (!user) {
        throw new Error('No user with that email');
    }
    const isValidPassword = await bcrypt_1.default.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: (0, jwt_1.generateJwtToken)({ email, role: user.role }),
        email: user.email,
        role: user.role,
    };
};
exports.default = {
    getAllUsers,
    authenticate,
    getUserByEmail,
};
