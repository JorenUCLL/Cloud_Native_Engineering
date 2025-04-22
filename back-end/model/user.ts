import { User as UserPrisma } from '@prisma/client';
import { Achievement } from './achievement';
import { Workout } from './workout';
import { Role } from '../types';

export class User {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private achievements: Achievement[] = [];
    private workouts: Workout[] = [];
    private role: Role;

    constructor(user: {
        id?: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        achievements?: Achievement[];
        workouts?: Workout[];
        role?: Role;
    }) {
        this.validate(user);
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.achievements = user.achievements || [];
        this.workouts = user.workouts || [];
        this.role = user.role || 'user';
    }

    private validate(user: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role?: Role;
    }) {
        if (!this.isNotEmpty(user.firstName)) throw new Error('First name cannot be empty.');
        if (!this.isNotEmpty(user.lastName)) throw new Error('Last name cannot be empty.');
        if (!this.isNotEmpty(user.email)) throw new Error('Email cannot be empty.');
        if (!this.isNotEmpty(user.password)) throw new Error('Password cannot be empty.');
        if (user.role != 'user' && user.role != 'admin') {
            throw new Error('role has to be either user or admin');
        }
    }

    private isNotEmpty(input: string): boolean {
        return input.trim().length > 0;
    }

    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getAchievements(): Achievement[] {
        return this.achievements;
    }
    getWorkouts(): Workout[] {
        return this.workouts;
    }

    getRole(): Role {
        return this.role;
    }

    static from({ id, firstName, lastName, email, password, role }: UserPrisma) {
        return new User({ id, firstName, lastName, email, password, role: role as Role });
    }
}
