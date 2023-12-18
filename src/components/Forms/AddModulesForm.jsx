import AddVideoForm from "./AddVideoForm";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  addCourseFormState,
  addModuleFormState,
  triggerDataUpdateState,
} from "../../atom/formAtom";
import { modalState } from "../../atom/modalAtom";

import { loadingState } from "../../atom/loadingAtom";
import { AnimatePresence, motion } from "framer-motion";
import { createCourse, createModule, createVideo } from "../../libs/api";
import { isFormEmpty } from "../../../utils/formCheck";

export default function AddModuleForm() {
  const [formData, setFormData] = useRecoilState(addModuleFormState);
  const courseData = useRecoilValue(addCourseFormState);
  const resetCourse = useResetRecoilState(addCourseFormState);
  const resetModule = useResetRecoilState(addModuleFormState);
  const setShowModal = useSetRecoilState(modalState);
  const setIsLoading = useSetRecoilState(loadingState);
  const [triggerDataUpdate, setTriggerDataUpdate] = useRecoilState(
    triggerDataUpdateState
  );
  const isCourseEmpty = isFormEmpty(courseData);
  const isModuleEmpty = isFormEmpty(formData);
  const isVideoEmpty = formData.some((data) => isFormEmpty(data.videos));

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
            videoDuration: "0",
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
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await createCourse({
        name: courseData.name,
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
      });
      const courseId = response.id;
      formData.map(async (data) => {
        const isLocked = data.isLocked != undefined ? data.isLocked : "false";
        const response = await createModule({
          title: data.title,
          isLocked: JSON.parse(isLocked),
          courseId,
        });
        const moduleId = response.id;
        data.videos.map(async (video) => {
          await createVideo({
            no: video.videoNo,
            title: video.videoTitle,
            videoUrl: video.videoNo,
            duration: video.videoDuration,
            moduleId: moduleId,
          });
        });
      });
      resetCourse();
      resetModule();
      setTriggerDataUpdate(!triggerDataUpdate);
      setShowModal(false);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ x: 100 }} animate={{ x: 0 }} exit={{ x: 100 }}>
        <div className="w-full h-full">
          <p className="py-5 text-costumeBlue font-bold text-2xl text-center">
            Tambah Modul
          </p>
          <form className="w-full max-w-md xs:max-w-xs mx-auto relative">
            {formData.map((_, index) => (
              <AnimatePresence key={index}>
                <motion.div
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  exit={{ x: 100 }}
                >
                  <div className=" w-full shadow-md border-2 border-gray-300 p-5 rounded-lg m-3">
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
                    {parseInt(courseData.price) > 0 && (
                      <select
                        className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formData[index].isLocked}
                        name="isLocked"
                        onChange={(e) => handleInputChange(e, index)}
                      >
                        <option value="">Pilih status modul</option>
                        <option value="true">Terkunci</option>
                        <option value="false">Tidak Terkunci</option>
                      </select>
                    )}
                    <AddVideoForm moduleIndex={index} />
                  </div>
                </motion.div>
              </AnimatePresence>
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
              className="w-full bg-costumeBlue text-white mt-8 rounded-lg p-3 disabled:opacity-50"
              disabled={isCourseEmpty || isModuleEmpty || isVideoEmpty}
            >
              Simpan
            </button>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
