// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { eachMonthOfInterval, set } from 'date-fns';
import { Type } from '../model/type';
import { User } from '../model/user';
const prisma = new PrismaClient();

const date1 = set(new Date(), { hours: 0, minutes: 0 });

const main = async () => {
    await prisma.achievement.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.type.deleteMany();
    await prisma.user.deleteMany();
    await prisma.workout.deleteMany();

    const type1 = await prisma.type.create({
        data: { title: 'Legs' },
    });

    const type2 = await prisma.type.create({
        data: { title: 'Arms' },
    });

    const type3 = await prisma.type.create({
        data: { title: 'Back' },
    });

    const user1 = await prisma.user.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'John.Doe@gmail.com',
            password: await bcrypt.hash('John123', 12),
        },
    });

    const user2 = await prisma.user.create({
        data: {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'Jane.Doe@gmail.com',
            password: await bcrypt.hash('Jane123', 12),
        },
    });

    const exercise1 = await prisma.exercise.create({
        data: {
            title: 'Squats',
            type: {
                connect: { id: type1.id },
            },
        },
    });

    const exercise2 = await prisma.exercise.create({
        data: {
            title: 'Bench Press',
            type: {
                connect: { id: type2.id },
            },
        },
    });

    const exercise3 = await prisma.exercise.create({
        data: {
            title: 'Lat Pulldown',
            type: {
                connect: { id: type3.id },
            },
        },
    });

    const achievement1 = await prisma.achievement.create({
        data: {
            exercise: {
                connect: { id: exercise1.id },
            },
            user: {
                connect: { id: 1 },
            },
            amount: 150,
        },
    });

    const achievement2 = await prisma.achievement.create({
        data: {
            exercise: {
                connect: { id: exercise2.id },
            },
            user: {
                connect: { id: 1 },
            },
            amount: 100,
        },
    });

    const achievement3 = await prisma.achievement.create({
        data: {
            exercise: {
                connect: { id: exercise3.id },
            },
            user: {
                connect: { id: 2 },
            },
            amount: 90,
        },
    });

    const workout1 = await prisma.workout.create({
        data: {
            title: 'Leg Day',
            date: date1,
            type: {
                connect: { id: type1.id },
            },
            user: {
                connect: { id: user1.id },
            },
        },
    });

    const workout2 = await prisma.workout.create({
        data: {
            title: 'Arm Day',
            date: date1,
            type: {
                connect: { id: type2.id },
            },
            user: {
                connect: { id: user2.id },
            },
        },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
