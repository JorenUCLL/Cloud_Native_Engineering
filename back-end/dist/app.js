"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = __importStar(require("body-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const user_routes_1 = require("./controller/user.routes");
require("./mongo-models/Achievement");
require("./mongo-models/Workout");
require("./mongo-models/Exercise");
require("./mongo-models/Type");
require("./mongo-models/User");
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const workout_routes_1 = __importDefault(require("./controller/workout.routes"));
const type_routes_1 = require("./controller/type.routes");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
dotenv.config();
const port = process.env.APP_PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'your-cosmos-connection-string';
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
app.use((0, cors_1.default)({
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use((0, helmet_1.default)());
// app.use(
//     expressjwt({
//         secret: process.env.JWT_SECRET || 'default_secret',
//         algorithms: ['HS256'],
//     }).unless({
//         path: [
//             '/api-docs',
//             /^\/api-docs\/.*/,
//             '/users/login',
//             '/users/signup',
//             '/status',
//             '/users',
//             '/workouts',
//             '/types',
//             '/workouts/user',
//         ],
//     })
// );
app.use(bodyParser.json());
app.use('/users', user_routes_1.userRouter);
app.use('/workouts', workout_routes_1.default);
app.use('/types', type_routes_1.typeRouter);
app.get('/status', (req, res) => {
    res.json({ message: 'Courses API is running...' });
});
app.use('/public', express_1.default.static(path_1.default.join(__dirname, '../front-end/public')));
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOpts);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    }
    else if (err.name === 'CoursesError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    }
    else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});
app.listen(port || 3000, () => {
    console.log(`Courses API is running on port ${port}.`);
});
