// app/movies/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import MoviesHeader from "../components/MoviesHeader";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import useMovies from "@/hooks/useMovies";
import { useSession } from "next-auth/react";

const Movies = () => {
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
      router.push("/signin");
    }
  }, [status, router]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { movies, totalPages, loading, error } = useMovies(
    currentPage,
    itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-8 pt-16 pb-24 min-h-screen flex flex-col items-center justify-start">
      {(movies.length > 0 || loading) && <MoviesHeader type="List" />}
      {loading ? (
        <div className="my-auto">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <p>Error loading movies: {typeof error === "string" ? error : ""}</p>
      ) : movies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-auto">
            {movies.map(({ _id, title, publishingYear, imageUrl }) => (
              <Button
                key={_id}
                className="bg-transparent"
                onClick={() => router.push(`/movies/edit/${_id}`)}
              >
                <Card
                  id={_id}
                  title={title}
                  publishingYear={publishingYear}
                  imageUrl={imageUrl}
                />
              </Button>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 my-auto">
          <h2 className="text-h2 text-center">Your movie list is empty</h2>
          <Button
            size="large"
            className="bg-primary text-white flex items-center gap-4 mt-8"
            onClick={() => router.push("/movies/add")}
          >
            Add a new movie
          </Button>
        </div>
      )}
    </div>
  );
};

export default Movies;
