import userDb from '../repository/user.db';
import { User } from '../model/user';
import { AuthenticationResponse, UserInput } from '../types/index';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    console.log('begin');
    const newEmail = email.trim().toLowerCase();
    const user = await userDb.getUserByEmail(newEmail);
    console.log(user);

    if (!user) {
        throw new Error('no user with that email');
    }

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ email, role: user.getRole() }),
        email: email,
        role: user.getRole(),
    };
};

export default {
    getAllUsers,
    authenticate,
};
