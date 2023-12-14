// api library
const token = localStorage.getItem("token")

import axios from "axios"

export const getCourses = async () => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_API_BASE_URL}/course`
		)
		return response.data.data
	} catch (error) {
		return []
	}
}

export const getCoursesById = async (id) => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_API_BASE_URL}/course/${id}`
		)
		return response.data.data
	} catch (error) {
		return []
	}
}

export const getCategory = async () => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_API_BASE_URL}/category`
		)
		return response.data.data.categories
	} catch (error) {
		return []
	}
}

export const createModule = async (data) => {
	try {
		const response = axios.post(
			`${import.meta.env.VITE_API_BASE_URL}/module`,
			{
				title: data.title,
				courseId: data.courseId,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		return response.data.data
	} catch (error) {
		return error.response.data
	}
}

export const createVideo = async (data) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_BASE_URL}/video`,
			{
				no: data.videoNo,
				title: data.videoTitle,
				videoUrl: data.videoLink,
				duration: data.videoDuration,
				moduleId: data.moduleId,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		return response.data.data
	} catch (error) {
		return error.response.data
	}
}

export const createCourse = async (data) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_BASE_URL}/course`,
			{
				title: data.name,
				level: data.level,
				telegramLink: data.telegramLink,
				price: parseInt(data.price),
				rating: data.rating,
				about: data.about,
				objective: data.objective,
				categoryId: data.categoryId,
				onboarding: data.onboarding,
				instructor: data.instructor,
				image: data.image,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			}
		)
		return response.data.data
	} catch (error) {
		return error.response.data
	}
}
