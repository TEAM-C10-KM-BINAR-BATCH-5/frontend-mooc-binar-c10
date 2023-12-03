import { House, Book, SignOut } from "@phosphor-icons/react";

export const SIDEBAR_LINKS = [
  {
    key: "home",
    label: "Dashboard",
    path: "/",
    icon: <House size={24} color="#ffffff" weight="bold" />,
  },
  {
    key: "kelola_kelas",
    label: "Kelola Kelas",
    path: "/kelas",
    icon: <Book size={24} color="#ffffff" weight="bold" />,
  },
  // {
  //   key: "keluar",
  //   label: "Keluar",
  //   path: "/out",
  //   icon: <SignOut size={24} color="#ffffff" weight="bold" />,
  // },
];
