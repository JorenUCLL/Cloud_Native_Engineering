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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userService_1 = __importDefault(require("../service/userService"));
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('test');
        const users = yield userService_1.default.getAllUsers();
        res.json(users);
    }
    catch (error) {
        console.log('Error in GET /users:', error);
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
}));
userRouter.get('/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService_1.default.getUserByEmail(req.params.email);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
}));
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInput = req.body;
        const response = yield userService_1.default.authenticate(userInput);
        res.status(200).json(Object.assign({ message: 'Authentication succesful' }, response));
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to log in.' });
    }
}));
//# sourceMappingURL=user.routes.js.map