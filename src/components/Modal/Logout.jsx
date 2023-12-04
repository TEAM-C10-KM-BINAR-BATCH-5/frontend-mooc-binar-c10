import React from "react";
import warningImg from "../../assets/warning.png";

export default function Logout({ isVisible, onClose }) {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white w-[500px] p-2 rounded-lg flex flex-col relative">
        <p className="py-5 text-xl font-bold text-costumeBlue text-center">
          Yakin ingin Logout?
        </p>
        <div className="flex items-center justify-center">
          <img src={warningImg} width={250} alt="" srcset="" />
        </div>
        <div className="flex flex-cols gap-2 justify-around">
          <button
            type="button"
            onClick={() => onClose()}
            className="bg-emerald-500 p-5 w-full rounded-xl"
          >
            <h1 className="text-xl font-bold text-white ">Gak jadi</h1>
          </button>
          <button type="button" className="bg-red-500 p-5 w-full rounded-xl">
            <h1 className="text-xl font-bold text-white">keluar</h1>
          </button>
        </div>
      </div>
    </div>
  );
}
