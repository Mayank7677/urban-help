import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LuSmartphone } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { FaCity } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import indianStates from "../utilities/indianStates";
import topCitiesByState from "../utilities/topCitiesByState";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";

const SignupPage = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    city: "",
    state: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);
    let result = await dispatch(registerUser(userData));
    console.log(result); 

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Account Created successful!");
      navigate("/"); // go to home or dashboard
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen ">
      <div class="flex   gap-10   rounded-4xl   border-zinc-900 items-center">
        <div class="w-full flex flex-col items-center justify-center ">
          <form
            onSubmit={handleSubmit}
            class="md:w-96 w-80 flex flex-col items-center justify-center p-5"
          >
            <h2 class="text-4xl text-gray-800 font-semibold">Sign up</h2>
            <p class="text-sm text-gray-800 mt-2 ">
              Welcome Please sign up to continue
            </p>

            <button
              type="button"
              class="w-full mt-6 bg-gray-100 border border-zinc-300 flex items-center justify-center h-12 rounded-full"
            >
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                alt="googleLogo"
              />
            </button>

            <div class="flex items-center gap-4 w-full my-3">
              <div class="w-full h-px bg-gray-600"></div>
              <p class="w-full text-nowrap text-sm text-gray-800 ">
                or create an account
              </p>
              <div class="w-full h-px bg-gray-600"></div>
            </div>

            <div class="flex items-center w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-4.5 gap-2">
              <p className="text-md font-semibold text-gray-500">
                <FaRegCircleUser />
              </p>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Name"
                class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full "
                required
              />
            </div>

            <div class="flex items-center mt-4 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <p className="text-md font-semibold text-gray-500 -ml-1">
                <HiOutlineDevicePhoneMobile />
              </p>
              <input
                type="text"
                placeholder="Phone Number "
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full "
                required
              />
            </div>

            <div class="flex items-center mt-4 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="16"
                height="11"
                viewBox="0 0 16 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="text"
                placeholder="Email "
                name="email"
                value={userData.email}
                onChange={handleChange}
                class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full "
                required
              />
            </div>

            <div class="flex items-center mt-4 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="13"
                height="17"
                viewBox="0 0 13 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full "
                required
              />
            </div>

            <div class="flex items-center mt-4 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-4.5 gap-2">
              <p className="text-lg text-gray-500">
                <IoLocationSharp />
              </p>

              <select
                id="state"
                value={userData.state}
                onChange={handleChange}
                required
                name="state"
                className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full"
              >
                <option value="">Select a State</option>
                {indianStates.map((s, index) => (
                  <option key={index} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center mt-4 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-4.5 gap-2">
              <p className="text-md text-gray-500">
                <FaCity />
              </p>
              <select
                name="city"
                value={userData.city}
                onChange={handleChange}
                required
                className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm w-full h-full overflow-y-scroll"
              >
                <option value="">Select a City</option>
                {topCitiesByState[userData.state]?.map((city, index) => (
                  <option
                    key={index}
                    value={city}
                    className="overflow-y-scroll"
                  >
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* <div class="flex items-center mt-4 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-4.5 gap-2">
              <p className="text-md text-gray-500">
                <FaCity />
              </p>
              <input
                type="text"
                placeholder="City"
                name="phone"
                value={userData.city}
                onChange={handleChange}
                class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full "
                required
              />
            </div> */}

            {/* <div className="flex items-center mt-4 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-4.5 gap-2">
              <p className="text-md text-gray-500">
                <FaRegCircleUser />
              </p>
              <select
                name="role"
                value={userData.role}
                onChange={handleChange}
                required
                className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm w-full h-full"
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="provider">Provider</option>
              </select>
            </div> */}

            <div className="flex items-center mt-4 justify-start gap-2 self-start pl-3">
              <input
                type="checkbox"
                id="provider"
                checked={userData.role === "provider"}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    role: e.target.checked ? "provider" : "customer",
                  })
                }
              />
              <label htmlFor="provider" className="text-sm text-gray-700">
                I want to register as a service provider
              </label>
            </div>

            <button
              type="submit"
              class="mt-4 w-full h-11  rounded-full text-white bg-lime-500 hover:bg-lime-600 cursor-pointer hover:opacity-90 transition-opacity"
            >
              {loading ? "Creating..." : "Create"}
            </button>
            <p class="text-gray-600 text-sm  mt-2">
              Already have an account?{" "}
              <Link class="text-lime-600 hover:underline" to="/login">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
