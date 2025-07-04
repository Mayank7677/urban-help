"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import axiosInstance from "../../configs/api";

const chartConfig = {
  totalBookings: {
    label: "Total Bookings",
    color: "var(--chart-2)",
  },
};

export function BookingBarChart() {
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchBookingData = async () => {
    try {
      const query = new URLSearchParams();
      if (startDate) query.append("start", startDate);
      if (endDate) query.append("end", endDate);

      const res = await axiosInstance.get(
        `/bookings/bookings-bar-data?${query.toString()}`
      );
      console.log(res.data);
      setChartData(res.data);
    } catch (err) {
      console.error("Error fetching booking data:", err);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, [startDate, endDate]);

  return (
    <Card className="hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
      <CardHeader>
        <CardTitle>Total Bookings</CardTitle>
        <CardDescription>Day-wise total bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded-md text-sm"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded-md text-sm"
          />
        </div>

        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              interval={0}
              tickMargin={0}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            {/* <YAxis allowDecimals={false} /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="totalBookings"
              fill="var(--color-totalBookings)"
              radius={10}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm -mt-2">
        <div className="text-muted-foreground">
          Showing booking data for the selected date range
        </div>
      </CardFooter>
    </Card>
  );
}
