import { atom } from "recoil";

export const courseFilterState = atom({
  key: "courseFilterState",
  default: {
    categoryIds: [],
  },
});

export const coursePriceState = atom({
  key: "coursePriceState",
  default: 0,
});
