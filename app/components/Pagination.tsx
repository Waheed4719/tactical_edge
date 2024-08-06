import React from "react";
import Button from "./Button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-4 pt-20 flex justify-center items-center space-x-3">
      <Button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-transparent rounded disabled:opacity-50"
      >
        Prev
      </Button>

      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-4 py-2 rounded ${
            pageNumber === currentPage
              ? "bg-primary text-white"
              : "bg-cardColor text-white"
          }`}
        >
          {pageNumber}
        </Button>
      ))}

      <Button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-transparent rounded disabled:opacity-50"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
