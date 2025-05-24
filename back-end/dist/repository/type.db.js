"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Type_1 = __importDefault(require("../mongo-models/Type"));
const getAllTypes = async () => {
    return await Type_1.default.find();
};
const getTypeById = async (id) => {
    return await Type_1.default.findById(id);
};
const createType = async (data) => {
    const type = new Type_1.default(data);
    return await type.save();
};
exports.default = {
    getAllTypes,
    getTypeById,
    createType,
};
