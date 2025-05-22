import { User } from '../model/user';
import { set } from 'date-fns';
import database from './database';

const start = set(new Date(), { hours: 8, minutes: 30 });

const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany({
            include: {
                achievements: true,
            },
        });
        return userPrisma.map((user: any) => User.from(user));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                email: user.getEmail(),
                password: user.getPassword(),
                achievements: {
                    connect: user.getAchievements().map((ach) => ({ id: ach.getId() })),
                },
                workouts: {
                    connect: user.getWorkouts().map((workout) => ({ id: workout.getId() })),
                },
            },
            include: {
                achievements: true,
            },
        });

        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { email },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllUsers,
    createUser,
    getUserByEmail,
};
