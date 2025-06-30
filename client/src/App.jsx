import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { checkAuth } from "./features/auth/authSlice";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllServices from "./pages/AllServices";
import ProviderSidebar from "./provider/ProviderSidebar";
import AddService from "./provider/AddService";
import MyServices from "./provider/MyServices";
import ManageBookings from "./provider/ManageBookings";
import ServicesCtgry from "./pages/ServicesCtgry";
import ServiceDetail from "./pages/ServiceDetail";
import ProfileSidebar from "./profile/ProfileSidebar";
import EditProfile from "./profile/EditProfile";
import MyBookings from "./profile/MyBookings";
import { Toaster } from "react-hot-toast";
import BookService from "./pages/BookService";
import { getAllServices } from "./features/service/serviceSlice";
import CompleteBookings from "./provider/CompleteBookings";

const App = () => {
  const location = useLocation();
  // Hide navbar on login/signup
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";
  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/provider";

  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { services } = useSelector((state) => state.service);
  console.log(services);

  useEffect(() => {
    dispatch(getAllServices());
  }, []);

  useEffect(() => {
    if (token && !user) {
      dispatch(checkAuth());
    }
  }, [token, user, dispatch]);

  // ⏳ Optional loading UI while checking auth
  if (token && !user) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>
    );
  }

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/all-services"
          element={user ? <AllServices /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/book-service"
          element={user ? <BookService /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/services-cat/:category"
          element={user ? <ServicesCtgry /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/service-details/:id"
          element={user ? <ServiceDetail /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to={"/"} />}
        />

        <Route path="/provider" element={<ProviderSidebar />}>
          <Route index element={<MyServices />} />
          <Route path="add-service" element={<AddService />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
          <Route path="complete-bookings" element={<CompleteBookings />} />
        </Route>

        <Route
          path="/profile"
          element={user ? <ProfileSidebar /> : <Navigate to={"/login"} />}
        >
          <Route index element={<EditProfile />} />
          <Route path="my-bookings" element={<MyBookings />} />
        </Route>
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
      {/* {!hideFooter && <Footer />} */}
    </>
  );
};

export default App;
