import { Funnel } from "@phosphor-icons/react/dist/ssr";
import { MagnifyingGlass, PlusCircle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { getCourses } from "../libs/Api-libs";
import AddCourseModal from "./Modal/AddCourse";
import { Link } from "react-router-dom";
import FilterButton from "./FilterButton";
import Swal from "sweetalert2";
import axios from "axios";

export default function TableCourse() {
  const [showModal, setShowModal] = useState(false);
  const [course, setCourse] = useState([]);
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const coursesData = await getCourses();
    setCourse(coursesData);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token"); // Ambil token dari localStorage

        axios
          .delete(`${import.meta.env.VITE_API_BASE_URL}/course/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
            },
          })
          .then((response) => {
            console.log("Item berhasil dihapus:", response.data);
            const updatedCourses = course.filter((course) => course.id !== id);
            setCourse(updatedCourses);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            // Tambahkan logika atau perbarui state setelah penghapusan berhasil
          })
          .catch((error) => {
            console.error("Gagal menghapus item:", error);
            Swal.fire({
              title: "Failed!",
              text: "Failed to delete your file.",
              icon: "error",
            });
            // Tambahkan penanganan kesalahan jika penghapusan gagal
          });
      }
    });
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
            {/* <button
              type="button"
              className="border border-costumeBlue border-solid rounded-xl flex items-center px-2 p-0.5"
            >
              <Funnel
                size={24}
                weight="bold"
                className="mr-2 text-costumeBlue"
              />
              <span className="font-bold text-costumeBlue">Filter</span>
            </button> */}
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
