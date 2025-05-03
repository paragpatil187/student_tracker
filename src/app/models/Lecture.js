import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    default: 10,
  },
  category: {
    type: String,
    required: false,
  },
  tags: [{
    type: String,
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate',
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecture',
  }],
  relatedNotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
  }],
  order: {
    type: Number,
    required: false,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes
lectureSchema.index({ category: 1, order: 1 });
lectureSchema.index({ tags: 1 });

export default mongoose.models.Lecture || mongoose.model('Lecture', lectureSchema);