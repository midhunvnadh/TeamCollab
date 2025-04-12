"use client";
import { useSession } from "@/lib/context/session";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading, error } = useSession();

  useEffect(() => {
    document.title = "Welcome | TeamCollab";
  }, []);

  if (!loading) {
    if (user) {
      redirect("/projects");
    } else {
      redirect("/auth/login");
    }
  }
  return (
    <main className="w-full h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-black">TeamCollab!</h1>
      <div className="py-2"></div>
      <div>
        {loading && (
          <div>
            <span className="loading"></span>
          </div>
        )}
      </div>
    </main>
  );
}
