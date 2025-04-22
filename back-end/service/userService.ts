import userRepository from '../repository/user.db';
import { User } from '../model/user';
import { AuthenticationResponse, UserInput } from '../types/index';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => userRepository.getAllUsers();

const getUserByEmail = async (email: string): Promise<User> => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new Error('There is no user with that email adress.');
    }
    return user;
};

const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    console.log('begin');
    const newEmail = email.trim().toLowerCase();
    const user = await userRepository.getUserByEmail(newEmail);
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
    getUserByEmail,
};
