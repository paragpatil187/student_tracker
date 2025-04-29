import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contentType: {
    type: String,
    enum: ["lecture", "note"],
    required: true,
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "contentType",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  pointsEarned: {
    type: Number,
    default: 0,
  },
  completedAt: {
    type: Date,
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Progress ||
  mongoose.model("Progress", progressSchema);
