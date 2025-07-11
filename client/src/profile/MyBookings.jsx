import React from "react";
import { BiUser } from "react-icons/bi";
import { CgSmartphone } from "react-icons/cg";
import { GoDotFill, GoLocation } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
import { PiCityThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useGetMyBookingsQuery } from "../features/booking/bookingApi";
import { IoIosTimer } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { PiAddressBookThin } from "react-icons/pi";
import axiosInstance from "../configs/api";
import toast from "react-hot-toast";
import { MdOutlineFileDownloadDone } from "react-icons/md";

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

const MyBookings = () => {
  const { data, error, isLoading } = useGetMyBookingsQuery();
  console.log(data);

  const handlePayNow = async (bookingId, totalAmount) => {
    try {
      // 1. Create order from backend
      const { data } = await axiosInstance.post("/transactions/create-order", {
        amount: totalAmount,
      });

      if (!data || !data.id) {
        toast.error("Order creation failed");
        return;
      }

      // 2. Init Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Urban-Help",
        description: "Service Booking Payment",
        order_id: data.id,
        handler: async function (response) {
          try {
            const verifyRes = await axiosInstance.post(
              "/transactions/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId, // Send the booking ID
              }
            );

            toast.success("Payment successful!");
            // Redirect or update UI
          } catch (err) {
            console.error("Verification failed", err);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: "Mayank Panwar", // You can use user's name
          email: "user@example.com", // optional
          contact: "9999999999", // optional
        },
        theme: {
          color: "#3b82f6",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("Error in handlePayNow", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-neutral-700">
        <span className="md:text-2xl">
          <GoDotFill />
        </span>
        <p className="text-3xl md:text-4xl">My Bookings</p>
      </div>

      {isLoading ? (
        <p className="mt-20 text-center">Loading...</p>
      ) : (
        <div className="mt-3 w-full ">
          <div className="hidden lg:grid lg:grid-cols-[3fr_1.5fr_1.5fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3 ">
            <div className="">Service Details</div>
            <div className="">Location</div>
            <div className="">Date & Time</div>
            <div className="">Provider Details</div>
            <div className="pl-[3%]">Status</div>
          </div>

          {[...data].reverse().map((dets, i) => (
            <div
              key={i}
              className="grid grid-cols-1 max-md:gap-5 lg:grid-cols-[3fr_1.5fr_1.5fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t "
            >
              <div className="flex flex-col md:flex-row ">
                <img
                  className="min-md:w-44 rounded-2xl shadow object-cover"
                  src={dets.service.images[0]}
                  alt=""
                />
                <div className="flex flex-col gap-1 max-md:mt-3 min-md:ml-4">
                  <div>
                    <p className="text-xl  tracking-tight">
                      {dets.service.category} ,
                    </p>
                    <p className="text-xl  tracking-tight">
                      {dets.service.title}
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

              <div className="flex flex-col gap-1 max-md:mt-3 mt-5">
                <div class="flex items-center gap-2  text-gray-700  ">
                  <PiAddressBookThin className={`text-lg  text-black} `} />
                  <span
                    className={`text-gray-700
                      }`}
                  >
                    {dets.address},
                  </span>
                </div>

                <div class="flex items-center gap-2  text-gray-700  ">
                  <GoLocation className={`  text-black} `} />
                  <span
                    className={`text-gray-700
                      }`}
                  >
                    {dets.service.state},
                  </span>
                </div>

                <div class="flex items-center gap-2 text-gray-700  ">
                  <PiCityThin
                    className={`  text-black
                      } `}
                  />
                  <span
                    className={`text-gray-700
                      }`}
                  >
                    {dets.service.city}
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

              <div className="flex flex-col gap-1.5 max-md:mt-3 mt-4">
                <div class="flex items-center gap-1  text-gray-700 tracking-tight ">
                  <BiUser
                    className={` text-lg text-black
                      } `}
                  />
                  <span
                    className={`
                        text-gray-700
                      }`}
                  >
                    {dets.provider.name}
                  </span>
                </div>
                <div class="flex items-center gap-1  text-gray-700 tracking-tight ">
                  <HiOutlineMail
                    className={` text-lg text-black
                      } `}
                  />
                  <span
                    className={`text-gray-700
                      }`}
                  >
                    {dets.provider.email}
                  </span>
                </div>
                <div class="flex items-center gap-1  text-gray-700 tracking-tight ">
                  <CgSmartphone
                    className={` text-lg text-black
                      } `}
                  />
                  <span className={`text-gray-700                    }`}>
                    {dets.service.contactNumber}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 max-md:mt-3 md:mt-10">
                <button
                  className={`px-4 w-fit py-1.5  text-xs border rounded-full  ${
                    dets.status === "Pending"
                      ? "border-yellow-400 text-yellow-400"
                      : dets.status === "Rejected"
                      ? "border-red-500 text-red-500"
                      : dets.status === "Accepted"
                      ? "border-blue-600 text-blue-600"
                      : "border-green-600 text-green-600"
                  }`}
                >
                  {dets.status}
                </button>

                {dets.status === "Accepted" &&
                  dets.paymentStatus === "Unpaid" && (
                    <button
                      onClick={() => handlePayNow(dets._id, dets.service.price)}
                      className={`px-4 w-fit py-1.5  text-xs border border-neutral-400 cursor-pointer  rounded-full `}
                    >
                      Pay Now
                    </button>
                  )}
                {dets.paymentStatus === "Paid" && (
                  <button
                    className={`px-4 w-fit py-1.5  text-xs border border-green-600 text-green-600  rounded-full flex items-center gap-2`}
                  >
                    <span>
                      <MdOutlineFileDownloadDone size={16} />
                    </span>
                    Paid
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MyBookings;
