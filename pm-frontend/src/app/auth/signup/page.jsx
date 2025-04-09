import Link from "next/link";
import React from "react";

export default function signup() {
  return (
    <div className="h-svh w-full flex items-center justify-center">
      <div className="dark:bg-base-300 bg-gray-50 p-5 w-sm rounded-sm space-y-3">
        <div>
          <div className="mb-4 text-center">
            <h1 className="font-bold text-3xl dark:text-white text-black text-center">
              Team Collab
            </h1>
            <h2>Sign Up</h2>
          </div>
        </div>
        <form action="" className="space-y-4">
          <label htmlFor="" className="input flex items-center w-full">
            <span>Username</span>
            <input type="text" name="username" className="w-full" />
          </label>
          <label htmlFor="" className="input flex items-center w-full">
            <span>Password</span>
            <input type="password" name="password" className="w-full" />
          </label>
          <label htmlFor="" className="input flex items-center w-full">
            <span>Confirm Password</span>
            <input type="password" name="password_c" className="w-full" />
          </label>
          <div>
            <button className="btn btn-primary w-full">Sign Up</button>
          </div>
        </form>
        <div className="text-center dark:text-white text-black">
          <span>OR</span>
        </div>
        <div>
          <Link href={"/auth/login"} className="btn btn-secondary w-full">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
