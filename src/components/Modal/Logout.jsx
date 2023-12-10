import warningImg from "../../assets/warning.png";
import { useNavigate } from "react-router-dom";

export default function Logout({ isVisible, onClose }) {
  const navigate = useNavigate();
  if (!isVisible) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white w-[350px] lg:w-[500px] p-2 rounded-lg flex flex-col gap-5 relative">
        <p className="py-5 text-xl font-bold text-costumeBlue text-center">
          Yakin ingin Logout?
        </p>
        <div className="flex items-center justify-center">
          <img src={warningImg} width={150} alt="" />
        </div>
        <div className="flex flex-cols gap-2 justify-around">
          <button
            type="button"
            onClick={() => onClose()}
            className="bg-costumeBlue p-3 w-full rounded-lg"
          >
            <h1 className="text-xl font-bold  text-white ">Tidak</h1>
          </button>
          <button
            type="button"
            className="bg-gray-300 p-3 w-full rounded-lg"
            onClick={handleLogout}
          >
            <h1 className="text-xl font-bold text-costumeBlue">Ya</h1>
          </button>
        </div>
      </div>
    </div>
  );
}
