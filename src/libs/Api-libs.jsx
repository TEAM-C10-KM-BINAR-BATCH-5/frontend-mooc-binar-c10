// api-libs.jsx
import axios from "axios";

export const getCourses = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/course`
    );
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

// export const DeleteCourse = async (id) => {
//   try {
//     const response = await axios.delete(
//       `${import.meta.env.VITE_API_BASE_URL}/course/${id}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error Deleting course:", error.message);
//     throw error; // Kembalikan error agar bisa ditangani di komponen yang menggunakan fungsi ini
//   }
// };

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
