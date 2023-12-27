import { atom } from "recoil"

export const paymentFilterState = atom({
	key: "paymentFilterState",
	default: {
		status: [],
	},
})
