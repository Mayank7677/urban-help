import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import serviceReducer from "../features/service/serviceSlice";
import { bookingApi } from "../features/booking/bookingApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    service: serviceReducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookingApi.middleware),
});
