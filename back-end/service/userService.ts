import userRepository from '../repository/user.db';
import { AuthenticationResponse, Role, UserInput } from '../types/index';
import * as bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async () => userRepository.getAllUsers();

const getUserByEmail = async (email: string) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new Error('There is no user with that email address.');
    }
    return user;
};

const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    const newEmail = email.trim().toLowerCase();
    const user = await userRepository.getUserByEmail(newEmail);

    if (!user) {
        throw new Error('No user with that email');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ email, role: user.role as Role }),
        email: user.email,
        role: user.role as Role,
    };
};

export default {
    getAllUsers,
    authenticate,
    getUserByEmail,
};
