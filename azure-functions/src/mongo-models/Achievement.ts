import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievement extends Document {
    title: string;
    description: string;
    user: mongoose.Types.ObjectId;
}

const AchievementSchema = new Schema<IAchievement>({
    title: { type: String, required: true },
    description: String,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IAchievement>('Achievement', AchievementSchema);
