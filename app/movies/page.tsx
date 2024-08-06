"use client";
import React, { useState } from "react";
import Card from "../components/Card";
import MoviesHeader from "../components/MoviesHeader";
import Pagination from "../components/Pagination";
import Button from "../components/Button";

type MoviesProps = {};

const dummyMovies = [
  {
    id: 1,
    title: "Inception",
    publishingYear: 2021,
    description: "A mind-bending thriller",
  },
  {
    id: 2,
    title: "The Dark Knight",
    publishingYear: 2021,
    description: "A superhero film",
  },
  {
    id: 3,
    title: "Interstellar",
    publishingYear: 2021,
    description: "A space exploration epic",
  },
  {
    id: 4,
    title: "Harry Potter",
    publishingYear: 2021,
    description: "A space exploration epic",
  },
  {
    id: 5,
    title: "Spiderman",
    publishingYear: 2021,
    description: "A mind-bending thriller",
  },
  {
    id: 6,
    title: "The Dark Knight Rises",
    publishingYear: 2021,
    description: "A superhero film",
  },
  {
    id: 7,
    title: "Superman Legacy",
    publishingYear: 2021,
    description: "A space exploration epic",
  },
  {
    id: 8,
    title: "Avengers: Doomsday",
    publishingYear: 2021,
    description: "A space exploration epic",
  },
];

const Movies = ({}: MoviesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(dummyMovies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = dummyMovies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="px-4 py-24  min-h-screen flex flex-col items-center justify-start">
      <MoviesHeader type="List" />
      {currentMovies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentMovies.map(({ id, title, publishingYear }) => (
              <Card key={id} title={title} publishingYear={publishingYear} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 my-20">
          <h2 className="text-h2">Your movie list is empty</h2>
          <Button
            size="large"
            className="bg-primary text-white flex items-center gap-4 mt-8"
          >
            Add a new movie
          </Button>
        </div>
      )}
    </div>
  );
};

export default Movies;
