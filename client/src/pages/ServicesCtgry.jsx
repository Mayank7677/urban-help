import React, { useEffect, useState } from "react";
import ServiceList from "../components/ServiceList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterServices } from "../features/service/serviceSlice";
import topCitiesByState from "../utilities/topCitiesByState";
import indianStates from "../utilities/indianStates";
import serviceCategories from "../utilities/serviceCategories";
import { GoDotFill } from "react-icons/go";
import Footer from "../components/Footer";

const ServicesCtgry = () => {
  const { category } = useParams();
  const dispatch = useDispatch();

  const { services, loading, error } = useSelector((state) => state.service);

  const [formData, setFormData] = useState({
    state: "",
    city: "",
    title: "",
    category: category || "", // ✅ Set default category
  });

  const [cities, setCities] = useState([]);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    if (formData.state) {
      setCities(topCitiesByState[formData.state] || []);
    } else {
      setCities([]);
    }
  }, [formData.state]);

  useEffect(() => {
    if (category) {
      setTitles(serviceCategories[category] || []);
    } else {
      setTitles([]);
    }
  }, [category]);

  useEffect(() => {
    dispatch(filterServices({ ...formData, category }));
  }, [formData, category, dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="mt-20 md:mt-30 ">
      <div className="mb-10 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="md:text-2xl">
            <GoDotFill />
          </span>
          <h1 className="text-3xl md:text-4xl  text-neutral-800">
            Services in "{category}" Category
          </h1>
        </div>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Browse all service providers under the{" "}
          <span className="font-medium text-primary">{category}</span> category
          and filter by location or title.
        </p>
      </div>

      <div className="sm:flex gap-5 mb-8 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
          <div className="w-full">
            <label htmlFor="state" className="block font-medium text-gray-700">
              State
            </label>
            <select
              id="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-400"
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
              className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-400"
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

        <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
          <div className="w-full">
            <label
              htmlFor="category"
              className="block font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              disabled // ✅ Disable this dropdown
              className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-400 bg-gray-100 text-gray-600 cursor-not-allowed"
            >
              <option value={category}>{category}</option>
            </select>
          </div>

          <div className="w-full">
            <label htmlFor="title" className="block font-medium text-gray-700">
              Service Title
            </label>
            <select
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-400"
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
      </div>

      {/* Loading */}
      {loading && <p className="text-center h-screen">Loading...</p>}

      {/* No results */}
      {!loading && services?.length === 0 && (
        <p className="text-center mt-20 text-lg text-red-500">
          No services found for "{category}" category.
        </p>
      )}

      {/* Services list */}
      {!loading && services?.length > 0 && <ServiceList data={services} />}

      <div className="mt-25">
        <Footer />
      </div>
    </div>
  );
};

export default ServicesCtgry;
