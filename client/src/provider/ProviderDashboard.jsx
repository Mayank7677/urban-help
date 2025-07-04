import React from "react";
import {
  CiBookmarkMinus,
  CiCircleCheck,
  CiLocationArrow1,
} from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { MdIncompleteCircle, MdOutlineCurrencyRupee } from "react-icons/md";
import { useGetDataForCardsQuery } from "../features/booking/bookingApi";
import { useNavigate } from "react-router-dom";
import { BookingBarChart } from "../components/charts/BarChart";
import { ChartLineDefault } from "../components/charts/LineChart";

const ProviderDashboard = () => {
  const { data, isLoading, error } = useGetDataForCardsQuery();
  const navigate = useNavigate();

  const boxLinks = [
    {
      title: "Total Bookings",
      count: data?.totalBookings,
      link: "/provider/manage-bookings",
      icon: <CiBookmarkMinus />,
      // data: bookings,
    },
    {
      title: "Complete Bookings",
      count: data?.completeBookings,
      link: "/provider/complete-bookings",
      icon: <MdIncompleteCircle />,
      // data: checkins,
    },
    {
      title: "My Services",
      count: data?.totalServices,
      link: "/provider/my-services",
      icon: <CiCircleCheck />,
      // data: checkouts,
    },
    {
      title: "Total Revenue",
      count: data?.totalRevenue,
      // link: "/admin/revenue",
      icon: <MdOutlineCurrencyRupee />,
    },
  ];

  console.log(data);
  return (
    <div className="px-2 sm:px-5 pb-10">
      <div className="flex items-center gap-2 text-neutral-700">
        <span className="md:text-2xl">
          <GoDotFill />
        </span>
        <p className="text-3xl md:text-4xl">Dashboard</p>
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-7 mt-10">
        {boxLinks.map((dets, i) => (
          <div
            key={i}
            onClick={() => navigate(dets.link)}
            className={`w-full ${
              dets.link && "cursor-pointer"
            } max-[400px]:px-4 px-7 h-30 gap-2 border  rounded-3xl flex flex-col justify-center text-neutral-800 border-neutral-300 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xl  tracking-tight flex items-center gap-1">
                <span className="text-2xl">{dets.icon}</span>
                {dets.title}
              </p>
              {dets.link && <CiLocationArrow1 className="text-xl" />}
            </div>
            <p className="text-3xl font-[400] tracking-tight pl-7">
              {dets.count}
            </p>
          </div>
        ))}
      </div>
      {/* Charts  */}
      <div className="flex flex-col lg:flex-row gap-10 mt-10">
        <div className="w-full ">
          <BookingBarChart />
        </div>

        <div className="w-full">
          <ChartLineDefault />
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
