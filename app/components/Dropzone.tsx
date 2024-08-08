"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { uploadToCloudinary } from "@/utils/cloudinary";

type Props = {
  onFileSelected?: (file: File) => void;
  accept?: string[];
  previewUrl?: string;
};

const Dropzone = ({ accept, onFileSelected, previewUrl }: Props) => {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);

  useEffect(() => {
    if (previewUrl) {
        console.log("previewUrl", previewUrl);
      setPreview(previewUrl);
    }
  }, [previewUrl]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        if (onFileSelected) {
          onFileSelected(file);
        }
      }
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept
      ? accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {})
      : { "image/*": [".jpg", ".jpeg", ".png"] },
  });

  return (
    <div
      {...getRootProps()}
      className="w-[473px] p-4 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center flex-col h-[400px] md:h-[504px] text-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-white">Drop the files here ...</p>
      ) : preview ? (
        <div className="relative w-full h-full">
          <Image
            className="bg-[rgba(0,0,0,0.3)]"
            src={preview}
            alt="Preview"
            layout="fill"
            objectFit="contain"
          />
        </div>
      ) : (
        <p className="text-white">
          Drag &apos;n&apos; drop some files here, or click to select files
        </p>
      )}
    </div>
  );
};

export default Dropzone;
