import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-[calc(100%-16rem)] sm:w-[calc(100%-56rem)]  flex-1">
        <Navbar />
        <div className="flex-1 p-4 min-h-0 overflow-auto overflow-x-hidden w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
