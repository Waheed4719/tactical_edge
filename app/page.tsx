import Image from "next/image";
import SignInForm from "./components/SignInForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-bgColor min-h-screen">
      <SignInForm />
    </main>
  );
}
