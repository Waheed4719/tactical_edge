import Image from "next/image";
import React from "react";

type CardProps = {
  title: string;
  publishingYear: number;
};

const Card = ({ title, publishingYear }: CardProps) => {
  return (
    <div className="bg-cardColor rounded-[12px] gap-4 flex-col flex  w-[282px] max-w-full p-3">
      <Image
        className="h-[400px] w-[266px] max-w-full rounded-[12px] mx-auto"
        src="/images/emily_the_criminal.jpeg"
        alt="Placeholder"
        width={266}
        height={400}
      />
      <div className="flex flex-col gap-3 px-3 pb-3">
        <h1 className="text-body-sm">{title}</h1>
        <p className="text-gray-500 text-sm">{publishingYear} </p>
      </div>
    </div>
  );
};

export default Card;
