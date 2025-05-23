import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    achievements: mongoose.Types.ObjectId[];
    workouts: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'user' },
    achievements: [{ type: Schema.Types.ObjectId, ref: 'Achievement' }],
    workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout' }],
});

export default mongoose.model<IUser>('User', UserSchema);
