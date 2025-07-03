import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { VscAdd } from "react-icons/vsc";
import { CiBookmarkMinus } from "react-icons/ci";
import { TfiHome } from "react-icons/tfi";
import { IoMdDoneAll } from "react-icons/io";
import { MdWorkspacesFilled } from "react-icons/md";

const ProviderSidebar = () => {
  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/provider",
      icon: <RxDashboard />,
    },
    {
      name: "My Services",
      path: "/provider/my-services",
      icon: <MdWorkspacesFilled />,
    },
    { name: "Add Service", path: "/provider/add-service", icon: <VscAdd /> },
    {
      name: "Manage Bookings",
      path: "/provider/manage-bookings",
      icon: <CiBookmarkMinus />,
    },
    {
      name: "Complete Bookings",
      path: "/provider/complete-bookings",
      icon: <IoMdDoneAll />,
    },
  ];

  return (
    <div className="flex min-h-screen pt-10 md:pt-15">
      {/* Sidebar */}
      <div>
        <aside className="md:w-60 w-10 fixed h-full pt-10 border-r border-gray-300 py-4 gap-1 flex flex-col bg-gray-50 ">
          <div className="pb-2 border-b border-neutral-300 gap-1 flex flex-col">
            {sidebarLinks.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                end={item.path === "/provider"}
                className={({ isActive }) =>
                  `flex items-center  gap-2 py-1 px-2  transition-colors duration-200  ${
                    isActive
                      ? "bg-white border-r-7 border-y border-gray-300  text-black"
                      : "text-black hover:bg-white hover:text-black"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="md:inline hidden text-md">{item.name}</span>
              </NavLink>
            ))}
          </div>

          <div className="pb-2 border-b border-neutral-300">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <div
                className={`flex items-center cursor-pointer gap-2 py-1 px-2 rounded-r-4xl transition-colors duration-200 
                text-black hover:bg-white hover:text-black`}
              >
                <p className="text-lg">
                  <TfiHome />
                </p>
                <p className="max-md:hidden">View</p>
              </div>
            </Link>
          </div>
        </aside>
      </div>

      {/* Content Area */}
      <main className="flex-1 p-7 max-sm:py-7 max-sm:px-2 pb-10  border border-neutral-200  md:ml-60 ml-10  max-[450px]:w-[86vw] max-sm:w-[90vw] md:w-[78vw] lg:w-[83vw] xl:w-[84.5vw]  h-full fixed overflow-scroll bg-white text-black  ">
        <Outlet />
      </main>
    </div>
  );
};

export default ProviderSidebar;
