import React from "react";
import testImg from "../assets/404.jpg";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };
  return (
    <div class="relative h-screen overflow-hidden bg-indigo-900">
      <img src={testImg} class="absolute object-cover w-full h-full" />
      <div class="absolute inset-0 bg-black opacity-25"></div>
      <div class="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
        <div class="relative z-10 flex flex-col items-center w-full font-mono">
          <h1 class="mt-4 text-5xl font-extrabold leading-tight text-center text-white">
            You&#x27;re alone here
          </h1>
          <p class="font-extrabold text-white text-8xl my-28 animate-bounce">
            404
          </p>
          <button
            onClick={redirectToHome}
            className="bg-indigo-600 border-2 rounded-lg text-white py-2 text-xl px-4"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
}
