"use client";
import { useSession } from "@/lib/context/session";
import request from "@/lib/request";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { refetch } = useSession();

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const { data: rdata } = await request.post("/auth/signin", data);
    if (rdata.success) {
      localStorage.setItem("token", rdata.token);
      refetch();
    } else {
      alert(rdata.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-svh w-full flex items-center justify-center">
      <div className="dark:bg-base-300 bg-gray-50 p-5 w-sm rounded-sm space-y-3">
        <div>
          <div className="mb-4">
            <h1 className="font-bold text-3xl text-black text-center">
              Team Collab
            </h1>
            <h2 className="text-center">Sign In</h2>
          </div>
        </div>
        <form action="" className="space-y-4" onSubmit={submitForm}>
          <label htmlFor="" className="input flex items-center w-full">
            <span>Username</span>
            <input type="text" name="username" className="w-full" />
          </label>
          <label htmlFor="" className="input flex items-center w-full">
            <span>Password</span>
            <input type="password" name="password" className="w-full" />
          </label>
          <div>
            <button className="btn btn-primary w-full">
              {loading ? <span className="loading"></span> : <>Sign In</>}
            </button>
          </div>
        </form>
        <div className="text-center text-black">
          <span>OR</span>
        </div>
        <div>
          <Link href={"/auth/signup"} className="btn btn-secondary w-full">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
