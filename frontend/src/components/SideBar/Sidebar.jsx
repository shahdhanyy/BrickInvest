import { IoLogOut } from "react-icons/io5";
import DarkModeToggle from "../DarkModeButton/DarkModeToggle";
import {
  MdOutlineAccountCircle,
  MdOutlineDashboard,
  MdOutlineMoney,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();

  // Logout function to clear storage and redirect
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    window.location.href = "/login"; // Redirect to login page
  };

  const handleMenu = (route) => {
    setIsMenuOpen(false);
    navigate(`${route === "dashboard" ? "/dashboard" : "/dashboard/" + route}`);
  };

  return (
    <aside
      className={`flex justify-center absolute left-0 sm:relative z-10 -translate-x-full ease-in-out duration-500 sm:translate-x-0 ${
        isMenuOpen && "translate-x-0"
      }`}
    >
      <div className="w-screen bg-light-backgroundColor p-4 flex flex-col items-center dark:bg-dark-cardBgColor sm:m-4 sm:w-20 sm:justify-between sm:h-85vh sm:shadow-custom sm:rounded-3xl">
        <div className="flex flex-col items-start gap-8 dark:text-dark-secondaryTextColor">
          <div
            className="flex justify-center items-center gap-4 cursor-pointer"
            onClick={() => handleMenu("dashboard")}
          >
            <MdOutlineDashboard className="w-8 h-8 mt-2" />
            <div className="text-2xl font-bold sm:hidden">Dashboard</div>
          </div>
          <div
            className="flex justify-center items-center gap-4 cursor-pointer"
            onClick={() => handleMenu("portfolio")}
          >
            <MdOutlineMoney className="w-8 h-8 mt-2" />
            <div className="text-2xl font-bold sm:hidden">Portfolio</div>
          </div>
          <div
            className="flex justify-center items-center gap-4 cursor-pointer"
            onClick={() => handleMenu("account")}
          >
            <MdOutlineAccountCircle className="w-8 h-8 mt-2" />
            <div className="text-2xl font-bold sm:hidden">Account</div>
          </div>
          {/* Logout Button */}
          <div
            className="flex justify-center items-center gap-4 cursor-pointer"
            onClick={logout} // Call logout function on click
          >
            <IoLogOut className="w-8 h-8 mt-2" />
            <div className="text-2xl font-bold sm:hidden">Logout</div>
          </div>
        </div>
        <div className="w-60 pt-6 flex items-start sm:items-center sm:w-8">
          <DarkModeToggle />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
