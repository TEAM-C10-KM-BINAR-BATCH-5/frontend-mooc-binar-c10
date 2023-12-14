import {
  ArrowsClockwise,
  MagnifyingGlass,
  PlusCircle,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { getCategory, getCourses } from "../libs/api";
import AddCourseModal from "./Modal/AddCourse";
import { Link } from "react-router-dom";
import FilterButton from "./FilterButton";
import Swal from "sweetalert2";
import axios from "axios";
import { useRecoilState, useResetRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import { triggerDataUpdateState } from "../atom/formAtom";
import { courseFilterState } from "../atom/courseAtom";
import { Button, MenuItem } from "@material-tailwind/react";
import FilterMenu from "./FilterMenu";
import { filterVisibleState } from "../atom/filterAtom";

export default function TableCourse() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [course, setCourse] = useState([]);
  const [category, setCategory] = useState([]);
  const [triggerDataUpdate, setTriggerDataUpdate] = useRecoilState(
    triggerDataUpdateState
  );
  const [courseFilter, setCourseFilter] = useRecoilState(courseFilterState);
  const resetCourseFilter = useResetRecoilState(courseFilterState);
  const [filterVisible] = useRecoilState(filterVisibleState);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCourseFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await getCourses(courseFilter);
      setCourse(coursesData);
    };
    fetchCourses();
  }, [triggerDataUpdate, courseFilter]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategory();
      setCategory(categoriesData);
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const token = localStorage.getItem("token"); // Ambil token dari localStorage

        const response = await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/course/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
            },
          }
        );
        console.log("Item berhasil dihapus:", response.data);
        setTriggerDataUpdate(!triggerDataUpdate);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Gagal menghapus item:", error);
      Swal.fire({
        title: "Failed!",
        text: "Failed to delete your file.",
        icon: "error",
      });
      // Tambahkan penanganan kesalahan jika penghapusan gagal
    }
  };

  return (
    <>
      <div className="px-4 pt-3 pb-4 rounded-sm flex-1 whitespace-nowrap">
        <div className="flex md:flex-row flex-col justify-between gap-2">
          <div className="text-sm sm:text-xl">
            <strong>Kelola Course</strong>
          </div>
          <div className="flex flex-cols gap-2">
            <button
              onClick={() => setShowModal(true)}
              type="button"
              className="bg-costumeBlue border border-costumeBlue border-solid rounded-xl flex items-center px-3 p-1"
            >
              <PlusCircle
                size={24}
                color="#ffffff"
                className="mr-2"
                weight="bold"
              />
              <span className="font-bold text-white">Tambah</span>
            </button>

            <FilterButton />
            <button>
              <MagnifyingGlass
                size={24}
                className="text-costumeBlue"
                weight="bold"
              />
            </button>
          </div>
        </div>
        {filterVisible && (
          <div className="flex flex-row-reverse justify-start items-center gap-3 m-3 ">
            <Button
              onClick={(e) => {
                e.preventDefault();
                resetCourseFilter();
              }}
              className="bg-transparent border-2 border-costumeBlue text-costumeBlue opacity-50 rounded-lg p-2"
            >
              <ArrowsClockwise size={15} weight="bold" />
            </Button>
            <FilterMenu title={"kelas"}>
              <MenuItem className="flex flex-row items-center gap-2">
                {" "}
                <input
                  type="radio"
                  name="courseType"
                  value="Free"
                  checked={courseFilter.courseType == "Free" ? true : false}
                  onChange={handleInputChange}
                />
                <span>Free</span>
              </MenuItem>
              <MenuItem className="flex flex-row items-center gap-2">
                {" "}
                <input
                  type="radio"
                  name="courseType"
                  value="Premium"
                  checked={courseFilter.courseType == "Premium" ? true : false}
                  onChange={handleInputChange}
                />
                <span>Premium</span>
              </MenuItem>
            </FilterMenu>

            <FilterMenu title={"level"}>
              <MenuItem className="flex flex-row items-center gap-2">
                <input
                  type="radio"
                  name="level"
                  value="Beginner"
                  checked={courseFilter.level == "Beginner" ? true : false}
                  onChange={handleInputChange}
                />
                <span>Beginner</span>
              </MenuItem>
              <MenuItem className="flex flex-row items-center gap-2">
                <input
                  type="radio"
                  name="level"
                  value="Intermediate"
                  checked={courseFilter.level == "Intermediate" ? true : false}
                  onChange={handleInputChange}
                />
                <span>Intermediate</span>
              </MenuItem>
              <MenuItem className="flex flex-row items-center gap-2">
                <input
                  type="radio"
                  name="level"
                  value="Advance"
                  checked={courseFilter.level == "Advance" ? true : false}
                  onChange={handleInputChange}
                />
                <span>Advance</span>
              </MenuItem>
            </FilterMenu>

            <FilterMenu title={"kategori"}>
              {" "}
              {category.map((category) => (
                <MenuItem
                  className="flex flex-row items-center gap-2"
                  key={category.id}
                >
                  <input type="checkbox" name="courseType" value="Free" />
                  <span>{category.name}</span>
                </MenuItem>
              ))}
            </FilterMenu>
          </div>
        )}

        <div className="mt-3 overflow-x-auto">
          <table className="w-full border border-separate">
            <thead className="bg-blue-100 border-b-2 border-gray-200 ">
              <tr>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Kategori
                </td>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Nama Kelas
                </td>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Tipe Kelas
                </td>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Level
                </td>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Harga Kelas
                </td>
                <td className="p-3 text-sm font-semibold tracking-wide text-center">
                  Aksi
                </td>
              </tr>
            </thead>
            <tbody>
              {course.map((item) => (
                <tr key={item.id}>
                  <td className="p-3 text-sm text-gray-700 ">
                    {item.Category.name}
                  </td>
                  <td className="p-3 text-sm text-gray-700 ">{item.title}</td>
                  <td className="p-3 text-sm text-gray-700 ">
                    {item.courseType}
                  </td>
                  <td className="p-3 text-sm text-gray-700 ">{item.level}</td>
                  <td className="p-3 text-sm text-gray-700 ">{item.price}</td>
                  <td>
                    <div className="flex gap-2 items-center justify-center">
                      <Link
                        to={`/kelola-course/${item.id}`}
                        className="bg-costumeBlue text-white px-2 py-1 rounded-lg text-center font-semibold"
                      >
                        Kelola
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg px-2 py-1 bg-red-600 text-white font-semibold"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddCourseModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
