import { Exercise } from '@prisma/client';

type UserInput = {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
};

type WorkoutInput = {
    id?: number;
    title: string;
    date: Date;
    type: TypeInput;
    user: UserInput;
};

type TypeInput = {
    id?: number;
    title: string;
};

type AchievementInput = {
    id?: number;
    exercise: Exercise;
    user: UserInput;
    amount: Number;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    role: string;
};

type Role = 'user' | 'admin';

export { UserInput, AuthenticationResponse, Role, WorkoutInput, AchievementInput };
