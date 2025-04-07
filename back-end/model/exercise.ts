import { Exercise as ExercisePrisma, Type as TypePrisma } from '@prisma/client';
import { Type } from './type';

export class Exercise {
    private id?: number;
    private title: string;
    private type: Type;

    constructor(exercise: { id?: number; title: string; type: Type }) {
        this.validate(exercise);
        this.id = exercise.id;
        this.title = exercise.title;
        this.type = exercise.type;
    }

    private validate(exercise: { title: string; type: Type }) {
        if (!this.isNotEmpty(exercise.title)) throw new Error('Title cannot be empty.');
        if (!this.isNotEmpty(exercise.type.getName())) throw new Error('Type cannot be empty.');
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

    getType(): Type {
        return this.type;
    }

    static from({ id, title, type }: ExercisePrisma & { type: TypePrisma }) {
        return new Exercise({
            id,
            title,
            type: Type.from(type),
        });
    }
}
