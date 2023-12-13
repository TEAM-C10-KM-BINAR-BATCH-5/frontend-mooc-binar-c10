import logo from "../../assets/logo-learnhub-white.svg";
import { SIDEBAR_LINKS } from "../../libs/sidebarMenu";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { useState } from "react";
import Logout from "../Modal/Logout";
import { SignOut } from "@phosphor-icons/react";

const linkClass =
  "flex items-center gap-2 font-bold text-md px-3 py-2 hover:bg-blue-400 hover:no-underline active:bg-indigo-600 rounded-lg text-base";

export default function Sidebar() {
  const [showModal, setShowModal] = useState(false);

  const { pathname } = useLocation();

  return (
    <div className="bg-costumeBlue w-12 sm:w-56 flex flex-col items-center transition-all">
      <div className="flex items-center justify-center py-10">
        <img src={logo} className="w-10 sm:w-20" alt="" />
      </div>
      <div className="py-2 p-5 flex flex-col gap-3 items-left">
        {SIDEBAR_LINKS.map((link) => (
          <Link
            key={link.key}
            to={link.path}
            className={classNames(
              pathname === link.path ? "bg-blue-500 text-white" : "text-white",
              linkClass
            )}
          >
            <span>{link.icon}</span>
            <span className="hidden sm:block">{link.label}</span>
          </Link>
        ))}
      </div>
      <div className="py-2 p-5 mr-0 sm:mr-9">
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className="flex items-center gap-2 text-white hover:bg-blue-400 hover:no-underline active:bg-indigo-600 rounded-lg text-base px-3 py-2 font-bold"
        >
          <span>
            <SignOut size={24} color="#ffffff" weight="bold" />
          </span>
          <h2 className="hidden sm:block">keluar</h2>
        </button>
      </div>
      <Logout isVisible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
