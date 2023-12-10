import { atom } from "recoil";

export const addCourseFormState = atom({
  key: "addCourseFormState",
  default: {
    name: "",
    categoryId: 0,
    instructor: "",
    level: "",
    price: 0,
    rating: 5,
    telegramLink: "",
    about: "",
    objective: "",
    onboarding: "",
    image: null,
  },
});

export const addModuleFormState = atom({
  key: "addModuleFormState",
  default: {
    title: "",
    videoLink: "",
  },
});
