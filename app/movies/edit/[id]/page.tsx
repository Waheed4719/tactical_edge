"use client";
import React, { useState, useEffect } from "react";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import MoviesHeader from "@/app/components/MoviesHeader";
import Dropzone from "@/app/components/Dropzone";
import { addOrUpdateMovie } from "@/actions/addOrUpdateMovie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/utils/cloudinary";
import LoadingIndicator from "@/app/components/LoadingIndicator";

type Movie = {
  title: string;
  publishingYear: number;
  imageUrl: string;
};

const EditMovie = () => {
  const router = useRouter();
  const { id: movieId } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [title, setTitle] = useState({ value: "", isValid: true });
  const [publishingYear, setPublishingYear] = useState({
    value: "",
    isValid: true,
  });
  const [errors, setErrors] = useState<{
    title?: string;
    publishingYear?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (movieId) {
      // Fetch the movie data when component mounts
      fetch(`/api/movies/${movieId}`)
        .then((res) => res.json())
        .then(({ data }) => {
          setMovie(data);
          setTitle({ value: data.title, isValid: true });
          setPublishingYear({
            value: data.publishingYear.toString(),
            isValid: true,
          });
          setImageUrl(data.imageUrl);
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
          toast.error("Failed to fetch movie data.");
        });
    }
  }, [movieId]);

  const validateTitle = (value: string) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, title: "Title is required." }));
      return false;
    } else {
      setErrors((prev) => {
        const { title, ...rest } = prev;
        return rest;
      });
      return true;
    }
  };

  const validatePublishingYear = (value: string) => {
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        publishingYear: "Publishing year is required.",
      }));
      return false;
    } else if (isNaN(Number(value)) || Number(value) <= 0) {
      setErrors((prev) => ({
        ...prev,
        publishingYear: "Publishing year must be a positive number.",
      }));
      return false;
    } else {
      setErrors((prev) => {
        const { publishingYear, ...rest } = prev;
        return rest;
      });
      return true;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "title") {
      const isValid = validateTitle(value);
      setTitle({ value, isValid });
    } else if (name === "publishingYear") {
      const isValid = validatePublishingYear(value);
      setPublishingYear({ value, isValid });
    }
  };

  const handleSubmit = async () => {
    const isTitleValid = validateTitle(title.value);
    const isPublishingYearValid = validatePublishingYear(publishingYear.value);

    if (!file && !imageUrl) {
      toast.error("Please upload an image.");
      return;
    }

    if (isTitleValid && isPublishingYearValid) {
      setLoading(true);
      try {
        let uploadedImageUrl = imageUrl;
        if (file) {
          uploadedImageUrl = await uploadToCloudinary(file);
        }

        // Perform the submit action
        const response = await addOrUpdateMovie({
          id: movieId as string,
          title: title.value,
          publishingYear: Number(publishingYear.value),
          imageUrl: uploadedImageUrl,
        });

        if (response.success) {
          toast.success("Movie updated successfully!");
          router.push("/movies");
        } else {
          toast.error("Failed to update movie: " + response.error);
        }
      } catch (error: any) {
        toast.error("An error occurred: " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Form is invalid, showing errors.");
    }
  };

  if (!movie) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <span className="text-white text-sm mt-7">Loading...</span>
      </main>
    ); // Add a loading state or spinner
  }

  const handleFileSelected = (file: File) => {
    setFile(file);
  };

  const handleCancel = () => router.push("/movies");

  return (
    <div className="container mx-auto p-8 min-h-screen py-20 max-w-[1200px] ">
      <MoviesHeader type="Edit" />
      <div className="flex justify-start items-start flex-wrap md:flex-nowrap gap-12 md:gap-20">
        {/* Left side (Dropzone) */}
        <Dropzone previewUrl={imageUrl} onFileSelected={handleFileSelected} />

        {/* Right side (Form fields) */}
        <div className="md:px-8 max-w-full">
          <div className="mb-4">
            <Input
              id="title"
              type="text"
              name="title"
              value={title.value}
              onChange={handleChange}
              className={`h-[45px] max-w-full w-[362px]  p-4 bg-inputColor rounded-[10px] outline-none ${
                errors.title ? "border border-red-500" : ""
              }`}
              placeholder="Enter movie title"
            />
            {errors.title && (
              <p className="text-red-500 mt-1">{errors.title}</p>
            )}
          </div>
          <div className="mb-4">
            <Input
              id="publishingYear"
              type="number"
              name="publishingYear"
              value={publishingYear.value}
              onChange={handleChange}
              className={`h-[45px] w-[216px] p-4 bg-inputColor rounded-[10px] outline-none ${
                errors.publishingYear ? "border border-red-500" : ""
              }`}
              placeholder="Enter publishing year"
            />
            {errors.publishingYear && (
              <p className="text-red-500 mt-1">{errors.publishingYear}</p>
            )}
          </div>
          <div className="flex gap-4 mt-12">
            <Button
              size="large"
              className="bg-transparent text-white px-4 py-2 rounded border border-white flex flex-1 justify-center font-bold"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              size="large"
              className={`bg-primary text-white px-4 py-2 rounded flex flex-1 justify-center font-bold disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                  <LoadingIndicator text="Submitting..." />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
