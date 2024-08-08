import { useState, useEffect } from "react";

const useMovies = (page: number, limit: number = 4) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/movies?page=${page}&limit=${limit}`);
        const data = await res.json();
        if (data.success) {
          setMovies(data.data);
          setTotalPages(data.totalPages);
        } else {
          setError(data.error || "Failed to fetch movies");
        }
      } catch (error: any) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, limit]);

  return { movies, totalPages, loading, error };
};

export default useMovies;
