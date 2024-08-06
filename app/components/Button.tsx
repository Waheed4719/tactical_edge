import React from "react";

type ButtonProps = {
  size?: "small" | "medium" | "large";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ size, children, className, ...rest }: ButtonProps) => {
  let classes = `${className} rounded-md`;
  if (size === "small") {
    classes += " text-sm px-2 py-1";
  }
  if (size === "medium") {
    classes += " text-base px-4 py-2";
  }
  if (size === "large") {
    classes += " text-lg px-6 py-3";
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
