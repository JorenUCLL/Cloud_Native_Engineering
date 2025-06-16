import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
    title: string;
    date: Date;
    type: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    exercises: mongoose.Types.ObjectId[];
}

const WorkoutSchema = new Schema<IWorkout>({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
