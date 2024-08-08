import React from "react";

type Props = {
  text: string;
};

const LoadingIndicator = ({ text }: Props) => {
  return (
    <span className="flex items-center justify-center">
      <svg
        className="animate-spin h-5 w-5 mr-3 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
        ></path>
      </svg>
      {text}
    </span>
  );
};

export default LoadingIndicator;
