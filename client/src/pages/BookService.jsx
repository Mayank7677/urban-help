import React from "react";
import { GoDotFill } from "react-icons/go";
import { Calendar } from "@/components/ui/calendar";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateBookingMutation } from "../features/booking/bookingApi";
import toast from "react-hot-toast";

const BookService = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const navigate = useNavigate();

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

  const [bookingData, setBookingData] = useState({
    name: "",
    contactNumber: "",
    address: "",
    notes: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setBookingData((prev) => ({
      ...prev,
      date: date.toISOString().split("T")[0], // Store as YYYY-MM-DD
    }));
  }, [date]);

  const [createBooking, { isLoading, isSuccess, error }] =
    useCreateBookingMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("booking data : ", bookingData);

    if (
      !bookingData.name ||
      !bookingData.contactNumber ||
      !bookingData.address ||
      !bookingData.time
    ) {
      alert("Please fill in all required fields and select a time.");
      return;
    }

    const payload = {
      id: data._id, // service ID
      bookingData: {
        ...bookingData,
      },
    };

    try {
      const res = await createBooking(payload).unwrap();
      toast.success(res.message); // or redirect or show confirmation
      console.log(res);

      setBookingData({
        name: "",
        myNumber: "",
        address: "",
        notes: "",
        date: new Date().toISOString().split("T")[0],
        time: "",
      });
      setSelectedTime(null);

      // delay slightly before redirect
      setTimeout(() => {
        navigate("/profile/my-bookings");
      }, 1000);
      
    } catch (err) {
      console.log(err);
      console.log(error);
      toast.error(err?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="mt-25 md:mt-30 pb-10 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex items-center gap-2 md:gap-4">
        <span className="md:text-2xl">
          <GoDotFill />
        </span>
        <p className="text-3xl lg:text-4xl text-neutral-800 ">Book Service</p>
      </div>

      <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:justify-evenly lg:items-center">
        <div className=" flex flex-col md:flex-row gap-10">
          {/* calender */}
          <div className="">
            <p className="mb-2 px-2">Select Date</p>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border"
            />
          </div>

          {/* time */}
          <div>
            <p className="mb-2 px-2">Select Time</p>
            <div className="grid grid-cols-3  gap-y-3 gap-x-2 ">
              {timeSlot.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedTime(item.time);
                    setBookingData((prev) => ({
                      ...prev,
                      time: item.time,
                    }));
                  }}
                  className={`${
                    selectedTime === item.time && "bg-black text-white"
                  } border border-neutral-300 rounded-lg py-1 text-sm px-1 sm:px-3 hover:bg-black hover:text-white transition duration-200 cursor-pointer`}
                >
                  {item.time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full ">
            <div className="w-full">
              <label
                htmlFor="name"
                className="block  font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={bookingData.name}
                onChange={handleChange}
                className="mt-1 w-full  px-3 py-2  rounded-xl font-normal border border-gray-400 sm:text-sm outline-none"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="phone"
                className="block  font-medium text-gray-700"
              >
                Your Number
              </label>
              <input
                type="text"
                id="myNumber"
                name="myNumber"
                value={bookingData.myNumber}
                onChange={handleChange}
                className="mt-1 w-full  px-3 py-2  rounded-xl font-normal border border-gray-400 sm:text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 w-full ">
            <div className="w-full">
              <label
                htmlFor="city"
                className="block  font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="name"
                value={data.city}
                disabled
                className="mt-1 w-full  px-3 py-2  rounded-xl font-normal border border-gray-400 sm:text-sm outline-none"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="state"
                className="block  font-medium text-gray-700"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                value={data.state}
                disabled
                className="mt-1 w-full  px-3 py-2  rounded-xl font-normal border border-gray-400 sm:text-sm outline-none"
              />
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="name" className="block  font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={bookingData.address}
              onChange={handleChange}
              className="mt-1 w-full  px-3 py-2  rounded-xl font-normal border border-gray-400 sm:text-sm outline-none"
            />
          </div>

          <div className="">
            <div className="md:col-span-2">
              <label
                htmlFor="notes"
                className="block  font-medium text-gray-700"
              >
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={bookingData.notes}
                onChange={handleChange}
                rows="4"
                className="mt-1 w-full  px-3 py-2  rounded-xl font-normal border border-gray-400 sm:text-sm outline-none resize-none"
              ></textarea>
            </div>
          </div>

          <div>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="cursor-pointer px-6 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Booking..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;
