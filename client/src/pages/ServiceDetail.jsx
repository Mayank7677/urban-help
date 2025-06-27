import React from "react";
import { useParams, useNavigate } from "react-router-dom";

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
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
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
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      ))}
      {halfStar && (
        <svg
          className="w-5 h-5 text-yellow-400"
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
      <span className="ml-2 text-gray-500 text-base">{rating.toFixed(1)}</span>
    </span>
  );
};

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = allServices.find((s) => s.id === Number(id));

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-indigo-600 hover:underline font-semibold"
        >
          &larr; Back
        </button>
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {service.title}
        </h1>
        <div className="flex items-center mb-4">{getStars(service.rating)}</div>
        <p className="text-gray-700 mb-4 text-lg">{service.description}</p>
        <div className="flex flex-wrap gap-4 mb-4">
          <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold">
            ₹{service.price}
          </span>
          <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold">
            {service.city}, {service.state}
          </span>
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            Provider: {service.provider}
          </span>
        </div>
        <button className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow transition-colors duration-200 text-lg">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceDetail;
