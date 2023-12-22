import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUser } from "../../libs/api";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const profile = async () => {
      try {
        await getCurrentUser();
      } catch (err) {
        navigate("/login");
      }
    };
    profile();
  }, []);

  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="flex flex-col w-[calc(100%-16rem)] sm:w-[calc(100%-56rem)]  flex-1">
        <Navbar />
        <div className="flex-1 p-4 min-h-0 overflow-auto overflow-x-hidden w-full bg-gray-100">
          <Outlet />
        </div>
        <div className="w-full md:hidden">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
