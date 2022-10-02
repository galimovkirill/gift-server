import { Schema, model } from "mongoose";

const Post = new Schema({
  body: {
    type: [String],
    required: true,
  },
  order: {
    type: Number,
    required: true,
    unique: true,
  },
  date: {
    type: Number || String,
    required: true,
    unique: true,
  },
});

export default model("Post", Post);
