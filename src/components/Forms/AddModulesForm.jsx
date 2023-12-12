import AddVideoForm from "./AddVideoForm";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { addCourseFormState, addModuleFormState } from "../../atom/formAtom";
import axios from "axios";
import { modalState } from "../../atom/modalAtom";

import { loadingState } from "../../atom/loadingAtom";

export default function AddModuleForm() {
  const [formData, setFormData] = useRecoilState(addModuleFormState);
  const courseData = useRecoilValue(addCourseFormState);
  const token = localStorage.getItem("token");
  const resetCourse = useResetRecoilState(addCourseFormState);
  const resetModule = useResetRecoilState(addModuleFormState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const handleAddModule = (e) => {
    e.preventDefault();
    setFormData((prev) => [
      ...prev,
      {
        title: "",
        videos: [
          {
            videoNo: 0,
            videoTitle: "",
            videoLink: "",
            videoDuration: 0,
          },
        ],
      },
    ]);
  };
  const handleDeleteModule = (e) => {
    e.preventDefault();
    setFormData((prev) => {
      const updatedFormData = [...prev];

      if (updatedFormData.length > 0) {
        return updatedFormData.slice(0, -1);
      }

      return updatedFormData;
    });
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = [...prev];
      updatedFormData[index] = {
        ...updatedFormData[index],
        [name]: value,
      };
      return updatedFormData;
    });
    console.log(formData);
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/course`,
        {
          title: courseData.name,
          level: courseData.level,
          telegramLink: courseData.telegramLink,
          price: parseInt(courseData.price),
          rating: courseData.rating,
          about: courseData.about,
          objective: courseData.objective,
          categoryId: courseData.categoryId,
          onboarding: courseData.onboarding,
          instructor: courseData.instructor,
          image: courseData.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const courseId = response.data.data.newCourse.id;
      formData.map(async (data) => {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/module`,
          {
            title: data.title,
            courseId: courseId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const moduleId = response.data.data.newModule.id;
        data.videos.map((video) => {
          axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/video`,
            {
              no: video.videoNo,
              title: video.videoTitle,
              videoUrl: video.videoLink,
              duration: video.videoDuration,
              moduleId: moduleId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        });
      });
      resetCourse();
      resetModule();

      setShowModal(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <p className="py-5 text-costumeBlue font-bold text-2xl text-center">
        Tambah Modul
      </p>
      <form className="w-full max-w-md xs:max-w-xs mx-auto relative">
        {formData.map((_, index) => (
          <div
            key={index}
            className=" w-full shadow-md border-2 border-gray-300 p-5 rounded-lg m-3"
          >
            <p className="py-5 text-costumeBlue font-bold text-xl text-start">
              Modul {index + 1}
            </p>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Judul
              </label>
              <input
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Masukan judul modul"
                defaultValue={formData[index].title}
                name="title"
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
            <AddVideoForm moduleIndex={index} />
          </div>
        ))}
        <div className="flex justify-end gap-3">
          <button
            className="p-4 py-0 bg-costumeBlue text-white rounded-full text-2xl disabled:opacity-75"
            onClick={handleDeleteModule}
            disabled={formData.length <= 1 ? true : false}
          >
            -
          </button>
          <button
            className="p-3 py-1 bg-costumeBlue text-white rounded-full text-2xl"
            onClick={handleAddModule}
          >
            +
          </button>
        </div>
        <button
          onClick={handleSaveCourse}
          className="w-full bg-costumeBlue text-white mt-8 rounded-lg p-3"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
