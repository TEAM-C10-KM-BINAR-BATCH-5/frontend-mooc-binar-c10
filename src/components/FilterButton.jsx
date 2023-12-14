// FIlter Button ini masih percobaan, belum fixed

import { useState } from "react";
import { Funnel } from "@phosphor-icons/react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { courseFilterState } from "../atom/courseAtom";

const FilterButton = () => {
  const [showPopover, setShowPopover] = useState(false);

  const [courseFilter, setCourseFilter] = useRecoilState(courseFilterState);
  const resetCourseFilter = useResetRecoilState(courseFilterState);

  // toggle popover
  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCourseFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="border border-costumeBlue border-solid rounded-xl flex items-center px-2 p-0.5"
        onClick={togglePopover}
      >
        <Funnel size={24} weight="bold" className="mr-2 text-costumeBlue" />
        <span className="font-bold text-costumeBlue">Filter</span>
      </button>
      {showPopover && (
        <div className="absolute right-0 mt-2 w-full md:w-80 bg-white border border-gray-300 rounded-lg shadow-md z-10">
          {/* Opsi Tipe Kelas */}
          <div className="p-3">
            <p>Tipe Kelas</p>
            <form>
              <div className="flex gap-2">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="courseType"
                    value="Free"
                    checked={courseFilter.courseType == "Free" ? true : false}
                    onChange={handleInputChange}
                  />
                  <span>Free</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="courseType"
                    value="Premium"
                    checked={
                      courseFilter.courseType == "Premium" ? true : false
                    }
                    onChange={handleInputChange}
                  />
                  <span>Premium</span>
                </label>
              </div>
            </form>
          </div>

          {/* Opsi Level */}
          <div className="p-3">
            <p>Level</p>
            <form>
              <div className="flex gap-2">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="level"
                    value="Beginner"
                    checked={courseFilter.level == "Beginner" ? true : false}
                    onChange={handleInputChange}
                  />
                  <span>Beginner</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="level"
                    value="Intermediate"
                    checked={
                      courseFilter.level == "Intermediate" ? true : false
                    }
                    onChange={handleInputChange}
                  />
                  <span>Intermediate</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="level"
                    value="Advance"
                    checked={courseFilter.level == "Advance" ? true : false}
                    onChange={handleInputChange}
                  />
                  <span>Advance</span>
                </label>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  resetCourseFilter();
                }}
                className="mt-3 p-2 border-costumeBlue border-2 rounded-lg text-costumeBlue opacity-75 text-xs hover:opacity-50"
              >
                Reset Filter
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
