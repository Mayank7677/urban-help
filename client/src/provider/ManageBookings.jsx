import React from "react";
import { GoDotFill } from "react-icons/go";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "../components/BookingList";
import { useGetProviderBookingsQuery } from "../features/booking/bookingApi";

const ManageBookings = () => {
  
  return (
    <div className="px-2 sm:px-5 pb-10 w-full">
      <div className="flex items-center gap-2 md:gap-4">
        <span className="md:text-2xl">
          <GoDotFill />
        </span>
        <p className="text-3xl lg:text-4xl text-neutral-800 ">
          Manage Bookings
        </p>
      </div>

      <div className="mt-5 ">
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger className="text-md" value="pending">
              Pending
            </TabsTrigger>
            <TabsTrigger className="text-md" value="accepted">
              Accepted
            </TabsTrigger>
            <TabsTrigger className="text-md" value="cancelled">
              Cancelled
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <BookingList status={"Pending"} />
          </TabsContent>
          <TabsContent value="accepted">
            <BookingList status={"Accepted"} />
          </TabsContent>
          <TabsContent value="cancelled">
            <BookingList status={"Rejected"} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageBookings;
