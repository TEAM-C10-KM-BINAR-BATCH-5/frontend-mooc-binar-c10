import axios from "axios";

export const getCourses = async (filters = {}) => {
  try {
    const queryString = Object.keys(filters)
      .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
      .join("&");
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/course${
      queryString ? `?${queryString}` : ""
    }`;
    const response = await axios.get(apiUrl);
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
    console.error("Error fetching course data:", error);
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
    console.log("Error fetching category:", error);
    throw error;
  }
};
