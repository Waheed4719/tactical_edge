"use client";
import React, { useState, FormEvent, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
import LoadingIndicator from "./LoadingIndicator";

type Props = {};

const SignInForm = (props: Props) => {
  const { status } = useSession();
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/movies");
    }
  }, [status, router]);

  const validateForm = (email: string, password: string) => {
    const errors: { email?: string; password?: string } = {};
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

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!validateForm(email, password)) {
      return;
    }

    setLoading(true); // Start loading

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false); // Stop loading

    if (res?.error) {
      toast.error((res.error as string) || "Failed to sign in.");
    } else if (res?.ok) {
      toast.success("Signed in successfully.");
      router.push("/movies");
    }
  };

  return (
    <div className="justify-center items-center h-screen flex flex-col">
      <form
        className="z-1 flex flex-col gap-6 items-center"
        onSubmit={handleLogin}
      >
        <h1 className="text-h2">Sign In</h1>
        <div>
          <Input
            className={`h-[45px] w-[300px] p-4 bg-inputColor rounded-[10px] active:bg-inputColor autofill:bg-inputColor ${
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
          className="h-[54px] w-[300px] rounded-md p-2 bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <LoadingIndicator text="Logging in..." /> // Display loading text or spinner
          ) : (
            "Login"
          )}
        </Button>
      </form>
      <Link className="text-sm mt-4" href="/signup">
        Don&apos;t have an account? Sign Up!
      </Link>
    </div>
  );
};

export default SignInForm;
