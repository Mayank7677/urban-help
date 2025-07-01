import { Link } from "react-router-dom";

// Placeholder data
// const services = [
//   {
//     id: 1,
//     title: "Home Cleaning",
//     description:
//       "Professional cleaning for your home, including kitchen, bathrooms, and living areas.",
//     price: 799,
//     city: "Delhi",
//     state: "Delhi",
//     provider: "Amit Sharma",
//     rating: 4.7,
//   },
//   {
//     id: 2,
//     title: "AC Repair",
//     description:
//       "Quick and reliable air conditioner repair and maintenance services.",
//     price: 499,
//     city: "Mumbai",
//     state: "Maharashtra",
//     provider: "Priya Singh",
//     rating: 4.9,
//   },
//   {
//     id: 3,
//     title: "Salon at Home",
//     description:
//       "Beauty and grooming services at your doorstep by certified professionals.",
//     price: 999,
//     city: "Bangalore",
//     state: "Karnataka",
//     provider: "Rohit Verma",
//     rating: 4.8,
//   },
//   {
//     id: 4,
//     title: "Plumbing",
//     description:
//       "Expert plumbing solutions for leaks, blockages, and installations.",
//     price: 399,
//     city: "Chennai",
//     state: "Tamil Nadu",
//     provider: "Suresh Kumar",
//     rating: 4.6,
//   },
//   {
//     id: 5,
//     title: "Electrician",
//     description:
//       "Certified electricians for all your electrical repair and installation needs.",
//     price: 299,
//     city: "Kolkata",
//     state: "West Bengal",
//     provider: "Anjali Das",
//     rating: 4.5,
//   },
//   {
//     id: 6,
//     title: "Carpet Cleaning",
//     description:
//       "Deep cleaning for carpets and rugs using eco-friendly products.",
//     price: 599,
//     city: "Pune",
//     state: "Maharashtra",
//     provider: "Vikas Patil",
//     rating: 4.4,
//   },
// ];

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

const ServiceList = ({ data, loading }) => {
  console.log("data----------------------", data);
  return (
    <div className="mt-10 sm:mt-20">
      {loading ? <p>Loading...</p> : Array.isArray(data) && data.length > 0 ? (
        <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((service) => (
            <Link
              to={`/service-details/${service._id}`}
              onClick={() => window.scrollTo(0, 0)}
              key={service._id}
            >
              <div className="bg-white rounded-2xl cursor-pointer  transition-shadow duration-300 border border-gray-300 p-6 flex flex-col justify-between hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
                <div>
                  <div className="flex gap-2 items-center mb-2">
                    <h3 className="text-xl font-medium text-gray-800 ">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center mb-2">
                    <span className="text-lg font-bold text-indigo-600 mr-2">
                      ₹{service.price}
                    </span>
                    <span className="text-gray-400 text-sm">/ service</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <svg
                      className="w-4 h-4 mr-1 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {service.city}, {service.state}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <svg
                      className="w-4 h-4 mr-1 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {service.provider.name}
                  </div>
                  {getStars(4.3)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No Services Found</p>
      )}
    </div>
  );
};

export default ServiceList;
