import icons from "../assets/icon.png";
import { useState, useEffect } from "react";
import { getDashboard } from "../libs/api";

export default function DataCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDashoard = async () => {
      const dataDashobard = await getDashboard();
      setData(dataDashobard);
    };
    fetchDashoard();
  }, []);

  return (
    <div className="grid md:grid-cols-3 grid-cols-2 py-4 md:py-8 gap-2 mx-2 transition-all">
      <div className=" bg-blue-500 rounded-2xl p-5 flex-auto border border-gray-200 flex items-centers">
        <div className="rounded-full w-12 flex items-center justify-center">
          <img className="text-sm md:text-xl text-white" src={icons} alt="" />
        </div>
        <div className="pl-4">
          <span className="text-base text-white ">{data.activeUsers}</span>
          <div className="flex items-center">
            <strong className="text-xs md:text-xl text-white">
              Active Users
            </strong>
          </div>
        </div>
      </div>
      <div className=" bg-green-500 rounded-2xl p-5 flex-auto border border-gray-200 flex items-center">
        <div className="rounded-full w-12 flex items-center justify-center">
          <img className="text-2xl text-white" src={icons} alt="" />
        </div>
        <div className="pl-4">
          <span className="text-base text-white ">{data.activeClasses}</span>
          <div className="flex items-center">
            <strong className="text-xs md:text-xl text-white">
              Active Class
            </strong>
          </div>
        </div>
      </div>
      <div className=" bg-indigo-600 rounded-2xl p-5 flex-auto border border-gray-200 flex items-center col-span-2 md:col-auto">
        <div className="rounded-full w-12 flex items-center justify-center">
          <img className="text-2xl text-white" src={icons} alt="" />
        </div>
        <div className="pl-4">
          <span className="text-base text-white ">{data.premiumClasses}</span>
          <div className="flex items-center">
            <strong className="text-xs md:text-xl text-white">
              Premium Class
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
