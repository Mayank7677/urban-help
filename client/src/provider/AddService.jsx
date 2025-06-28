import React, { useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";

const indianStates = [
  "Andhra Pradesh",
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Uttar Pradesh",
];

const topCitiesByState = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada"],
  Delhi: ["New Delhi", "Dwarka", "Rohini"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Karnataka: ["Bangalore", "Mysore"],
  "Tamil Nadu": ["Chennai", "Coimbatore"],
  "Uttar Pradesh": ["Lucknow", "Kanpur"],
};

const serviceCategories = {
  Plumbing: ["Leak Fixing", "Pipe Installation", "Bathroom Fittings"],
  Electrical: ["Wiring", "Fan Installation", "Inverter Setup"],
  Cleaning: ["Home Cleaning", "Office Cleaning", "Sofa Cleaning"],
};

const AddService = () => {
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    category: "",
    title: "",
    price: "",
    contactNumber: "",
    description: "",
  });

  const [cities, setCities] = useState([]);
  const [titles, setTitles] = useState([]);
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  useEffect(() => {
    if (formData.state) {
      setCities(topCitiesByState[formData.state] || []);
    }
  }, [formData.state]);

  useEffect(() => {
    if (formData.category) {
      setTitles(serviceCategories[formData.category] || []);
    }
  }, [formData.category]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="px-2 sm:px-5 pb-10 w-full">
      <div className="flex items-center gap-2 md:gap-4">
        <span className="md:text-2xl">
          <GoDotFill />
        </span>
        <p className="text-3xl lg:text-4xl text-neutral-800 ">Add Service</p>
      </div>
      <form className="w-full">
        <div className="mt-10  max-sm:w-full sm:w-3/4">
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
                value={formData.state}
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
              <label htmlFor="city" className="block font-medium text-gray-700">
                City
              </label>
              <select
                id="city"
                value={formData.city}
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
                htmlFor="category"
                className="block  font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 w-full  px-3 py-2  rounded-xl font-normal border border-gray-400 sm:text-sm outline-none"
              >
                <option value="">Select Category</option>
                {Object.keys(serviceCategories).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label
                htmlFor="title"
                className="block  font-medium text-gray-700"
              >
                Service Title
              </label>
              <select
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 w-full  px-3 py-2  rounded-xl font-normal border border-gray-400 sm:text-sm outline-none"
              >
                <option value="">Select Title</option>
                {titles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 w-full mt-5">
            <div className="w-full">
              <label
                htmlFor="price"
                className="block  font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 w-full  px-3 py-2  rounded-xl font-normal border border-gray-400 sm:text-sm outline-none"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="contactNumber"
                className="block  font-medium text-gray-700"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="mt-1 w-full  px-3 py-2  rounded-xl font-normal border border-gray-400 sm:text-sm outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-2 mt-5">
            <label
              htmlFor="description"
              className="block  font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 w-full  px-3 py-2  rounded-xl font-normal border border-gray-400 sm:text-sm outline-none resize-none"
            ></textarea>
          </div>

          <div className="md:col-span-2 mt-5">
            <label className="block  font-medium text-gray-700 mb-1">
              Upload Images
            </label>
            <div className="flex gap-4 flex-wrap">
              {Object.keys(images).map((key) => (
                <label key={key} className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      setImages({ ...images, [key]: e.target.files[0] })
                    }
                  />
                  <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center border border-dashed border-gray-400">
                    {images[key] ? (
                      <img
                        src={URL.createObjectURL(images[key])}
                        alt="preview"
                        className="object-cover w-full h-full rounded"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">Upload</span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddService;
