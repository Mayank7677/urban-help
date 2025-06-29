import React from "react";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CgSmartphone } from "react-icons/cg";
import { BiUser } from "react-icons/bi";
import { LuUsersRound } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import { PiCityThin } from "react-icons/pi";

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

const MyServices = () => {
  return (
    <div className="px-2 sm:px-5 pb-10">
      <div className="flex items-center gap-2 text-neutral-700">
        <span className="md:text-2xl">
          <GoDotFill />
        </span>
        <p className="text-3xl md:text-4xl">My Services</p>
      </div>

      <div className="mt-5">
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger className="text-md" value="active">
              Active
            </TabsTrigger>
            <TabsTrigger className="text-md" value="inactive">
              Inactive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="mt-3 w-full ">
              <div className="hidden md:grid md:grid-cols-[3fr_2fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3 ">
                <div className="">Service Details</div>
                <div className="">Location</div>
                <div className="">Personal Details</div>
                <div className="pl-[3%]">Manage</div>
              </div>

              <div className="grid grid-cols-1 max-md:gap-5 md:grid-cols-[3fr_2fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t ">
                <div className="flex flex-col md:flex-row ">
                  <img
                    className="min-md:w-44 rounded-2xl shadow object-cover"
                    src="https://res.cloudinary.com/dqfhn7rw3/image/upload/v1749667393/hotel_rooms/vxkic8mu89gqidzxl6qw.jpg"
                    alt=""
                  />
                  <div className="flex flex-col gap-1 max-md:mt-3 min-md:ml-4">
                    <div>
                      <p className="text-xl  tracking-tight">Cleaning ,</p>
                      <p className="text-xl  tracking-tight">Home Cleaning</p>
                    </div>

                    <div className="flex items-center mb-2">
                      <span className="text-lg font-bold text-indigo-600 mr-2">
                        ₹599
                      </span>
                      <span className="text-gray-400 text-sm">/ service</span>
                    </div>
                    {getStars(4.7)}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 max-md:mt-3 mt-5">
                  <div class="flex items-center gap-2 text-xl text-gray-700  ">
                    <GoLocation className={` text-xl text-black} `} />
                    <span
                      className={`text-gray-700
                    }`}
                    >
                      Rajasthan,
                    </span>
                  </div>
                  <div class="flex items-center gap-2 text-xl text-gray-700  ">
                    <PiCityThin
                      className={`  text-black
                    } `}
                    />
                    <span
                      className={`text-gray-700
                    }`}
                    >
                      Jaipur
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 max-md:mt-3 mt-5">
                  <div class="flex items-center gap-1  text-gray-700 tracking-tight ">
                    <BiUser
                      className={` text-lg text-black
                    } `}
                    />
                    <span
                      className={`
                      text-gray-700
                    }`}
                    >
                      Name: asdfghj
                    </span>
                  </div>
                  <div class="flex items-center gap-1  text-gray-700 tracking-tight ">
                    <HiOutlineMail
                      className={` text-lg text-black
                    } `}
                    />
                    <span
                      className={`text-gray-700
                    }`}
                    >
                      Email: abc@gmail.com
                    </span>
                  </div>
                  <div class="flex items-center gap-1  text-gray-700 tracking-tight ">
                    <CgSmartphone
                      className={` text-lg text-black
                    } `}
                    />
                    <span className={`text-gray-700                    }`}>
                      Phone: 12345678
                    </span>
                  </div>
                </div>

                <div className="flex flex-col w-fit md:items-center">
                  <>
                    <Link>
                      <button class="px-4 py-1.5 mt-4 text-xs border border-yellow-400 text-yellow-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer font-serif">
                        Edit
                      </button>
                    </Link>
                    <button class="px-4 py-1.5 mt-4 text-xs border border-blue-500 text-blue-500 rounded-full hover:bg-gray-50 transition-all cursor-pointer font-serif">
                      Inactive
                    </button>
                    <button class="px-4 py-1.5 mt-4 text-xs border border-red-500 text-red-500 rounded-full hover:bg-gray-50 transition-all cursor-pointer font-serif">
                      Delete
                    </button>
                  </>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inactive">
            <div className="mt-3 w-full ">
              <div className="hidden md:grid md:grid-cols-[3fr_2fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3 ">
                <div className="">Service Details</div>
                <div className="">Location</div>
                <div className="">Personal Details</div>
                <div className="pl-[3%]">Manage</div>
              </div>

              <div className="grid grid-cols-1 max-md:gap-5 md:grid-cols-[3fr_2fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t ">
                <div className="flex flex-col md:flex-row ">
                  <img
                    className="min-md:w-44 rounded-2xl shadow object-cover"
                    src="https://res.cloudinary.com/dqfhn7rw3/image/upload/v1749667393/hotel_rooms/vxkic8mu89gqidzxl6qw.jpg"
                    alt=""
                  />
                  <div className="flex flex-col gap-1 max-md:mt-3 min-md:ml-4">
                    <div>
                      <p className="text-xl  tracking-tight">Cleaning ,</p>
                      <p className="text-xl  tracking-tight">Home Cleaning</p>
                    </div>

                    <div className="flex items-center mb-2">
                      <span className="text-lg font-bold text-indigo-600 mr-2">
                        ₹599
                      </span>
                      <span className="text-gray-400 text-sm">/ service</span>
                    </div>
                    {getStars(4.7)}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 max-md:mt-3 mt-5">
                  <div class="flex items-center gap-2 text-xl text-gray-700  ">
                    <GoLocation className={` text-xl text-black} `} />
                    <span
                      className={`text-gray-700
                    }`}
                    >
                      Rajasthan,
                    </span>
                  </div>
                  <div class="flex items-center gap-2 text-xl text-gray-700  ">
                    <PiCityThin
                      className={`  text-black
                    } `}
                    />
                    <span
                      className={`text-gray-700
                    }`}
                    >
                      Jaipur
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 max-md:mt-3 mt-5">
                  <div class="flex items-center gap-1  text-gray-700 tracking-tight ">
                    <BiUser
                      className={` text-lg text-black
                    } `}
                    />
                    <span
                      className={`
                      text-gray-700
                    }`}
                    >
                      Name: asdfghj
                    </span>
                  </div>
                  <div class="flex items-center gap-1  text-gray-700 tracking-tight ">
                    <HiOutlineMail
                      className={` text-lg text-black
                    } `}
                    />
                    <span
                      className={`text-gray-700
                    }`}
                    >
                      Email: abc@gmail.com
                    </span>
                  </div>
                  <div class="flex items-center gap-1  text-gray-700 tracking-tight ">
                    <CgSmartphone
                      className={` text-lg text-black
                    } `}
                    />
                    <span className={`text-gray-700                    }`}>
                      Phone: 12345678
                    </span>
                  </div>
                </div>

                <div className="flex flex-col w-fit md:items-center">
                  <>
                    <Link>
                      <button class="px-4 py-1.5 mt-4 text-xs border border-yellow-400 text-yellow-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer font-serif">
                        Edit
                      </button>
                    </Link>
                    <button class="px-4 py-1.5 mt-4 text-xs border border-blue-500 text-blue-500 rounded-full hover:bg-gray-50 transition-all cursor-pointer font-serif">
                      Inactive
                    </button>
                    <button class="px-4 py-1.5 mt-4 text-xs border border-red-500 text-red-500 rounded-full hover:bg-gray-50 transition-all cursor-pointer font-serif">
                      Delete
                    </button>
                  </>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyServices;
