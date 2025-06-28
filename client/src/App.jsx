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
        </Route>
      </Routes>
      {/* {!hideFooter && <Footer />} */}
    </>
  );
};

export default App;
