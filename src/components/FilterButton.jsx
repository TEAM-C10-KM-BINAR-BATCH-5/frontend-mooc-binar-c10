// FIlter Button ini masih percobaan, belum fixed

import { Funnel } from "@phosphor-icons/react";

const FilterButton = () => {
  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="border border-costumeBlue border-solid rounded-xl flex justify-center items-center px-2 p-1 text-costumeBlue gap-2"
      >
        <Funnel size={24} weight="bold" />
        <span className="font-bold hidden md:block">Filter</span>
      </button>
    </div>
  );
};

export default FilterButton;
