// api library
const token = localStorage.getItem("token");

import axios from "axios";

export const getCourses = async (filters = {}) => {
  try {
    // Convert the filters object to a query string
    const queryString = Object.keys(filters)
      .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
      .join("&");

    // Append the query string to the API URL
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/course${
      queryString ? `?${queryString}` : ""
    }`;

    // Make the GET request
    const response = await axios.get(apiUrl);

    // Return the data
    return response.data.data;
  } catch (error) {
    console.error("Error fetching course data:", error.message);
    return [];
  }
};

export const getCoursesById = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/course/${id}`
    );
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const getCategory = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/category`
    );
    return response.data.data.categories;
  } catch (error) {
    return [];
  }
};

export const createModule = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/module`,
      {
        title: data.title,
        isLocked: data.isLocked,
        courseId: data.courseId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createVideo = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/video`,
      {
        no: data.no,
        title: data.title,
        videoUrl: data.videoUrl,
        duration: data.duration,
        moduleId: data.moduleId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

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
    );
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};
