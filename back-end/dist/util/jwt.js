"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwtToken = ({ email, role }) => {
    const options = {
        expiresIn: `8h`,
        issuer: 'courses_app',
    };
    try {
        return jsonwebtoken_1.default.sign({ email, role }, process.env.JWT_SECRET, options);
    }
    catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};
exports.generateJwtToken = generateJwtToken;
