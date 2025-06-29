import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";
import assets from "../assets/assets";
import { PiCamera } from "react-icons/pi";
import toast from "react-hot-toast";
import indianStates from "../utilities/indianStates";
import topCitiesByState from "../utilities/topCitiesByState";

const EditProfile = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const handleImageChange = async (e) => {
    // const file = e.target.files[0];
    // if (!file) return;
    // setSelectedImage(file);

    setIsLoading(true);

    const formData = new FormData();
    formData.append("profilePic", selectedImage);

    try {
      const res = await axios.put(
        "http://localhost:3030/api/auth/updateProfilePic", // Adjust if needed
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Upload success:", res.data.user);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      toast.error("Failed to upload profile picture");
    } finally {
      setIsLoading(false);
    }
  };

  const [userData, setUserData] = useState({
    name: user.name,
    phone: user.phone,
    city: user.city,
    state: user.state,
  });

  const [cities, setCities] = useState([]);
  useEffect(() => {
    if (userData.state) {
      setCities(topCitiesByState[userData.state] || []);
    }
  }, [userData.state]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading2(true);

    try {
      let res = await axios.put(
        `http://localhost:3030/api/auth/edit-profile/${user._id}`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Upload success:", res.data);
      toast.success("Profile  updated successfully!");
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      toast.error("Failed to update profile ");
    } finally {
      setIsLoading2(false);
    }
  };

  return (
    <div className="pb-10">
      <div className="flex items-center gap-2 md:gap-4">
        <span className="md:text-2xl">
          <GoDotFill />
        </span>
        <p className="text-3xl lg:text-4xl text-neutral-800 ">Edit Profile</p>
      </div>

      <div className="mt-15 border-b pb-5 border-neutral-300">
        <div className="flex gap-2 sm:gap-5 items-center sm:px-10 sm:items-end ">
          <div className="relative w-fit">
            <label
              onChange={(e) => setSelectedImage(e.target.files[0])}
              htmlFor="avatar"
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="file"
                id="avatar"
                accept="image/*"
                hidden
                //   onChange={handleImageChange}
              />

              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : user?.profilePic || assets.avatar_icon
                }
                className="w-22 h-22 sm:w-30 sm:h-30 object-cover rounded-full border border-gray-300"
                alt="Profile"
              />
            </label>

            <p className="text-lg  absolute right-2 bottom-1 bg-white rounded-full p-1 shadow-md">
              <PiCamera />
            </p>
          </div>

          <div>
            <p className="sm:text-xl mb-2">Change Your Profile Picture</p>
            <button
              onClick={handleImageChange}
              className=" h-fit px-3 py-1 sm:mb-3 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              {isLoading ? "Updating..." : "Change Image"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-2xl px-3">Update Details</p>

        <form onSubmit={handleSubmit} className="mt-5">
          <div className="max-sm:w-full sm:w-3/4">
            <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
              <div className="w-full">
                <label
                  htmlFor="state"
                  className="block  font-medium text-gray-700"
                >
                  State
                </label>
                <select
                  id="state"
                  value={userData.state}
                  onChange={handleChange}
                  className="mt-1 w-full  px-3 py-2  rounded-xl font-normal border border-gray-400 sm:text-sm outline-none"
                >
                  <option value="">Select State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <label
                  htmlFor="city"
                  className="block font-medium text-gray-700"
                >
                  City
                </label>
                <select
                  id="city"
                  value={userData.city}
                  onChange={handleChange}
                  className="mt-1 w-full  px-3 py-2  rounded-xl font-normal border border-gray-400 sm:text-sm outline-none"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 w-full mt-5">
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
                  value={userData.name}
                  onChange={handleChange}
                  className="mt-1 w-full  px-3 py-2  rounded-xl font-normal border border-gray-400 sm:text-sm outline-none"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block  font-medium text-gray-700"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="mt-1 w-full  px-3 py-2  rounded-xl font-normal border border-gray-400 sm:text-sm outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700  text-white cursor-pointer hover:opacity-90 transition-opacity rounded-md"
            >
              {isLoading2 ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
