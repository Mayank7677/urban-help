import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3030/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: ({ id, bookingData }) => ({
        url: `/bookings/create/${id}`,
        method: "POST",
        body: bookingData,
      }),
    }),

    updateBooking: builder.mutation({
      query: ({ id, status }) => ({
        url: `/bookings/update/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),

    getMyBookings: builder.query({
      query: () => "/bookings/myBookings",
    }),

    getProviderBookings: builder.query({
      query: ({ status }) => `/bookings/providerBookings/${status}`,
    }),

    getDataForCards: builder.query({
      query: () => `/bookings/dash-cards-stats`,
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetProviderBookingsQuery,
  useUpdateBookingMutation,
  useGetDataForCardsQuery,
} = bookingApi;
