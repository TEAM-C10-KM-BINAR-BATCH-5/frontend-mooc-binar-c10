// FIlter Button ini masih percobaan, belum fixed

import React, { useState } from "react";
import { Funnel } from "@phosphor-icons/react";

const FilterButton = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [selectedClassType, setSelectedClassType] = useState("");
  const [selectedClassLevel, setSelectedClassLevel] = useState("");

  const togglePopover = () => {
    setShowPopover(!showPopover);
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
                    name="classType"
                    value="Free"
                    checked={selectedClassType === "Free"}
                    onChange={(e) => setSelectedClassType(e.target.value)}
                  />
                  <span>Free</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="classType"
                    value="Premium"
                    checked={selectedClassType === "Premium"}
                    onChange={(e) => setSelectedClassType(e.target.value)}
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
                    name="classLevel"
                    value="Beginner"
                    checked={selectedClassLevel === "Beginner"}
                    onChange={(e) => setSelectedClassLevel(e.target.value)}
                  />
                  <span>Beginner</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="classLevel"
                    value="Intermediate"
                    checked={selectedClassLevel === "Intermediate"}
                    onChange={(e) => setSelectedClassLevel(e.target.value)}
                  />
                  <span>Intermediate</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="classLevel"
                    value="Advanced"
                    checked={selectedClassLevel === "Advanced"}
                    onChange={(e) => setSelectedClassLevel(e.target.value)}
                  />
                  <span>Advanced</span>
                </label>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
