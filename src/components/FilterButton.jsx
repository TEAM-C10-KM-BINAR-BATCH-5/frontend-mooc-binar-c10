// FIlter Button ini masih percobaan, belum fixed

import { Funnel } from "@phosphor-icons/react";
import { useRecoilState } from "recoil";
import { filterVisibleState } from "../atom/filterAtom";

const FilterButton = () => {
  const [filterVisible, setFilterVisible] = useRecoilState(filterVisibleState);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        className={
          filterVisible
            ? "border border-costumeBlue  bg- bg-costumeBlue border-solid rounded-xl flex items-center px-2 p-1 text-white"
            : "border border-costumeBlue border-solid rounded-xl flex items-center px-2 p-1 text-costumeBlue"
        }
        onClick={() => setFilterVisible(!filterVisible)}
      >
        <Funnel size={24} weight="bold" className="mr-2" />
        <span className="font-bold">Filter</span>
      </button>
    </div>
  );
};

export default FilterButton;
