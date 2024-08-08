import { getMovieById } from "@/actions/getMovieById";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to retrieve
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 publishingYear:
 *                   type: number
 *                 imageUrl:
 *                   type: string
 *                 id:
 *                   type: string
 *       '404':
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: Internal Server Error
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // Find movie by ID
  const movie = await getMovieById(id);
  
  if (movie) {
    console.log("movie found", movie);
    return NextResponse.json(movie);
  } else {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });
  }
}
