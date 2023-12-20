// FIlter Button ini masih percobaan, belum fixed

import { Funnel } from "@phosphor-icons/react"
import { useRecoilState } from "recoil"
import { filterVisibleState } from "../atom/filterAtom"

const FilterButton = () => {
	const [filterVisible, setFilterVisible] = useRecoilState(filterVisibleState)
	return (
		<div className="relative inline-block">
			<button
				type="button"
				className={
					filterVisible
						? "border border-costumeBlue  bg- bg-costumeBlue border-solid rounded-xl flex justify-center items-center px-2 p-1 text-white gap-2"
						: "border border-costumeBlue border-solid rounded-xl flex justify-center items-center px-2 p-1 text-costumeBlue gap-2"
				}
				onClick={() => setFilterVisible(!filterVisible)}
			>
				<Funnel size={24} weight="bold" />
				<span className="font-bold hidden md:block">Filter</span>
			</button>
		</div>
	)
}

export default FilterButton
