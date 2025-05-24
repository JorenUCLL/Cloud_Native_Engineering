"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_db_1 = __importDefault(require("../repository/type.db"));
const getAllTypes = async () => type_db_1.default.getAllTypes();
exports.default = {
    getAllTypes,
};
