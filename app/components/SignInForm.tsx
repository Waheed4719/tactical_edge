"use client"
import React from "react";
import Input from "./Input";
import Button from "./Button";
import { useRouter } from 'next/navigation'

type Props = {};

const SignInForm = (props: Props) => {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform any login logic here
    router.push("/movies"); // Navigate to another page
  };
  return (
    <div className="justify-center items-center h-screen flex ">
      <form className="z-1 flex flex-col gap-6 items-center">
        <h1 className="text-h2">Sign In</h1>
        <Input
          className="h-[45px] w-[300px] p-4 bg-inputColor rounded-[10px]"
          type="email"
          placeholder="Email"
        />
        <Input
          className="h-[45px] w-[300px] p-4 bg-inputColor rounded-[10px]"
          type="password"
          placeholder="Password"
        />
        <div className="flex items-center">
          <input
            id="link-checkbox"
            type="checkbox"
            value=""
            className="h-[17px] w-[18px] text-blue-600 bg-inputColor accent-primary rounded border border-gray-300 focus:ring-gray-500 mr-2"
          />
          <label
            htmlFor="link-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember Me
          </label>
        </div>
        <Button
          onClick={handleLogin}
          className="h-[54px] w-[300px] rounded-md p-2 bg-primary"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
