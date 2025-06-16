import mongoose, { Schema, Document } from 'mongoose';

export interface IType extends Document {
    title: string;
}

const TypeSchema = new Schema<IType>({
    title: { type: String, required: true, unique: true },
});

export default mongoose.model<IType>('Type', TypeSchema);
