import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

const ProviderSidebar = () => {
  const dashboardicon = (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z"
      />
    </svg>
  );

  const overviewicon = (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z"
      />
    </svg>
  );

  const chaticon = (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
      />
    </svg>
  );

  const sidebarLinks = [
    { name: "My Services", path: "/provider", icon: <RxDashboard /> },
    { name: "Add Service", path: "/provider/add-service", icon: overviewicon },
    { name: "Chat", path: "/chat", icon: chaticon },
  ];

  return (
    <div className="flex min-h-screen pt-10 md:pt-15">
      {/* Sidebar */}
      <aside className="md:w-60 w-10 fixed h-full pt-10 border-r border-gray-300 py-4 gap-2 flex flex-col bg-gray-50">
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
            <span className="md:inline hidden text-lg">{item.name}</span>
          </NavLink>
        ))}
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-7 max-sm:py-7 max-sm:px-2 pb-10  border border-neutral-200  md:ml-60 ml-10  max-[450px]:w-[86vw] max-sm:w-[90vw] md:w-[78vw] lg:w-[83vw] xl:w-[84.5vw]  h-full fixed overflow-scroll bg-white text-black  ">
        <Outlet />
      </main>
    </div>
  );
};

export default ProviderSidebar;
