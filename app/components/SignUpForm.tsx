"use client";
import React, { useState, FormEvent, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { register } from "@/actions/register";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
import LoadingIndicator from "./LoadingIndicator";

type Props = {};

const SignUpForm = (props: Props) => {
  const { status } = useSession();
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/movies");
    }
  }, [status, router]);

  const validateForm = (name: string, email: string, password: string) => {
    const errors: { name?: string; email?: string; password?: string } = {};
    if (!name) {
      errors.name = "Name is required.";
    }
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!validateForm(name, email, password)) {
      return;
    }

    setLoading(true);

    try {
      const signUp = await register({
        email,
        password,
        name,
      });

      e.currentTarget?.reset();

      if (signUp?.error) {
        toast.error(signUp.error);
      } else {
        toast.success("Signed up successfully.");
        router.push("/signin");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="justify-center items-center h-screen flex flex-col">
      <form
        className="z-1 flex flex-col gap-6 items-center"
        onSubmit={handleRegister}
      >
        <h1 className="text-h2">Sign Up</h1>
        <div>
          <Input
            className={`h-[45px] w-[300px] p-4 bg-inputColor rounded-[10px] ${
              formErrors.name ? "border-red-500" : ""
            }`}
            type="text"
            name="name"
            placeholder="Name"
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm">{formErrors.name}</p>
          )}
        </div>
        <div>
          <Input
            className={`h-[45px] w-[300px] p-4 bg-inputColor rounded-[10px] ${
              formErrors.email ? "border-red-500" : ""
            }`}
            type="email"
            name="email"
            placeholder="Email"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}
        </div>
        <div>
          <Input
            className={`h-[45px] w-[300px] p-4 bg-inputColor rounded-[10px] ${
              formErrors.password ? "border-red-500" : ""
            }`}
            type="password"
            name="password"
            placeholder="Password"
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm">{formErrors.password}</p>
          )}
        </div>

        <Button
          type="submit"
          className={`h-[54px] w-[300px] rounded-md p-2 bg-primary  disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={loading}
        >
          {loading ? <LoadingIndicator text="Registering..." /> : "Register"}
        </Button>
      </form>
      <Link className="text-sm mt-4" href="/signin">
        Already have an account? Sign In.
      </Link>
    </div>
  );
};

export default SignUpForm;
