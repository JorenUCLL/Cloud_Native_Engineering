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
        return userPrisma.map((userPrisma) => User.from(userPrisma));
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

export default {
    getAllUsers,
    createUser,
};
