import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Table from "./Table";

export default function Layout() {
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <Outlet />
          <div className=" mx-10 ">
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
}
