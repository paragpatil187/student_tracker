import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'contentType',
  },
  contentType: {
    type: String,
    required: true,
    enum: ['lecture', 'note'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  watchTime: {
    type: Number,
    default: 0,
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
  },
  bookmarked: {
    type: Boolean,
    default: false,
  },
});

// Add indexes for better query performance
progressSchema.index({ userId: 1, contentId: 1 }, { unique: true });
progressSchema.index({ userId: 1, completed: 1 });

export default mongoose.models.Progress || mongoose.model('Progress', progressSchema);