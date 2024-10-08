import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "./Button";
import { signOut, useSession } from "next-auth/react";

type MoviesHeaderProps = {
  type: "Add" | "List" | "Edit";
};

const MoviesHeader = ({ type }: MoviesHeaderProps) => {
  const router = useRouter();
  const { data: session } = useSession();

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

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/signin",
    });

    // router.push("/signin");
  };
  return (
    <div className="w-full max-w-[1200px] mb-12 md:mb-24 flex flex-col md:flex-row gap-4 items-center">
      <div className="flex gap-4 mr-auto">
        <h2 className="text-[24px]  md:text-h2">{getHeaderTitle()}</h2>
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
      </div>
      <div className="ml-auto flex flex-row gap-4 w-full md:w-fit justify-between">
        <h4 className="text-whit flex">
          Hi, {session?.user?.name?.split(" ")[0] || "User"}{" "}
          <span className="ml-3 hidden md:flex">|</span>{" "}
        </h4>{" "}
        <Button
          onClick={handleSignOut}
          className="bg-transparent text-white flex items-center gap-4"
        >
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
