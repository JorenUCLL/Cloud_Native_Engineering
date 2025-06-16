import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import { achievementRouter } from './controller/achievement.routes';

import './mongo-models/Achievement';
import './mongo-models/Workout';
import './mongo-models/Exercise';
import './mongo-models/Type';
import './mongo-models/User';

import path from 'path';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';
import workoutRouter from './controller/workout.routes';
import { typeRouter } from './controller/type.routes';
import mongoose from 'mongoose';
import { exerciseRouter } from './controller/exercise.routes';

const app = express();

const port = process.env.APP_PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'your-cosmos-connection-string';

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.use(
    cors({
        origin: 'http://localhost:8081',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

app.use(helmet());

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

app.use('/users', userRouter);
app.use('/workouts', workoutRouter);
app.use('/types', typeRouter);
app.use('/achievements', achievementRouter);
app.use('/exercises', exerciseRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Courses API is running...' });
});

app.use('/public', express.static(path.join(__dirname, '../front-end/public')));

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
const swaggerSpec = swaggerJSDoc(swaggerOpts);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'CoursesError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`Courses API is running on port ${port}.`);
});
