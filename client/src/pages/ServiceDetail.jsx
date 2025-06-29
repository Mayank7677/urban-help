import React from "react";
import { CgSmartphone } from "react-icons/cg";
import { GoDotFill, GoLocation } from "react-icons/go";
import { PiCityThin } from "react-icons/pi";
import { useParams } from "react-router-dom";

const ServiceDetail = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="my-25 md:my-30 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex gap-5 md:gap-7 items-center border-b  border-neutral-400 pb-5">
        <div>
          <img
            className="w-25 h-25 md:w-40 md:h-40 object-cover rounded-full"
            src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
        </div>

        <div>
          <p className="text-2xl md:text-4xl tracking-tight">Anuj Rawat</p>

          <div className="flex flex-col">
            <div class="flex items-center gap-2  text-gray-700  ">
              <PiCityThin className={`  text-black} `} />
              <span className={`text-gray-700}`}>Jaipur,</span>
            </div>
            <div class="flex items-center gap-2 text-gray-700  ">
              <GoLocation className={` text-black} `} />
              <span className={`text-gray-700}`}>Rajasthan</span>
            </div>
          </div>

          <div class="flex items-center gap-1  text-gray-700 tracking-tight ">
            <CgSmartphone className={` text-lg text-black} `} />
            <span className={`text-gray-700}`}> 12345678</span>
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-10 flex flex-col gap-8">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="md:text-2xl">
            <GoDotFill />
          </span>
          <p className="text-3xl lg:text-4xl ">Home Cleaning</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <img
            className="rounded-3xl md:w-80 md:h-60 object-cover"
            src="https://images.unsplash.com/photo-1686178827149-6d55c72d81df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGNsZWFuaW5nfGVufDB8fDB8fHww"
            alt=""
          />
          <img
            className="rounded-3xl md:w-80 md:h-60 object-cover"
            src="https://images.unsplash.com/photo-1686178827149-6d55c72d81df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGNsZWFuaW5nfGVufDB8fDB8fHww"
            alt=""
          />
          <img
            className="rounded-3xl md:w-80 md:h-60 object-cover"
            src="https://images.unsplash.com/photo-1686178827149-6d55c72d81df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGNsZWFuaW5nfGVufDB8fDB8fHww"
            alt=""
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-3xl ">Description :</p>
          <p className="text-neutral-800 lg:w-[80%]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perferendis vero fugiat laborum eius voluptatem ab ducimus sit natus
            voluptas dolor cupiditate eum velit consectetur nisi officia, minus
            laudantium ipsa in est magnam, excepturi voluptates aperiam placeat
            ullam! Culpa, ipsam veniam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
