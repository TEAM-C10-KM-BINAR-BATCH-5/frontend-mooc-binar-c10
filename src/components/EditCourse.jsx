import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  editCourse,
  editModule,
  getCategory,
  getCoursesById,
  getModulesByCourseId,
} from "../libs/api";
import { FloppyDisk, PencilSimpleLine } from "@phosphor-icons/react";
import { shallowEqual } from "shallow-equal";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loadingState } from "../atom/loadingAtom";
import { triggerDataUpdateState } from "../atom/formAtom";
import { swalFireConfirm, swalFireResult } from "../libs/swalFire";
import { coursePriceState } from "../atom/courseAtom";

export default function EditCourse() {
  const [courseData, setCourseData] = useState(null);
  const [categories, setCategories] = useState();
  const [image, setImage] = useState("");
  const { id } = useParams();
  const courseRef = useRef();
  const isEdited = !shallowEqual(courseData, courseRef.current);
  const setIsLoading = useSetRecoilState(loadingState);
  const [triggerDataUpdate, setTriggerDataUpdate] = useRecoilState(
    triggerDataUpdateState
  );
  const setCoursePrice = useSetRecoilState(coursePriceState);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoryData = await getCategory();
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await getCoursesById(id);
        courseRef.current = data;
        setCourseData(data);
        setCoursePrice(data.price);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [id, triggerDataUpdate]);

  const handleImageUpload = (event) => {
    const uploadedImage = URL.createObjectURL(event.target.files[0]);
    setImage(uploadedImage);
  };

  const handleSaveData = async () => {
    try {
      const result = await swalFireConfirm(
        "Apakah anda yakin?",
        "Anda dapat mengubahnya lagi nanti",
        "question"
      );

      if (result.isConfirmed) {
        setIsLoading(true);
        await editCourse(id, courseData);
        swalFireResult("Berhasil!", "Berhasil menyimpan perubahan", "success");
        setTriggerDataUpdate(!triggerDataUpdate);
      }
    } catch (err) {
      console.log(err);
      swalFireResult("Gagal", "Gagal menyimpan perubahan", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setCourseData((prev) => {
      if (files) {
        return {
          ...prev,
          [name]: files[0],
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <div>
        {courseData ? (
          <div className="p-5">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col md:flex-row gap-2 w-full justify-between items-end">
                <label className="group cursor-pointer transition-all ease-linear w-full md:w-1/2	 hover:brightness-75">
                  <img
                    src={image || courseData.imageUrl}
                    alt="Image not Found"
                    className="w-full object-cover aspect-video rounded-lg"
                  />

                  <div className="hidden absolute inset-0  items-center justify-center group-hover:flex transition-all ease-linear z-50 brightness-200">
                    <PencilSimpleLine size={60} color="#FFFFFF" />
                  </div>

                  <input
                    type="file"
                    name="image"
                    id="image"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      handleInputChange(e);
                      handleImageUpload(e);
                    }}
                  />
                </label>
                <div className="flex flex-col gap-2 w-full md:w-1/3">
                  <label className="block text-gray-700 mb-2 w-full">
                    <p className="text-sm font-bold">Judul Kelas</p>
                    <input
                      className="appearance-none border border-gray-500 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-costumeBlue focus:shadow-outline w-full"
                      type="text"
                      name="title"
                      value={courseData.title}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label className="block text-gray-700 mb-2">
                    <p className="text-sm font-bold">Instruktur</p>
                    <input
                      className="appearance-none border w-full border-gray-500 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-costumeBlue focus:shadow-outline"
                      type="text"
                      name="instructor"
                      value={courseData.instructor}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label className="block text-gray-700 mb-2">
                    <p className="text-sm font-bold">Harga</p>
                    <input
                      className="appearance-none border w-full rounded-lg py-2 px-3 text-gray-700 leading-tight  focus:outline-costumeBlue border-gray-500"
                      type="number"
                      min={0}
                      name="price"
                      value={courseData.price}
                      onChange={handleInputChange}
                      onWheel={(e) => e.target.blur()}
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-1/3">
                  <label className="block text-gray-700 mb-2">
                    <p className="text-sm font-bold">Level</p>
                    <select
                      className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-costumeBlue border-gray-500"
                      value={courseData.level}
                      name="level"
                      onChange={handleInputChange}
                    >
                      <option value="">Pilih level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advance">Advance</option>
                    </select>
                  </label>
                  <label className="block text-gray-700 mb-2 col-span-2 md:col-auto">
                    <p className="text-sm font-bold">Kategori</p>
                    <select
                      className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-costumeBlue border-gray-500"
                      value={courseData.categoryId}
                      name="categoryId"
                      onChange={handleInputChange}
                    >
                      <option value="">Pilih kategori</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-gray-700 mb-2">
                    <p className="text-sm font-bold">Link Telegram</p>
                    <input
                      className="appearance-none border w-full rounded-lg py-2 px-3 text-gray-700 leading-tight  focus:outline-costumeBlue border-gray-500"
                      type="text"
                      name="telegramLink"
                      onChange={handleInputChange}
                      value={courseData.telegramLink}
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full mt-2">
                <label className="text-gray-700" htmlFor="name">
                  <p className="font-bold text-sm">Tentang Kelas</p>
                  <textarea
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border  rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-costumeBlue focus:border-transparent border-gray-500 resize-none"
                    onChange={handleInputChange}
                    value={courseData.about}
                    name="about"
                    rows="5"
                    cols="40"
                  ></textarea>
                </label>
                <div className="flex flex-col md:flex-row gap-2 w-full">
                  <label className="text-gray-700 w-full" htmlFor="name">
                    <p className="font-bold text-sm">Tujuan</p>
                    <textarea
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-costumeBlue focus:border-transparent resize-none"
                      value={courseData.objective}
                      onChange={handleInputChange}
                      name="objective"
                      rows="5"
                      cols="40"
                    ></textarea>
                  </label>

                  <label className="text-gray-700 w-full" htmlFor="name">
                    <p className="font-bold text-sm">Onboarding</p>
                    <textarea
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-costumeBlue focus:border-transparent resize-none"
                      id="comment"
                      value={courseData.onboarding}
                      onChange={handleInputChange}
                      name="onboarding"
                      rows="5"
                      cols="40"
                    ></textarea>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-10">
              <button
                type="button"
                name="image"
                className="bg-costumeBlue w-fit flex items-center justify-center gap-1 rounded-lg py-3 p-5 disabled:opacity-50"
                onClick={handleSaveData}
                disabled={!isEdited}
              >
                <FloppyDisk size={24} color="#FFFFFF" weight="bold" />
                <p className="font-bold text-md text-white">Simpan</p>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen w-full py-10">
            <div className="custom-loader"></div>
          </div>
        )}
      </div>
    </>
  );
}
