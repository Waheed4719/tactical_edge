"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      router.push("/movies");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <span className="text-white text-sm mt-7">Loading...</span>
      </main>
    );
  }

  return null;
}
