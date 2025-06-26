import React from "react";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center ">
      <p>UrbanHelp</p>
      <button
        onClick={() => dispatch(logout())}
        type="submit"
        className="mt-3 px-5 py-2 rounded-full text-white bg-purple-600 hover:bg-purple-800 cursor-pointer hover:opacity-90 transition-opacity "
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
