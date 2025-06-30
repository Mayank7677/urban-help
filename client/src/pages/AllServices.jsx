import React from "react";
import { GoDotFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import ServiceList from "../components/ServiceList";
import Footer from "../components/Footer";
import serviceCategoriesImg from "../utilities/serviceCategoriesImg";
import indianStates from "../utilities/indianStates";
import { useState } from "react";
import topCitiesByState from "../utilities/topCitiesByState";
import serviceCategories from "../utilities/serviceCategories";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../features/service/serviceSlice";

const allServices = [
  {
    id: 1,
    title: "Home Cleaning",
    category: "Cleaning",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description:
      "Professional cleaning for your home, including kitchen, bathrooms, and living areas.",
    price: 799,
    city: "Delhi",
    state: "Delhi",
    provider: "Amit Sharma",
    rating: 4.7,
  },
  {
    id: 2,
    title: "AC Repair",
    category: "Appliance Repair",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    description:
      "Quick and reliable air conditioner repair and maintenance services.",
    price: 499,
    city: "Mumbai",
    state: "Maharashtra",
    provider: "Priya Singh",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Salon at Home",
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description:
      "Beauty and grooming services at your doorstep by certified professionals.",
    price: 999,
    city: "Bangalore",
    state: "Karnataka",
    provider: "Rohit Verma",
    rating: 4.8,
  },
  {
    id: 4,
    title: "Plumbing",
    category: "Home Repair",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    description:
      "Expert plumbing solutions for leaks, blockages, and installations.",
    price: 399,
    city: "Chennai",
    state: "Tamil Nadu",
    provider: "Suresh Kumar",
    rating: 4.6,
  },
  {
    id: 5,
    title: "Electrician",
    category: "Home Repair",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    description:
      "Certified electricians for all your electrical repair and installation needs.",
    price: 299,
    city: "Kolkata",
    state: "West Bengal",
    provider: "Anjali Das",
    rating: 4.5,
  },
  {
    id: 6,
    title: "Carpet Cleaning",
    category: "Cleaning",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    description:
      "Deep cleaning for carpets and rugs using eco-friendly products.",
    price: 599,
    city: "Pune",
    state: "Maharashtra",
    provider: "Vikas Patil",
    rating: 4.4,
  },
  {
    id: 7,
    title: "Refrigerator Repair",
    category: "Appliance Repair",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    description: "Expert repair for all refrigerator brands and models.",
    price: 699,
    city: "Hyderabad",
    state: "Telangana",
    provider: "Sunil Rao",
    rating: 4.3,
  },
];

const getStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  return (
    <span className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      ))}
      {halfStar && (
        <svg
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="white" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"
          />
        </svg>
      )}
      <span className="ml-1 text-gray-500 text-sm">{rating.toFixed(1)}</span>
    </span>
  );
};

const AllServices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);
  console.log(services);

  useEffect(() => {
    dispatch(getAllServices());
  }, []);

  const [formData, setFormData] = useState({
    state: "",
    city: "",
    category: "",
    title: "",
  });

  const [cities, setCities] = useState([]);
  const [titles, setTitles] = useState([]);

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
    <>
      <div className=" my-20 md:my-30 px-6 md:px-16 lg:px-24 xl:px-32">
        <div>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="md:text-2xl">
              <GoDotFill />
            </span>
            <p className="text-3xl lg:text-5xl ">Categories</p>
          </div>

          <div
            id="categories"
            className="mt-10 flex gap-5 lg:gap-10 flex-wrap items-center"
          >
            {serviceCategoriesImg.map((cat, index) => (
              <Link
                to={`/services-cat/${cat.name}`}
                onClick={() => window.scrollTo(0, 0)}
                key={index}
              >
                <div className="flex flex-col items-center">
                  <img
                    className="h-30 w-30 object-cover rounded-4xl"
                    src={cat.image}
                    alt={cat.name}
                  />
                  <p className="font-medium text-neutral-800">{cat.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-30">
          <div className="flex items-center gap-2 md:gap-4">
            <span className="md:text-2xl">
              <GoDotFill />
            </span>
            <p className="text-3xl lg:text-5xl ">All Services</p>
          </div>

          <div className="sm:flex gap-5 mt-5">
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
                <label
                  htmlFor="city"
                  className="block font-medium text-gray-700"
                >
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

            <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
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
          </div>

          <div>
            <ServiceList data={services} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllServices;
