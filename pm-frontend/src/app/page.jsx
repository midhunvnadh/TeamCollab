"use client";
import { useSession } from "@/lib/context/session";
import { redirect } from "next/navigation";

export default function Home() {
  const { user, loading, error } = useSession();
  if (!loading) {
    if (user) {
      redirect("/projects");
    } else {
      redirect("/auth/login");
    }
  }
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Welcome!</h1>
    </main>
  );
}
