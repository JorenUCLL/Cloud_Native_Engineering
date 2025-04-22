type UserInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: string;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    role: string;
};

type Role = 'user' | 'admin';

export { UserInput, AuthenticationResponse, Role };
