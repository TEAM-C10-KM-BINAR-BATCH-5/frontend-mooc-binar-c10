const token = localStorage.getItem("token");

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
    return [];
  }
};

export const getCategory = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/category`
    );
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const getModulesByCourseId = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/module/course/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
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

export const editModule = async (data, id) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/module/${id}`,
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

export const deleteModule = async (id) => {
  try {
    console.log(id);
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/module/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return error;
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

export const editVideo = async (data, id) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/video//${id}`,
      data,
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

export const deleteVideo = async (id) => {
  try {
    console.log(id);
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/video/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
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

export const editCourse = async (id, data) => {
  try {
    console.log(data);

    const response = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/course/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getDataTransaction = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/transaction`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getDashboard = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
