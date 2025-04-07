import { Type as TypePrisma } from '@prisma/client';

export class Type {
    private id?: number;
    private title: string;

    constructor(type: { id?: number; title: string }) {
        this.validate(type);
        this.id = type.id;
        this.title = type.title;
    }

    private validate(type: { title: string }) {
        if (!this.isNotEmpty(type.title)) throw new Error('Title cannot be empty.');
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

    getName(): string {
        return this.title;
    }

    static from(type: TypePrisma) {
        return new Type(type);
    }
}
