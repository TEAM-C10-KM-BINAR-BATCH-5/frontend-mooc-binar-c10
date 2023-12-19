import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategory, getCoursesById } from "../libs/api";
import { UploadSimple } from "@phosphor-icons/react/dist/ssr";
import { FloppyDisk, PencilSimpleLine } from "@phosphor-icons/react";

export default function EditCourse() {
  const [courseData, setCourseData] = useState(null);
  const [categories, setCategories] = useState();
  const { id } = useParams();

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
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [id]);

  const [image, setImage] = useState(""); // State untuk menyimpan foto yang diunggah

  const handleImageUpload = (event) => {
    const uploadedImage = URL.createObjectURL(event.target.files[0]); // Mendapatkan URL foto yang diunggah
    setImage(uploadedImage); // Mengatur foto yang diunggah ke dalam state
  };

  return (
    <>
      <div className="items-center justify-center">
        <h1 className="text-xl lg:text-2xl font-bold text-center text-costumeBlue mb-3">
          Detail Kelas
        </h1>
        <div className="bg-white shadow-lg rounded-lg">
          {courseData ? (
            <div className="p-5 shadow-xl rounded-lg">
              <form action="">
                <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
                  <label className="group cursor-pointer transition-all ease-linear w-full md:w-5/12 hover:brightness-75">
                    <img
                      src={image || courseData.imageUrl}
                      alt="Image not Found"
                      className="w-full"
                    />

                    <div className="hidden absolute inset-0  items-center justify-center group-hover:flex transition-all ease-linear z-50 brightness-200">
                      <PencilSimpleLine size={60} color="#FFFFFF" />
                    </div>

                    <input
                      type="file"
                      name="image"
                      id="image"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </label>

                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex flex-col">
                      <label className="block text-gray-700 mb-2">
                        <p className="text-sm font-bold">Judul Kelas</p>
                        <input
                          className="appearance-none border border-black rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-costumeBlue focus:shadow-outline w-full"
                          type="text"
                          value={courseData.title}
                        />
                      </label>

                      <label className="block text-gray-700 mb-2">
                        <p className="text-sm font-bold">Instruktur</p>
                        <input
                          className="appearance-none border w-full border-black rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-costumeBlue focus:shadow-outline"
                          type="text"
                          value={courseData.instructor}
                        />
                      </label>

                      <label className="block text-gray-700 mb-2">
                        <p className="text-sm font-bold">Harga</p>
                        <input
                          className="appearance-none border w-full rounded-lg py-2 px-3 text-gray-700 leading-tight  focus:outline-costumeBlue border-black"
                          type="text"
                          value={courseData.price}
                        />
                      </label>
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-gray-700 mb-2">
                        <p className="text-sm font-bold">Level</p>
                        <select
                          className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-costumeBlue border-black"
                          value={courseData.level}
                          name="level"
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
                          className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-costumeBlue border-black"
                          value={courseData.categoryId}
                          name="categoryId"
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
                          className="appearance-none border w-full rounded-lg py-2 px-3 text-gray-700 leading-tight  focus:outline-costumeBlue border-black"
                          type="text"
                          value={courseData.telegramLink}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <label className="text-gray-700" htmlFor="name">
                    <p className="font-bold text-sm">Tentang Kelas</p>
                    <textarea
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border  rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-costumeBlue focus:border-transparent border-black resize-none"
                      id="comment"
                      value={courseData.about}
                      name="comment"
                      rows="5"
                      cols="40"
                    ></textarea>
                  </label>
                  <div className="flex flex-col md:flex-row gap-2 w-full">
                    <label className="text-gray-700 w-full" htmlFor="name">
                      <p className="font-bold text-sm">Tujuan</p>
                      <textarea
                        className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-black rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-costumeBlue focus:border-transparent resize-none"
                        id="comment"
                        value={courseData.objective}
                        name="comment"
                        rows="5"
                        cols="40"
                      ></textarea>
                    </label>

                    <label className="text-gray-700 w-full" htmlFor="name">
                      <p className="font-bold text-sm">Onboarding</p>
                      <textarea
                        className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-black rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-costumeBlue focus:border-transparent resize-none"
                        id="comment"
                        value={courseData.onboarding}
                        name="comment"
                        rows="5"
                        cols="40"
                      ></textarea>
                    </label>
                  </div>
                </div>
              </form>
              <div className="flex justify-end mt-10">
                <button
                  type="button"
                  name="image"
                  className="bg-costumeBlue w-fit flex items-center justify-center gap-1 rounded-lg py-3 p-5"
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
      </div>
    </>
  );
}
