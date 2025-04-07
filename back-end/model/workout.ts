import { Workout as WorkoutPrisma } from '@prisma/client';
import { Type as TypePrisma } from '@prisma/client';
import { User as UserPrisma } from '@prisma/client';
import { User } from './user';
import { Type } from './type';

export class Workout {
    private id?: number;
    private title: string;
    private date: Date;
    private type: Type;
    private user: User;

    constructor(workout: { id?: number; title: string; date: Date; type: Type; user: User }) {
        this.validate(workout);
        this.id = workout.id;
        this.title = workout.title;
        this.date = workout.date;
        this.type = workout.type;
        this.user = workout.user;
    }

    validate(workout: { title: string; date: Date; type: Type; user: User }) {
        if (!this.isNotEmpty(workout.title)) {
            throw new Error('Title cannot be empty.');
        }
        if (!this.isNotEmpty(workout.type.getName())) {
            throw new Error('Type cannot be empty.');
        }
    }

    private isNotEmpty(input: string): boolean {
        return input.trim().length > 0;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getDate(): Date {
        return this.date;
    }

    getType(): Type {
        return this.type;
    }

    getUser(): User {
        return this.user;
    }

    static from({
        id,
        title,
        date,
        type,
        user,
    }: WorkoutPrisma & { type: TypePrisma; user: UserPrisma }) {
        return new Workout({
            id,
            title,
            date,
            type: new Type(type),
            user: new User(user),
        });
    }
}
