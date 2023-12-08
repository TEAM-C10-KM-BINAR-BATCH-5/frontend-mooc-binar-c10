import React, { useEffect, useState } from "react";
import EditCourse from "../components/EditCourse";
import EditModul from "../components/editModul";

export default function KelolaCourse() {
  return (
    <>
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
        <div className="mb-3">
          <EditCourse />
        </div>
        <div className="mb-3">
          <EditModul />
        </div>
      </div>
    </>
  );
}
