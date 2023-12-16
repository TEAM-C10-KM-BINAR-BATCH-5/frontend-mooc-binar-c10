import { atom } from "recoil";

export const addCourseFormState = atom({
  key: "addCourseFormState",
  default: {
    name: "",
    categoryId: 0,
    instructor: "",
    level: "",
    price: 0,
    telegramLink: "",
    about: "",
    objective: "",
    onboarding: "",
    image: null,
  },
});

export const addModuleFormState = atom({
  key: "addModuleFormState",
  default: [
    {
      title: "",
      videos: [
        {
          videoNo: 1,
          videoTitle: "",
          videoLink: "",
          videoDuration: "0",
        },
      ],
    },
  ],
});

export const triggerDataUpdateState = atom({
  key: "triggerDataUpdateState",
  default: false,
});
