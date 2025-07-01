import React from "react";
import { CiBookmarkMinus, CiCircleCheck, CiLocationArrow1 } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { MdIncompleteCircle, MdOutlineCurrencyRupee } from "react-icons/md";

const boxLinks = [
  {
    title: "Total Bookings",
    count: 10,
    link: "/admin/totalBookings",
    icon: <CiBookmarkMinus />,
    // data: bookings,
  },
  {
    title: "Check-ins",
    count: 15,
    link: "/admin/checkin",
    icon: <MdIncompleteCircle />,
    // data: checkins,
  },
  {
    title: "Check-outs",
    count: 20,
    link: "/admin/checkout",
    icon: <CiCircleCheck />,
    // data: checkouts,
  },
  {
    title: "Total Revenue",
    count: 4,
    link: "/admin/revenue",
    icon: <MdOutlineCurrencyRupee />,
  },
];

const ProviderDashboard = () => {
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
            className={`w-full ${
              dets.link && "cursor-pointer"
            } max-[400px]:px-4 px-7 h-30 gap-2 border  rounded-3xl flex flex-col justify-center text-neutral-800 border-neutral-300`}
          >
            <div className="flex items-center justify-between">
              <p className="font-serif text-xl  tracking-tight flex items-center gap-1">
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
    </div>
  );
};

export default ProviderDashboard;
