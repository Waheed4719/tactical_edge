"use client";
import React, { useState, FormEvent, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { register } from "@/actions/register";
import { useSession } from "next-auth/react";

type Props = {};

const SignUpForm = (props: Props) => {
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
    const signUp = await register({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    });
    e.currentTarget.reset();
    if (signUp?.error) {
      setError(signUp.error);
      return;
    } else {
      return router.push("/login");
    }
  };
  return (
    <div className="justify-center items-center h-screen flex ">
      <form
        className="z-1 flex flex-col gap-6 items-center"
        onSubmit={handleLogin}
      >
        <h1 className="text-h2">Sign Up</h1>
        {error && <p className="text-red-500">{error}</p>}
        <Input
          className="h-[45px] w-[300px] p-4 bg-inputColor rounded-[10px]"
          type="text"
          name="name"
          placeholder="Name"
        />
        <Input
          className="h-[45px] w-[300px] p-4 bg-inputColor rounded-[10px]"
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

        <Button
          type="submit"
          className="h-[54px] w-[300px] rounded-md p-2 bg-primary"
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
