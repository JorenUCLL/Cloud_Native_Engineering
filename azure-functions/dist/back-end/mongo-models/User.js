"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'user' },
    achievements: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Achievement' }],
    workouts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Workout' }],
});
exports.default = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=User.js.map