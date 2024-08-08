"use client";
import React, { useEffect } from "react";
import SignInForm from "../components/SignInForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {};

const SignIn = (props: Props) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/movies");
    }
  }, [status, router]);

  return <SignInForm />;
};

export default SignIn;
