"use client";
import React, { useState, FormEvent, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

type Props = {};

const SignInForm = (props: Props) => {
  const { status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/movies");
    }
  }, [status, router]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/movies");
    }
  };
  return (
    <div className="justify-center items-center h-screen flex ">
      <form
        className="z-1 flex flex-col gap-6 items-center"
        onSubmit={handleLogin}
      >
        <h1 className="text-h2">Sign In</h1>
        {error && <p className="text-red-500">{error}</p>}
        <Input
          className="h-[45px] w-[300px] p-4 bg-inputColor rounded-[10px] active:bg-inputColor autofill:bg-inputColor"
          type="email"
          name="email"
          placeholder="Email"
        />
        <Input
          className="h-[45px] w-[300px] p-4 bg-inputColor rounded-[10px]"
          type="password"
          name="password"
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
          type="submit"
          className="h-[54px] w-[300px] rounded-md p-2 bg-primary"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
