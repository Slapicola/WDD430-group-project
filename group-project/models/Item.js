import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    creatorName: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Item || mongoose.model("Item", itemSchema);
