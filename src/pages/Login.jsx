import { useState } from "react";
import logo from "../assets/logo-learnhub-white.svg";
import { Eye } from "@phosphor-icons/react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 h-screen w-full gap-3">
      <div className="hidden sm:flex items-center justify-center h-screen bg-costumeBlue">
        <img className="blox mx-auto w-56" src={logo} alt="" />
      </div>

      <div className="flex flex-col justify-center items-center col-span-2">
        <h1 className="text-costumeBlue text-4xl font-bold py-5">Login</h1>
        <br />
        <form className="w-full max-w-md xs:max-w-xs mx-auto relative">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Id Admin
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Id Admin"
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label className="block text-gray-700 text-sm font-bold mr-2">
                Password
              </label>
              <a
                className="inline-block align-baseline font-bold text-sm text-costumeBlue"
                href="#"
              >
                Lupa kada sandi?
              </a>
            </div>
            <div className="relative">
              <input
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                type={showPassword ? "text" : "password"}
                placeholder="Masukan password"
              />
              <button
                className="absolute top-3 end-2"
                onClick={(e) => togglePasswordVisibility(e)}
              >
                <Eye size={28} color="#8A8A8A" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-costumeBlue text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline"
              type="button"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
