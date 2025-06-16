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
const Type_1 = __importDefault(require("../mongo-models/Type"));
const getAllTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Type_1.default.find();
});
const getTypeById = (title) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Type_1.default.findOne({ title });
});
const createType = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const type = new Type_1.default(data);
    return yield type.save();
});
exports.default = {
    getAllTypes,
    getTypeById,
    createType,
};
//# sourceMappingURL=type.db.js.map