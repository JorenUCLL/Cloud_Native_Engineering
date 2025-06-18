type Role = 'user' | 'admin';

type UserInput = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: Role;
};

type TypeInput = {
    id?: string;
    title: string;
};

type WorkoutInput = {
    id?: string;
    title: string;
    date: Date;
    type: TypeInput;
    user: string;
    exercises?: string[];
};

type AchievementInput = {
    id?: string;
    title: string;
    description?: string;
    user: UserInput;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    role: Role;
};

type ExerciseInput = {
    type: TypeInput;
    workout: WorkoutInput;
};

export { UserInput, AuthenticationResponse, Role, WorkoutInput, AchievementInput, TypeInput, ExerciseInput };
