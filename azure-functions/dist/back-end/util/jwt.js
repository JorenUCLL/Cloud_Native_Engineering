"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = void 0;
const jwt = require("jsonwebtoken");
const generateJwtToken = ({ email, role }) => {
    const options = {
        expiresIn: `8h`,
        issuer: 'courses_app',
    };
    try {
        return jwt.sign({ email, role }, process.env.JWT_SECRET, options);
    }
    catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};
exports.generateJwtToken = generateJwtToken;
//# sourceMappingURL=jwt.js.map