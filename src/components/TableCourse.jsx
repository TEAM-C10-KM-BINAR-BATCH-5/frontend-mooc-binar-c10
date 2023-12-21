import {
  ArrowsClockwise,
  MagnifyingGlass,
  PlusCircle,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { getCategory, getCourses } from "../libs/api";
import { Link } from "react-router-dom";
import FilterButton from "./FilterButton";
import Swal from "sweetalert2";
import axios from "axios";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import { triggerDataUpdateState } from "../atom/formAtom";
import { courseFilterState } from "../atom/courseAtom";
import {
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import FilterMenu from "./FilterMenu";
import { filterVisibleState } from "../atom/filterAtom";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal/Modal";
import AddCourse from "./ModalContent/AddCourse";
import Pagination from "./Pagination";
import { priceFormatter } from "../../utils/PriceFormater";
import { swalFireConfirm, swalFireResult } from "../libs/swalFire";
import SearchButton from "./SearchButton";

export default function TableCourse() {
  const setShowModal = useSetRecoilState(modalState);
  const [course, setCourse] = useState([]);
  const [search, setSearch] = useState([]);

  const [category, setCategory] = useState([]);
  const [triggerDataUpdate, setTriggerDataUpdate] = useRecoilState(
    triggerDataUpdateState
  );
  const [courseFilter, setCourseFilter] = useRecoilState(courseFilterState);
  const resetCourseFilter = useResetRecoilState(courseFilterState);
  const [filterVisible] = useRecoilState(filterVisibleState);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value, checked } = e.target;
    if (name === "categoryIds") {
      // Handle checkboxes for categories
      if (checked) {
        // If checkbox is checked, add the category ID to the array
        setCourseFilter((prev) => ({
          ...prev,
          [name]: [...prev[name], value],
        }));
      } else {
        // If checkbox is unchecked, remove the category ID from the array
        setCourseFilter((prev) => ({
          ...prev,
          [name]: prev[name].filter((id) => id !== value),
        }));
      }
    } else {
      // Handle other input changes
      setCourseFilter((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await getCourses(courseFilter);
      setCourse(coursesData);
      setSearch(coursesData);
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

  const handleDelete = async (id, title) => {
    try {
      const result = await swalFireConfirm(
        `Apakah anda yakin?`,
        `Anda akan menghapus ${title}`,
        "warning"
      );
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/course/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTriggerDataUpdate(!triggerDataUpdate);
        swalFireResult(
          "Berhasil!",
          "Data anda telah berhasil dihapus",
          "success"
        );
      }
    } catch (error) {
      console.error("Gagal menghapus item:", error);
      swalFireResult("Gagal", "Data anda gagal dihapus", "error");
    }
  };

  //search
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    Search(searchTerm);
  };

  const Search = (searchTerm) => {
    const filteredResults = course.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
    );
    setSearch(filteredResults);
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = search.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="px-4 pt-3 pb-4 rounded-sm flex-1 whitespace-nowrap">
        <div className="flex  flex-row justify-between gap-2">
          <div className="text-base sm:text-xl">
            <strong>Kelola Course</strong>
          </div>
          <div className="flex flex-row justify-end gap-2">
            <button
              onClick={() =>
                setShowModal({ visible: true, content: "addCourse" })
              }
              type="button"
              className="bg-costumeBlue border border-costumeBlue border-solid rounded-xl flex  items-center gap-2 px-3 p-1"
            >
              <PlusCircle size={24} color="#ffffff" weight="bold" />
              <span className="font-bold text-white hidden md:block">
                Tambah
              </span>
            </button>

            <Menu open={filterVisible}>
              <MenuHandler>
                <div>
                  <FilterButton />
                </div>
              </MenuHandler>
              <MenuList className="border border-gray-400 p-1">
                <div className="flex flex-row-reverse justify-start items-center gap-3 m-3">
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
                    <MenuItem className="flex flex-row items-center gap-2 cursor-default">
                      {" "}
                      <input
                        type="radio"
                        name="courseType"
                        value="Free"
                        checked={
                          courseFilter.courseType == "Free" ? true : false
                        }
                        className="cursor-pointer"
                        onChange={handleInputChange}
                      />
                      <span>Free</span>
                    </MenuItem>
                    <MenuItem className="flex flex-row items-center gap-2 cursor-default">
                      {" "}
                      <input
                        type="radio"
                        name="courseType"
                        value="Premium"
                        checked={
                          courseFilter.courseType == "Premium" ? true : false
                        }
                        onChange={handleInputChange}
                        className="cursor-pointer"
                      />
                      <span>Premium</span>
                    </MenuItem>
                  </FilterMenu>

                  <FilterMenu title={"level"}>
                    <MenuItem className="flex flex-row items-center gap-2 cursor-default">
                      <input
                        type="radio"
                        name="level"
                        value="Beginner"
                        checked={
                          courseFilter.level == "Beginner" ? true : false
                        }
                        onChange={handleInputChange}
                        className="cursor-pointer"
                      />
                      <span>Beginner</span>
                    </MenuItem>
                    <MenuItem className="flex flex-row items-center gap-2 cursor-default">
                      <input
                        type="radio"
                        name="level"
                        value="Intermediate"
                        checked={
                          courseFilter.level == "Intermediate" ? true : false
                        }
                        onChange={handleInputChange}
                        className="cursor-pointer"
                      />
                      <span>Intermediate</span>
                    </MenuItem>
                    <MenuItem className="flex flex-row items-center gap-2 cursor-default">
                      <input
                        type="radio"
                        name="level"
                        value="Advance"
                        checked={courseFilter.level == "Advance" ? true : false}
                        onChange={handleInputChange}
                        className="cursor-pointer"
                      />
                      <span>Advance</span>
                    </MenuItem>
                  </FilterMenu>

                  <FilterMenu title={"kategori"}>
                    {" "}
                    {category.map((category) => (
                      <MenuItem
                        className="flex flex-row items-center gap-2 cursor-default"
                        key={category.id}
                      >
                        <input
                          type="checkbox"
                          name="categoryIds"
                          value={category.id}
                          onClick={handleInputChange}
                          checked={courseFilter.categoryIds.includes(
                            category.id
                          )}
                          className="cursor-pointer"
                        />
                        <span>{category.name}</span>
                      </MenuItem>
                    ))}
                  </FilterMenu>
                </div>
              </MenuList>
            </Menu>
            <SearchButton>
              <Input
                value={searchTerm}
                onChange={handleSearchChange}
                label="Search"
                color="indigo"
                containerProps={{
                  className: "mb-1",
                }}
              />
            </SearchButton>
          </div>
        </div>
        {/* <AnimatePresence>
					{filterVisible && (
						<motion.div
							initial={{ y: -10 }}
							animate={{ y: 0 }}
							exit={{ opacity: 0 }}
						>
							<div className="flex flex-row-reverse justify-start items-center gap-3 m-3 ">
								<Button
									onClick={(e) => {
										e.preventDefault()
										resetCourseFilter()
									}}
									className="bg-transparent border-2 border-costumeBlue text-costumeBlue opacity-50 rounded-lg p-2"
								>
									<ArrowsClockwise size={15} weight="bold" />
								</Button>
								<FilterMenu title={"kelas"}>
									<MenuItem className="flex flex-row items-center gap-2 cursor-default">
										{" "}
										<input
											type="radio"
											name="courseType"
											value="Free"
											checked={courseFilter.courseType == "Free" ? true : false}
											className="cursor-pointer"
											onChange={handleInputChange}
										/>
										<span>Free</span>
									</MenuItem>
									<MenuItem className="flex flex-row items-center gap-2 cursor-default">
										{" "}
										<input
											type="radio"
											name="courseType"
											value="Premium"
											checked={
												courseFilter.courseType == "Premium" ? true : false
											}
											onChange={handleInputChange}
											className="cursor-pointer"
										/>
										<span>Premium</span>
									</MenuItem>
								</FilterMenu>

								<FilterMenu title={"level"}>
									<MenuItem className="flex flex-row items-center gap-2 cursor-default">
										<input
											type="radio"
											name="level"
											value="Beginner"
											checked={courseFilter.level == "Beginner" ? true : false}
											onChange={handleInputChange}
											className="cursor-pointer"
										/>
										<span>Beginner</span>
									</MenuItem>
									<MenuItem className="flex flex-row items-center gap-2 cursor-default">
										<input
											type="radio"
											name="level"
											value="Intermediate"
											checked={
												courseFilter.level == "Intermediate" ? true : false
											}
											onChange={handleInputChange}
											className="cursor-pointer"
										/>
										<span>Intermediate</span>
									</MenuItem>
									<MenuItem className="flex flex-row items-center gap-2 cursor-default">
										<input
											type="radio"
											name="level"
											value="Advance"
											checked={courseFilter.level == "Advance" ? true : false}
											onChange={handleInputChange}
											className="cursor-pointer"
										/>
										<span>Advance</span>
									</MenuItem>
								</FilterMenu>

								<FilterMenu title={"kategori"}>
									{" "}
									{category.map((category) => (
										<MenuItem
											className="flex flex-row items-center gap-2 cursor-default"
											key={category.id}
										>
											<input
												type="checkbox"
												name="categoryIds"
												value={category.id}
												onClick={handleInputChange}
												checked={courseFilter.categoryIds.includes(category.id)}
												className="cursor-pointer"
											/>
											<span>{category.name}</span>
										</MenuItem>
									))}
								</FilterMenu>
							</div>
						</motion.div>
					)}
				</AnimatePresence> */}

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
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td className="p-3 text-sm text-gray-700 ">
                    {item.Category.name}
                  </td>
                  <td className="p-3 text-sm text-gray-700 ">{item.title}</td>
                  <td className="p-3 text-sm text-gray-700 ">
                    {item.courseType}
                  </td>
                  <td className="p-3 text-sm text-gray-700 ">{item.level}</td>
                  <td className="p-3 text-sm text-gray-700 ">
                    {priceFormatter.format(item.price)}
                  </td>
                  <td>
                    <div className="flex gap-2 items-center justify-center">
                      <Link
                        to={`/kelola-course/${item.id}`}
                        className="bg-costumeBlue text-white px-2 py-1 rounded-lg text-center font-semibold"
                      >
                        Kelola
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
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

        <div className="flex justify-center mt-4">
          {search.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={search.length}
              paginate={paginate}
            />
          )}
        </div>
      </div>
      <Modal>
        <AddCourse />
      </Modal>
    </>
  );
}
