import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoursesById } from "../libs/Api-libs";

export default function KelolaCourse() {
  const [courseData, setCourseData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await getCoursesById(id);
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [id]);

  return (
    <div>
      {courseData ? (
        <div>
          <h1>{courseData.title}</h1>
          <p>About: {courseData.about}</p>
          <p>objective: {courseData.objective}</p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen w-full py-10">
          <div className="custom-loader"></div>
        </div>
      )}
    </div>
  );
}
