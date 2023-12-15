import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: {
    visible: false,
    content: "",
  },
});
