import { Funnel } from "@phosphor-icons/react/dist/ssr";
import { MagnifyingGlass, PlusCircle } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TableCourse() {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/course`
      );
      setCourse(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };
  return (
    <>
      <div className="px-4 pt-3 pb-4 rounded-sm flex-1 whitespace-nowrap">
        <div className="flex md:flex-row flex-col justify-between gap-2">
          <div className="text-sm sm:text-xl">
            <strong>Status Pembayaran</strong>
          </div>
          <div className=" flex flex-cols gap-2">
            <button
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
            <button
              type="button"
              className="border border-costumeBlue border-solid rounded-xl flex items-center px-2 p-0.5"
            >
              <Funnel
                size={24}
                weight="bold"
                className="mr-2 text-costumeBlue"
              />
              <span className="font-bold text-costumeBlue">Filter</span>
            </button>
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
                      <button className="rounded-lg px-2 py-1 bg-costumeBlue text-white font-semibold">
                        kelola
                      </button>
                      <button className="rounded-lg px-2 py-1 bg-red-600 text-white font-semibold">
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
    </>
  );
}
