import UserModel, { IUser } from '../mongo-models/User';

const getAllUsers = async (): Promise<IUser[]> => {
    try {
        return await UserModel.find().populate('achievements').populate('workouts');
    } catch (error) {
        console.log('Error fetch users:', error);
        throw new Error('Failed to fetch users');
    }
};

const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const user = new UserModel(userData);
    return await user.save();
};

const getUserByEmail = async (email: string): Promise<IUser | null> => {
    return await UserModel.findOne({ email }).populate('achievements').populate('workouts');
};

export default {
    getAllUsers,
    createUser,
    getUserByEmail,
};
