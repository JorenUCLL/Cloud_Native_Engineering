type UserInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    role: string;
};

type Role = 'user' | 'admin';

export { UserInput, AuthenticationResponse, Role };
