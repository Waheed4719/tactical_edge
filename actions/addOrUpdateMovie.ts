"use server";
import { connectDB } from "@/lib/mongodb";
import Movie from "@/models/Movie";

export const addOrUpdateMovie = async (values: {
  id?: string;
  title: string;
  publishingYear: number;
  imageUrl: string;
}) => {
  const { id, title, publishingYear, imageUrl } = values;

  try {
    await connectDB();

    let movie;
    if (id) {
      movie = await Movie.findById(id);
      if (movie) {
        movie.title = title;
        movie.publishingYear = publishingYear;
        movie.imageUrl = imageUrl;
      } else {
        throw new Error("Movie not found");
      }
    } else {
      movie = new Movie({ title, publishingYear, imageUrl });
    }

    const savedMovie = await movie.save();

    // Convert to plain object
    const plainMovie = savedMovie.toObject();
    return { success: true, data: plainMovie };
  } catch (e: any) {
    console.log(e);
    return { success: false, error: e.message };
  }
};
