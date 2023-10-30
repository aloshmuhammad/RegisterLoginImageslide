import { Schema, model } from "mongoose";

const imageSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  images: [
    {
      url: String,
      title: String,
      order: Number,
    },
  ],
});

const Image = model("Image", imageSchema);
export default Image;
