import logo from "../assets/logo-learnhub-white.svg";
import { SIDEBAR_LINKS } from "../libs/Sidebar-menu";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const linkClass =
  "flex items-center gap-2 font-bold text-md px-3 py-2 hover:bg-blue-500 hover:no-underline active:bg-indigo-600 rounded-sm text-base";

function SidebarLink({ link }) {
  const { patchname } = useLocation();
  return (
    <Link
      to={link.path}
      className={classNames(
        patchname === link.path ? "bg-indigo-500 text-white" : "text-white",
        linkClass
      )}
    >
      {link.icon}
      <span className="hidden sm:block">{link.label}</span>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <div className="bg-costumeBlue w-24 sm:w-56 flex flex-col">
      <div className="flex items-center justify-center py-10">
        <img src={logo} className="w-16 sm:w-28" alt="" />
      </div>
      <div className="py-2 p-5 flex flex-1 flex-col gap-4">
        {SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>
    </div>
  );
}
