"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeRouter = void 0;
const express_1 = __importDefault(require("express"));
const typeService_1 = __importDefault(require("../service/typeService"));
const typeRouter = express_1.default.Router();
exports.typeRouter = typeRouter;
typeRouter.get('/', async (req, res) => {
    try {
        const types = await typeService_1.default.getAllTypes();
        res.json(types);
    }
    catch (error) {
        console.error('Error in GET /types:', error);
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});
