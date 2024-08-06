import React, { useCallback, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import Image from "next/image";

type Props = {
  onFileUploaded?: (file: File) => void;
  accept?: string[];
};

const Dropzone = ({ accept, onFileUploaded }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": accept || [".jpg", ".jpeg", ".png"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="w-[473px] p-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center flex-col h-[400px] md:h-[504px] text-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-white">Drop the files here ...</p>
      ) : preview ? (
        <div className="relative w-full h-full">
          <Image
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
