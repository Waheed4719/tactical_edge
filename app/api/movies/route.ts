import { NextRequest, NextResponse } from "next/server";
import { addOrUpdateMovie } from "@/actions/addOrUpdateMovie";
import { connectDB } from "@/lib/mongodb";
import Movie from "@/models/Movie";

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Add or update a movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               publishingYear:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *               id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */

export async function POST(req: NextRequest) {
  try {
    const { title, publishingYear, imageUrl, id } = await req.json();

    // Use the addOrUpdateMovie function
    const result = await addOrUpdateMovie({
      id,
      title,
      publishingYear,
      imageUrl,
    });

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get a list of movies
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of movies per page
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal Server Error
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    await connectDB();

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const movies = await Movie.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .exec();

    const totalMovies = await Movie.countDocuments();

    return NextResponse.json(
      {
        success: true,
        data: movies,
        totalPages: Math.ceil(totalMovies / limitNumber),
        currentPage: pageNumber,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
