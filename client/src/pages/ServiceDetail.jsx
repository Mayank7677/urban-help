import React from "react";
import { CgSmartphone } from "react-icons/cg";
import { GoDotFill, GoLocation } from "react-icons/go";
import { PiCityThin } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServiceById } from "../features/service/serviceSlice";
import assets from "../assets/assets";
import Footer from "../components/Footer";

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

const ServiceDetail = () => {
  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  const { selectedService, loading, error } = useSelector(
    (state) => state.service
  );
  console.log(selectedService);

  useEffect(() => {
    if (id) {
      dispatch(getServiceById(id));
    }
  }, [id, dispatch]);

  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);

  useEffect(() => {
    getTime();
  }, []);
  const getTime = () => {
    const timeList = [];

    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }

    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    timeList.push({
      time: 8 + ":00 PM",
    });

    setTimeSlot(timeList);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="mt-25 ">
      <div className="flex gap-5 md:gap-7 items-center border-b  border-neutral-400 pb-5 px-6 md:px-16 lg:px-24 xl:px-32">
        <div>
          <img
            className="w-25 h-25 md:w-40 md:h-40 object-cover rounded-full"
            src={selectedService?.provider?.profilePic || assets.avatar_icon}
            alt=""
          />
        </div>

        <div>
          <p className="text-2xl md:text-4xl tracking-tight">
            {selectedService?.provider?.name}
          </p>

          <div className="flex flex-col">
            <div className="flex items-center gap-2  text-gray-700  ">
              <PiCityThin className={`  text-black} `} />
              <span className={`text-gray-700}`}>{selectedService?.city},</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700  ">
              <GoLocation className={` text-black} `} />
              <span className={`text-gray-700}`}>{selectedService?.state}</span>
            </div>
          </div>

          <div className="flex items-center gap-1  text-gray-700 tracking-tight ">
            <CgSmartphone className={` text-lg text-black} `} />
            <span className={`text-gray-700}`}>
              {" "}
              {selectedService?.contactNumber}
            </span>
          </div>

          <div>{getStars(4.5)}</div>
        </div>
      </div>

      <div className="mt-6 md:mt-10 flex flex-col gap-8 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10">
          <div className="flex items-center gap-2 md:gap-4">
            <span className="md:text-2xl">
              <GoDotFill />
            </span>
            <p className="text-3xl lg:text-4xl ">{selectedService?.title}</p>
          </div>
        </div>

        <div className="flex  gap-4">
          {/* <p className="text-3xl ">Price :</p> */}
          <div className="flex items-center ">
            <span className="text-3xl font-bold text-indigo-600 mr-2">
              ₹{selectedService?.price}
            </span>
            <span className="text-gray-400 text-md">/ service</span>
          </div>

          <div className="">
            <Link
              to={"/book-service"}
              onClick={() => window.scrollTo(0, 0)}
              state={{ data: selectedService }}
            >
              <p className="w-fit px-5 py-1.5 rounded-xl text-white bg-lime-500 hover:bg-lime-600 cursor-pointer hover:opacity-90 transition-opacity ">
                Book Now
              </p>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          {selectedService?.images?.map((dets, i) => (
            <img
              key={i}
              className="rounded-3xl md:w-80 md:h-60 object-cover"
              src={dets}
              alt=""
            />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-3xl ">Description :</p>
          <p className="text-neutral-800 lg:w-[80%]">
            {selectedService?.description}
          </p>
        </div>
      </div>

      <div className="mt-25">
        <Footer />
      </div>
    </div>
  );
};

export default ServiceDetail;
