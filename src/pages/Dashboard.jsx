import icons from "../assets/icon.png";

export default function Dashboard() {
  return (
    <div className="flex gap-1 m-10">
      <div className=" bg-blue-500 rounded-2xl p-5 flex-auto border border-gray-200 flex items-center mx-3">
        <div className="rounded-full h-12 w-12 dlex items-center justify-center bg-sky-500">
          <img className="text-2xl text-white" src={icons} alt="" />
        </div>
        <div className="pl-4">
          <span className="text-base text-white ">450</span>
          <div className="flex items-center">
            <strong className="text-l text-white">Active Users</strong>
          </div>
        </div>
      </div>
      <div className=" bg-green-500 rounded-2xl p-5 flex-auto border border-gray-200 flex items-center mx-3">
        <div className="rounded-full h-12 w-12 dlex items-center justify-center bg-sky-500">
          <img className="text-2xl text-white" src={icons} alt="" />
        </div>
        <div className="pl-4">
          <span className="text-base text-white ">25</span>
          <div className="flex items-center">
            <strong className="text-l text-white">Active Class</strong>
          </div>
        </div>
      </div>
      <div className=" bg-indigo-600 rounded-2xl p-5 flex-auto border border-gray-200 flex items-center mx-3">
        <div className="rounded-full h-12 w-12 dlex items-center justify-center bg-sky-500">
          <img className="text-2xl text-white" src={icons} alt="" />
        </div>
        <div className="pl-4">
          <span className="text-base text-white ">20</span>
          <div className="flex items-center">
            <strong className="text-l text-white">Premium Class</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
