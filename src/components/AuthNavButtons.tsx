import React from "react";
import { useUser } from "@clerk/clerk-react";

export default function AuthNavButtons() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return (
      <a
        href="/schubfach/uebungen"
        className="relative rounded-md bg-black text-white flex items-center px-5 py-2 font-bold tracking-wider transition-all duration-200 group"
      >
        Dashboard
        <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
      </a>
    );
  }

  return (
    <>
      <a
        href="/auth/signin"
        className="relative rounded-md text-black group select-none flex items-center hover:bg-black focus:bg-gray-300 justify-center cursor-pointer px-5 py-2 font-bold tracking-wider transition-all duration-200 overflow-hidden"
      >
        <p className="font-bold text-md select-none group-hover:text-white duration-200 transition-all">
          Sign In
        </p>
      </a>
      <a
        href="/auth/signup"
        className="relative rounded-md bg-white border border-black hover:border-transparent text-black hover:bg-black focus:bg-gray-300 group select-none flex items-center justify-center cursor-pointer px-5 py-2 font-bold tracking-wider transition-all duration-200 overflow-hidden ml-3"
      >
        <p className="font-bold text-md select-none group-hover:text-white duration-200 transition-all">
          Sign Up
        </p>
      </a>
    </>
  );
}
