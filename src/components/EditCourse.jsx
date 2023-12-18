import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoursesById } from "../libs/api";
import { UploadSimple } from "@phosphor-icons/react/dist/ssr";
import { FloppyDisk } from "@phosphor-icons/react";

export default function EditCourse() {
  const [courseData, setCourseData] = useState(null);
  const { id } = useParams();

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
        <div className="bg-white shadow rounded-lg">
          <p className="text-xl lg:text-2xl font-bold text-center text-costumeBlue">
            Detail Course
          </p>
          {courseData ? (
            <div className="p-5 shadow-xl rounded-lg">
              <form action="">
                <div className="grid grid-cols-1 md:grid-cols-2 mb-2 gap-6">
                  <label className="block text-gray-700 mb-2">
                    <p className="text-sm font-bold">Title</p>
                    <input
                      className="appearance-none border w-full rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={courseData.title}
                    />
                  </label>
                  <label className="block text-gray-700 mb-2">
                    <p className="text-sm font-bold">Instructor</p>
                    <input
                      className="appearance-none border w-full rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={courseData.instructor}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 mb-4 gap-6">
                  <label className="block text-gray-700 mb-2">
                    <p className="text-sm font-bold">Price</p>
                    <input
                      className="appearance-none border w-full rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={courseData.price}
                    />
                  </label>
                  <label className="block text-gray-700 mb-2">
                    <p className="text-sm font-bold">Level</p>
                    <input
                      className="appearance-none border w-full rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={courseData.level}
                    />
                  </label>
                  <label className="block text-gray-700 mb-2 col-span-2 md:col-auto">
                    <p className="text-sm font-bold">Category</p>
                    <input
                      className="appearance-none border w-full rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      type="text"
                      value={courseData.Category.name}
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mb-4 gap-6">
                  <label className="text-gray-700" htmlFor="name">
                    <p className="font-bold text-sm">About</p>
                    <textarea
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      id="comment"
                      value={courseData.about}
                      name="comment"
                      rows="5"
                      cols="40"
                    ></textarea>
                  </label>
                  <label className="text-gray-700" htmlFor="name">
                    <p className="font-bold text-sm">Objective</p>
                    <textarea
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      id="comment"
                      value={courseData.objective}
                      name="comment"
                      rows="5"
                      cols="40"
                    ></textarea>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mb-4 gap-6">
                  <label className="text-gray-700" htmlFor="name">
                    <p className="font-bold text-sm">Onboarding</p>
                    <textarea
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      id="comment"
                      value={courseData.onboarding}
                      name="comment"
                      rows="5"
                      cols="40"
                    ></textarea>
                  </label>
                  <div>
                    <p>Image Course</p>
                    <div className="relative border border-costumeBlue">
                      <img
                        src={image || courseData.imageUrl} // Menampilkan foto yang diunggah atau foto sebelumnya
                        alt="Image not Found"
                      />
                      <label className="absolute bottom-3 right-3 bg-costumeBlue px-4 py-1 rounded-lg flex gap-1">
                        <UploadSimple size={20} color="#FFFFFF" weight="bold" />
                        <p className="font-bold text-md text-white">
                          Upload
                          <input
                            type="file"
                            name="image"
                            id="image"
                            style={{ display: "none" }}
                            onChange={handleImageUpload} // Menangani perubahan pada input file
                          />
                        </p>
                      </label>
                    </div>
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
