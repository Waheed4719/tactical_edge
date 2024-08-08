"use server";
import { connectDB } from "@/lib/mongodb";
import Movie from "@/models/Movie";

export const getMovieById = async (id: string) => {
  try {
    await connectDB();

    let movie;
    if (id) {
      movie = await Movie.findById(id);
      if (movie) {
        console.log(movie);
      } else {
        throw new Error("Movie not found");
      }
    } else {
      throw new Error("id is required");
    }

    console.log("found movie", movie);
    return { success: true, data: movie };
  } catch (e: any) {
    console.log(e);
    return { success: false, error: e.message };
  }
};
