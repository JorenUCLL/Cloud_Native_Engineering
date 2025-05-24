import mongoose, { Schema, Document } from 'mongoose';

export interface IExercise extends Document {
    name: string;
    description?: string;
    workout: mongoose.Types.ObjectId;
}

const ExerciseSchema = new Schema<IExercise>({
    name: { type: String, required: true },
    description: String,
    workout: { type: Schema.Types.ObjectId, ref: 'Workout', required: false },
});

export default mongoose.model<IExercise>('Exercise', ExerciseSchema);
