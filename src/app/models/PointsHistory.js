import mongoose from 'mongoose';

const pointsHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  activityType: {
    type: String,
    required: true,
    enum: ['lecture_completion', 'note_completion', 'assignment_submission', 'quiz_completion'],
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.PointsHistory || mongoose.model('PointsHistory', pointsHistorySchema);