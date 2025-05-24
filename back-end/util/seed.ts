// Execute: npx ts-node util/seed.ts
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { addDays, set } from 'date-fns';
import UserModel from '../mongo-models/User';
import TypeModel from '../mongo-models/Type';
import ExerciseModel from '../mongo-models/Exercise';
import AchievementModel from '../mongo-models/Achievement';
import WorkoutModel from '../mongo-models/Workout';

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cloudnative';

const date1 = set(new Date(), { hours: 0, minutes: 0 });
const date2 = set(addDays(new Date(), 1), { hours: 12, minutes: 30 });
const date3 = set(addDays(new Date(), 2), { hours: 10, minutes: 0 });
const date4 = set(addDays(new Date(), 4), { hours: 11, minutes: 0 });
const date5 = set(addDays(new Date(), 7), { hours: 4, minutes: 15 });
const date6 = set(new Date(), { hours: 20, minutes: 0 });
const date7 = set(addDays(new Date(), 9), { hours: 9, minutes: 30 });

const main = async () => {
    await mongoose.connect(mongoUri);

    await Promise.all([
        AchievementModel.deleteMany({}),
        ExerciseModel.deleteMany({}),
        WorkoutModel.deleteMany({}),
        UserModel.deleteMany({}),
        TypeModel.deleteMany({}),
    ]);

    const [type1, type2, type3, type4] = await Promise.all([
        TypeModel.create({ title: 'Legs' }),
        TypeModel.create({ title: 'Arms' }),
        TypeModel.create({ title: 'Back' }),
        TypeModel.create({ title: 'Boulder' }),
    ]);

    const [user1, user2] = await Promise.all([
        UserModel.create({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@gmail.com',
            password: await bcrypt.hash('John123', 12),
            role: 'user',
        }),
        UserModel.create({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@gmail.com',
            password: await bcrypt.hash('Jane123', 12),
            role: 'user',
        }),
    ]);

    const [exercise1, exercise2, exercise3] = await Promise.all([
        ExerciseModel.create({ name: 'Squats', workout: null }),
        ExerciseModel.create({ name: 'Bench Press', workout: null }),
        ExerciseModel.create({ name: 'Lat Pulldown', workout: null }),
    ]);

    await Promise.all([
        AchievementModel.create({
            title: 'Squat PR',
            description: 'Personal record for squats',
            user: user1._id,
        }),
        AchievementModel.create({
            title: 'Bench PR',
            description: 'Personal record for bench press',
            user: user1._id,
        }),
        AchievementModel.create({
            title: 'Lat Pulldown PR',
            description: 'Personal record for lat pulldown',
            user: user2._id,
        }),
    ]);

    await Promise.all([
        WorkoutModel.create({
            title: 'Leg Day',
            date: date1,
            type: type1._id,
            user: user1._id,
            exercises: [exercise1._id],
        }),
        WorkoutModel.create({
            title: 'Arm Day',
            date: date2,
            type: type2._id,
            user: user2._id,
            exercises: [exercise2._id],
        }),
        WorkoutModel.create({
            title: 'Back Day',
            date: date3,
            type: type3._id,
            user: user1._id,
            exercises: [exercise3._id],
        }),
        WorkoutModel.create({
            title: 'Evening Sesh',
            date: date4,
            type: type1._id,
            user: user2._id,
            exercises: [],
        }),
        WorkoutModel.create({
            title: 'BoulderSesh',
            date: date5,
            type: type4._id,
            user: user2._id,
            exercises: [],
        }),
        WorkoutModel.create({
            title: 'Arms',
            date: date3,
            type: type2._id,
            user: user1._id,
            exercises: [],
        }),
        WorkoutModel.create({
            title: 'Evening',
            date: date6,
            type: type3._id,
            user: user2._id,
            exercises: [],
        }),
        WorkoutModel.create({
            title: 'Evening',
            date: date5,
            type: type3._id,
            user: user1._id,
            exercises: [],
        }),
        WorkoutModel.create({
            title: 'Evening',
            date: date7,
            type: type2._id,
            user: user1._id,
            exercises: [],
        }),
    ]);

    await mongoose.disconnect();
    console.log('Database seeded successfully!');
};

main().catch((err) => {
    console.error(err);
    mongoose.disconnect();
    process.exit(1);
});
