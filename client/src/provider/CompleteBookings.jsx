import React from "react";
import BookingList from "../components/BookingList";
import { GoDotFill } from "react-icons/go";

const CompleteBookings = () => {
  return (
    <div className="px-2 sm:px-5 pb-10 w-full">
      <div className="flex items-center gap-2 md:gap-4">
        <span className="md:text-2xl">
          <GoDotFill />
        </span>
        <p className="text-3xl lg:text-4xl text-neutral-800 ">
          Complete Bookings
        </p>
      </div>

      <div className="mt-5">
        <BookingList status={"Completed"} />
      </div>
    </div>
  );
};

export default CompleteBookings;
