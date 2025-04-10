"use client";
import { useSession } from "@/lib/context/session";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function layout({ children }) {
  const { user, loading, error } = useSession();
  useEffect(() => {
    if (!loading && !user) {
      redirect("/");
    }
  }, [loading, user]);
  return <div>{children}</div>;
}
