"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Execute: npx ts-node util/seed.ts
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const date_fns_1 = require("date-fns");
const User_1 = __importDefault(require("../mongo-models/User"));
const Type_1 = __importDefault(require("../mongo-models/Type"));
const Exercise_1 = __importDefault(require("../mongo-models/Exercise"));
const Achievement_1 = __importDefault(require("../mongo-models/Achievement"));
const Workout_1 = __importDefault(require("../mongo-models/Workout"));
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cloudnative';
const date1 = (0, date_fns_1.set)(new Date(), { hours: 0, minutes: 0 });
const date2 = (0, date_fns_1.set)((0, date_fns_1.addDays)(new Date(), 1), { hours: 12, minutes: 30 });
const date3 = (0, date_fns_1.set)((0, date_fns_1.addDays)(new Date(), 2), { hours: 10, minutes: 0 });
const date4 = (0, date_fns_1.set)((0, date_fns_1.addDays)(new Date(), 4), { hours: 11, minutes: 0 });
const date5 = (0, date_fns_1.set)((0, date_fns_1.addDays)(new Date(), 7), { hours: 4, minutes: 15 });
const date6 = (0, date_fns_1.set)(new Date(), { hours: 20, minutes: 0 });
const date7 = (0, date_fns_1.set)((0, date_fns_1.addDays)(new Date(), 9), { hours: 9, minutes: 30 });
const main = async () => {
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        Achievement_1.default.deleteMany({}),
        Exercise_1.default.deleteMany({}),
        Workout_1.default.deleteMany({}),
        User_1.default.deleteMany({}),
        Type_1.default.deleteMany({}),
    ]);
    const [type1, type2, type3, type4] = await Promise.all([
        Type_1.default.create({ title: 'Legs' }),
        Type_1.default.create({ title: 'Arms' }),
        Type_1.default.create({ title: 'Back' }),
        Type_1.default.create({ title: 'Boulder' }),
    ]);
    const [user1, user2] = await Promise.all([
        User_1.default.create({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@gmail.com',
            password: await bcrypt_1.default.hash('John123', 12),
            role: 'user',
        }),
        User_1.default.create({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@gmail.com',
            password: await bcrypt_1.default.hash('Jane123', 12),
            role: 'user',
        }),
    ]);
    const [exercise1, exercise2, exercise3] = await Promise.all([
        Exercise_1.default.create({ name: 'Squats', workout: null }),
        Exercise_1.default.create({ name: 'Bench Press', workout: null }),
        Exercise_1.default.create({ name: 'Lat Pulldown', workout: null }),
    ]);
    await Promise.all([
        Achievement_1.default.create({
            title: 'Squat PR',
            description: 'Personal record for squats',
            user: user1.id,
        }),
        Achievement_1.default.create({
            title: 'Bench PR',
            description: 'Personal record for bench press',
            user: user1.id,
        }),
        Achievement_1.default.create({
            title: 'Lat Pulldown PR',
            description: 'Personal record for lat pulldown',
            user: user2.id,
        }),
    ]);
    await Promise.all([
        Workout_1.default.create({
            title: 'Leg Day',
            date: date1,
            type: type1.id,
            user: user1.id,
            exercises: [exercise1.id],
        }),
        Workout_1.default.create({
            title: 'Arm Day',
            date: date2,
            type: type2.id,
            user: user2.id,
            exercises: [exercise2.id],
        }),
        Workout_1.default.create({
            title: 'Back Day',
            date: date3,
            type: type3.id,
            user: user1.id,
            exercises: [exercise3.id],
        }),
        Workout_1.default.create({
            title: 'Evening Sesh',
            date: date4,
            type: type1.id,
            user: user2.id,
            exercises: [],
        }),
        Workout_1.default.create({
            title: 'BoulderSesh',
            date: date5,
            type: type4.id,
            user: user2.id,
            exercises: [],
        }),
        Workout_1.default.create({
            title: 'Arms',
            date: date3,
            type: type2.id,
            user: user1.id,
            exercises: [],
        }),
        Workout_1.default.create({
            title: 'Evening',
            date: date6,
            type: type3.id,
            user: user2.id,
            exercises: [],
        }),
        Workout_1.default.create({
            title: 'Evening',
            date: date5,
            type: type3.id,
            user: user1.id,
            exercises: [],
        }),
        Workout_1.default.create({
            title: 'Evening',
            date: date7,
            type: type2.id,
            user: user1.id,
            exercises: [],
        }),
    ]);
    await mongoose_1.default.disconnect();
    console.log('Database seeded successfully!');
};
main().catch((err) => {
    console.error(err);
    mongoose_1.default.disconnect();
    process.exit(1);
});
