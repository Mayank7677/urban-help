import React from "react";
import { CgSmartphone } from "react-icons/cg";
import { BiUser } from "react-icons/bi";
import { LuUsersRound } from "react-icons/lu";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import {
  PiAddressBookTabsThin,
  PiAddressBookThin,
  PiCityThin,
} from "react-icons/pi";
import { Link } from "react-router-dom";
import {
  useGetProviderBookingsQuery,
  useUpdateBookingMutation,
} from "../features/booking/bookingApi";
import { IoIosTimer } from "react-icons/io";
import toast from "react-hot-toast";

const getStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  return (
    <span className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      ))}
      {halfStar && (
        <svg
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="white" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"
          />
        </svg>
      )}
      <span className="ml-1 text-gray-500 text-sm">{rating.toFixed(1)}</span>
    </span>
  );
};

const BookingList = ({ status }) => {
  const {
    data,
    error: getError,
    isLoading: getLoading,
    refetch,
  } = useGetProviderBookingsQuery({ status });

  console.log(data);

  const [
    updateBooking,
    { isLoading: updateLoading, isSuccess, error: updateError },
  ] = useUpdateBookingMutation();

  const handleStatusChange = async (newStatus, bookingId) => {
    try {
      const res = await updateBooking({
        id: bookingId,
        status: newStatus,
      }).unwrap();
      console.log("Update successful:", res.message);
      toast.success("Update successful");

      refetch(); // Refreshing the bookings list
    } catch (err) {
      console.error("Update failed:", err?.data?.message || err.message);
      toast.error("Update failed");
    }
  };

  return (
    <div>
      <div className="sm:mt-4 w-full ">
        <div
          className={`hidden lg:grid lg:grid-cols-[3fr_1.5fr_1.5fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3 `}
        >
          <div className="">Service Details</div>
          <div className="">Location</div>
          <div className="">Date & Time</div>
          <div className="">Customer Details</div>
          {status !== "Completed" && (
            <div className="pl-[3%]">
              {status === "Pending" || status === "Accepted"
                ? "Manage"
                : "Status"}
            </div>
          )}
        </div>

        {getLoading ? (
          <p className="mt-10 text-center">Loading...</p>
        ) : data.length <= 0 ? (
          <p className="mt-10">No available Bookings</p>
        ) : (
          [...data].reverse().map((dets, i) => (
            <div className="grid grid-cols-1 max-md:gap-5 lg:grid-cols-[3fr_1.5fr_1.5fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t ">
              <div className="flex flex-col md:flex-row ">
                <img
                  className="min-md:w-44 rounded-2xl shadow object-cover"
                  src={dets.service.images[0]}
                  alt=""
                />
                <div className="flex flex-col gap-1 max-md:mt-3 min-md:ml-4">
                  <div>
                    <p className="text-xl  tracking-tight">
                      {dets.service.title} ,
                    </p>
                    <p className="text-xl  tracking-tight">
                      {dets.service.category}
                    </p>
                  </div>

                  <div className="flex items-center mb-2">
                    <span className="text-lg font-bold text-indigo-600 mr-2">
                      ₹{dets.service.price}
                    </span>
                    <span className="text-gray-400 text-sm">/ service</span>
                  </div>
                  {getStars(4.7)}
                </div>
              </div>

              <div className="flex flex-col gap-1.5 max-md:mt-3 mt-5">
                <div class="flex items-center gap-2  text-gray-700  ">
                  <PiAddressBookTabsThin className={`text-lg  text-black} `} />
                  <span className={`text-gray-700}`}>{dets.address}</span>
                </div>

                <div class="flex items-center gap-2  text-gray-700  ">
                  <PiCityThin className={`text-black } `} />
                  <span className={`text-gray-700 }`}>{dets.service.city}</span>
                </div>

                <div class="flex items-center gap-2  text-gray-700  ">
                  <GoLocation className={` text-xl text-black} `} />
                  <span className={`text-gray-700}`}>
                    {dets.service.state},
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 max-md:mt-3 mt-5">
                <div class="flex items-center gap-1  text-gray-700 tracking-tight ">
                  <IoIosTimer className={` text-lg text-black} `} />
                  <span className={` text-gray-700}`}>{dets.time}</span>
                </div>

                <div class="flex items-center gap-1  text-gray-700 tracking-tight ">
                  <CiCalendarDate className={` text-lg text-black} `} />
                  <span className={`text-gray-700}`}>{dets.date}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 max-md:mt-3 mt-5">
                <div class="flex items-center gap-1  text-gray-700 tracking-tight ">
                  <BiUser className={` text-lg text-black} `} />
                  <span className={`text-gray-700}`}>{dets.user.name}</span>
                </div>
                <div class="flex items-center gap-1  text-gray-700 tracking-tight ">
                  <HiOutlineMail className={` text-lg text-black} `} />
                  <span className={`text-gray-700}`}>{dets.user.email}</span>
                </div>
                <div class="flex items-center gap-1  text-gray-700 tracking-tight ">
                  <CgSmartphone className={` text-lg text-black} `} />
                  <span className={`text-gray-700 }`}>{dets.user.phone}</span>
                </div>
              </div>

              {status !== "Completed" && (
                <div className="flex flex-col w-fit md:items-center ">
                  <>
                    {status === "Accepted" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange("Completed", dets._id)
                          }
                          class="px-4 py-1.5 mt-4 md:mt-10 text-xs  border border-blue-600 text-blue-600 rounded-full hover:bg-gray-50 transition-all cursor-pointer font-serif"
                        >
                          Complete
                        </button>
                      </>
                    )}

                    {status === "Rejected" && (
                      <>
                        <button class="px-2 py-1.5 mt-4 md:mt-8    text-red-500   rounded-full hover:bg-gray-50 transition-all cursor-pointer font-serif">
                          Rejected
                        </button>
                      </>
                    )}

                    {status === "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange("Accepted", dets._id)
                          }
                          class="px-4 py-1.5 mt-4 text-xs border border-blue-500 text-blue-500 rounded-full hover:bg-gray-50 transition-all cursor-pointer font-serif"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            handleStatusChange("Rejected", dets._id)
                          }
                          class="px-4 py-1.5 mt-4 text-xs border border-red-500 text-red-500 rounded-full hover:bg-gray-50 transition-all cursor-pointer font-serif"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingList;
