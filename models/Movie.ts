import mongoose, { Schema, model } from "mongoose";

export interface MovieDocument {
  _id: string;
  title: string;
  publishingYear: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const MovieSchema = new Schema<MovieDocument>(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Title is required"],
    },
    publishingYear: {
      type: Number,
      required: [true, "Publishing Year is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Movie =
  mongoose.models?.Movie || model<MovieDocument>("Movie", MovieSchema);
export default Movie;
