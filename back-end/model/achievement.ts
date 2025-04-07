import {
    Achievement as AchievementPrisma,
    Exercise as ExercisePrisma,
    User as UserPrisma,
    Type as TypePrisma,
} from '@prisma/client';
import { Exercise } from './exercise';
import { User } from './user';

export class Achievement {
    private id?: number;
    private exercise: Exercise;
    private user: User;
    private amount: number;

    constructor(achievement: { id?: number; exercise: Exercise; user: User; amount: number }) {
        this.validate(achievement);
        this.id = achievement.id;
        this.exercise = achievement.exercise;
        this.user = achievement.user;
        this.amount = achievement.amount;
    }

    private validate(achievement: { exercise: Exercise; user: User; amount: number }) {
        if (achievement.amount <= 0) throw new Error('Amount must be greater than 0.');
    }

    getId(): number | undefined {
        return this.id;
    }

    getExercise(): Exercise {
        return this.exercise;
    }

    getUser(): User {
        return this.user;
    }

    getAmount(): number {
        return this.amount;
    }

    static from({
        id,
        amount,
        exercise,
        user,
    }: AchievementPrisma & { exercise: ExercisePrisma & { type: TypePrisma }; user: UserPrisma }) {
        return new Achievement({
            id,
            amount,
            exercise: Exercise.from(exercise),
            user: new User(user),
        });
    }
}
