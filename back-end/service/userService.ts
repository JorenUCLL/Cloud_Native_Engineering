import userDb from '../repository/user.db';
import { User } from '../model/user';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

export default {
    getAllUsers,
};
