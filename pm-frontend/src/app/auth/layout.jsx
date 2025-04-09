"use client";
import { useSession } from "@/lib/context/session";
import { redirect } from "next/navigation";
import React from "react";

export default function layout({ children }) {
  const { user, loading, error } = useSession();
  if (!loading && user) {
    redirect("/");
  }
  return <div>{children}</div>;
}
