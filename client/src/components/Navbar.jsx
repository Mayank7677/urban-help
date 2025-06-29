import React, { useEffect } from "react";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import assets from "../assets/assets";

const Navbar = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  console.log(user);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/all-services" },
    { name: "Contact", path: "/" },
    { name: "About", path: "/" },
  ];

  const ref = React.useRef(null);

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token); // Convert to true/false directly
  }, []);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }
    setIsScrolled((prev) => (location.pathname !== "/" ? true : prev));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const isAdminRoute =
    location.pathname.startsWith("/provider") ||
    location.pathname.startsWith("/admin");
  return (
    <div className="flex items-center  absolute">
      <div ref={ref} className=" ">
        <p className="w-10 h-[500px]"></p>
        <nav
          className={`fixed top-0 left-0  w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
            isScrolled
              ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4 rounded-b-4xl"
              : "py-4 md:py-6"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center gap-2"
          >
            <p
              className={`text-3xl font-medium ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Urban-Help
            </p>
          </Link>

          {/* Desktop Nav */}
          {!isAdminRoute && (
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  onClick={() => window.scrollTo(0, 0)}
                  to={link.path}
                  className={`group flex flex-col gap-0.5 ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  {link.name}
                  <div
                    className={`${
                      isScrolled ? "bg-gray-700" : "bg-white"
                    } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
                  />
                </Link>
              ))}
              <Link to={"/provider"}>
                <button
                  className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
                    isScrolled ? "text-black" : "text-white"
                  } transition-all`}
                >
                  Dashboard
                </button>
              </Link>
            </div>
          )}

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    className="h-8 w-8 rounded-full object-center"
                    src={user?.profilePic || assets.avatar_icon}
                    alt="Profile"
                  />
                  <p
                    className={` text-xl ${
                      isScrolled ? "text-gray-700" : "text-white"
                    }`}
                  >
                    Hyy, {user?.name.split(" ")[0]}
                  </p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={"/profile"}>Edit Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={"/profile/my-bookings"}>My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button
                    onClick={() => dispatch(logout())}
                    className="text-red-500 font-serif text-sm"
                  >
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <svg
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {navLinks.map((link, i) => (
              <Link to={link.path} key={i} onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}

            <Link to={"/profile"} onClick={() => setIsMenuOpen(false)}>
              <button className="border border-neutral-500 px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                Profile
              </button>
            </Link>

            <button
              onClick={() => dispatch(logout())}
              className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
