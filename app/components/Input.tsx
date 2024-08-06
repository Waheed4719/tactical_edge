import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ ...rest }: InputProps) => {
  return <input {...rest} />;
};

export default Input;
