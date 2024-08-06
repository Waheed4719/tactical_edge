import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "./Button";

type MoviesHeaderProps = {
  type: "Add" | "List" | "Edit";
};

const MoviesHeader = ({ type }: MoviesHeaderProps) => {
  const router = useRouter();
  const getHeaderTitle = () => {
    switch (type) {
      case "Add":
        return "Add Movie";
      case "List":
        return "My Movies";
      case "Edit":
        return "Edit Movie";
    }
  };
  return (
    <div className="w-full max-w-[1200px] mb-12 md:mb-24 flex flex-row gap-4 items-center">
      <h2 className="text-h2">{getHeaderTitle()}</h2>
      {type === "List" && (
        <Button
          className="bg-transparent"
          onClick={() => router.push("/movies/add")}
        >
          <Image
            src="/icons/plus-icon.svg"
            alt="Hero Image"
            width={35}
            height={35}
          />
        </Button>
      )}

      <div className="ml-auto flex flex-row gap-2">
        <Button className="bg-transparent text-white flex items-center gap-4">
          Logout
          <Image
            src="/icons/logout-icon.svg"
            alt="Hero Image"
            width={20}
            height={20}
            priority
          />
        </Button>
      </div>
    </div>
  );
};

export default MoviesHeader;
