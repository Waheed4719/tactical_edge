"use client";
import React, { useState } from "react";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import MoviesHeader from "@/app/components/MoviesHeader";
import Dropzone from "@/app/components/Dropzone";
import { addOrUpdateMovie } from "@/actions/addOrUpdateMovie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/utils/cloudinary";
import LoadingIndicator from "@/app/components/LoadingIndicator";

const AddMovie = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
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

    if (!file) {
      toast.error("Please upload an image.");
      return;
    }

    if (isTitleValid && isPublishingYearValid && file) {
      setLoading(true);
      try {
        const url = await uploadToCloudinary(file);
        // Perform the submit action
        const response = await addOrUpdateMovie({
          title: title.value,
          publishingYear: Number(publishingYear.value),
          imageUrl: url,
        });

        if (response.success) {
          toast.success("Movie added successfully!");
          router.push("/movies");
        } else {
          toast.error("Failed to add movie: " + response.error);
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

  const handleFileSelected = (file: File) => {
    setFile(file);
  };

  const handleCancel = () => router.push("/movies");

  return (
    <div className="container mx-auto p-8 min-h-screen py-20 max-w-[1200px] ">
      <MoviesHeader type="Add" />
      <div className="flex justify-start items-start flex-wrap md:flex-nowrap gap-12 md:gap-20">
        {/* Left side (Dropzone) */}
        <Dropzone onFileSelected={handleFileSelected} />

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
              {loading ? <LoadingIndicator text="Submitting..." /> : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
