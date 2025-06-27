import React from "react";
import { GoDotFill } from "react-icons/go";
import ServiceList from "../components/ServiceList";

const HomePage = () => {
  return (
    <div>
      <section className="h-[90vh] bg-[#89e219] flex flex-col items-start justify-center  px-6 md:px-16 lg:px-24 xl:px-32 text-white">
        <p className="bg-white/50 text-green-800 font-medium px-3.5 py-1 mt-30 rounded-full ">
          On-Demand Local Services
        </p>
        <h1 className="text-2xl md:text-5xl md:text-[56px] md:leading-[56px] max-w-xl mt-4 font-medium">
          Find Trusted Experts for Every Need, Right in Your City.
        </h1>
        <p className="max-w-130 mt-4 text-sm md:text-base border-t pt-3 border-neutral-200">
          From home repairs to personal care, explore top-rated professionals
          near you. Book with ease and confidence—all in one platform.
        </p>
      </section>

      <section className="min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 py-10  mt-10 lg:mt-">
        <div className="flex flex-col md:flex-row justify-center gap-7">
          <div className="border  px-5 py-7 rounded-4xl border-neutral-300 flex flex-col gap-2 h-fit ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <path
                  d="M24.5324 33.9319C33.4084 33.9319 40.6038 26.7365 40.6038 17.8605C40.6038 8.98449 33.4084 1.78906 24.5324 1.78906C15.6564 1.78906 8.46094 8.98449 8.46094 17.8605C8.46094 26.7365 15.6564 33.9319 24.5324 33.9319Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M24.5335 25.0045C28.4784 25.0045 31.6763 21.8065 31.6763 17.8616C31.6763 13.9167 28.4784 10.7188 24.5335 10.7188C20.5886 10.7188 17.3906 13.9167 17.3906 17.8616C17.3906 21.8065 20.5886 25.0045 24.5335 25.0045Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M21.4291 33.6496L18.2862 46.8638C18.224 47.115 18.1091 47.35 17.949 47.5532C17.7888 47.7564 17.5873 47.9232 17.3577 48.0424C17.1153 48.1476 16.854 48.2019 16.5898 48.2019C16.3256 48.2019 16.0643 48.1476 15.822 48.0424L3.96482 42.8638C3.71611 42.7463 3.49726 42.5739 3.32471 42.3596C3.15216 42.1453 3.03038 41.8948 2.96852 41.6267C2.90666 41.3587 2.90632 41.0801 2.96754 40.8119C3.02875 40.5437 3.14993 40.2928 3.32196 40.0781L12.5005 28.5781"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M28.5703 33.4699L31.7846 46.8627C31.8485 47.1181 31.9681 47.3562 32.1348 47.5599C32.3015 47.7637 32.5112 47.9281 32.7489 48.0413C32.9846 48.1478 33.2402 48.2029 33.4989 48.2029C33.7575 48.2029 34.0132 48.1478 34.2489 48.0413L46.0346 42.8627C46.2871 42.7466 46.5089 42.5731 46.6825 42.3561C46.8561 42.139 46.9767 41.8845 47.0346 41.6127C47.1023 41.3468 47.1052 41.0686 47.0431 40.8014C46.9809 40.5341 46.8555 40.2857 46.6775 40.077L37.106 27.8984"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>

            <p>5+ Years of Experience</p>
            <p className="text-neutral-600">
              Trusted service experts with 5+ years of experience.
            </p>
          </div>

          <div className="border  px-5 py-7 rounded-4xl border-neutral-300 flex flex-col gap-2 h-fit ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <path
                  d="M8.92801 26.7857H12.4994C13.4466 26.7857 14.3551 27.162 15.0248 27.8318C15.6946 28.5015 16.0709 29.4099 16.0709 30.3571V44.6429C16.0709 45.5901 15.6946 46.4985 15.0248 47.1682C14.3551 47.838 13.4466 48.2143 12.4994 48.2143H5.35659C4.40938 48.2143 3.50098 47.838 2.8312 47.1682C2.16143 46.4985 1.78516 45.5901 1.78516 44.6429V25C1.78516 18.8432 4.23094 12.9385 8.58446 8.58501C12.938 4.23149 18.8426 1.78571 24.9994 1.78571C31.1563 1.78571 37.0609 4.23149 41.4144 8.58501C45.7679 12.9385 48.2137 18.8432 48.2137 25V44.6429C48.2137 45.5901 47.8375 46.4985 47.1677 47.1682C46.4979 47.838 45.5895 48.2143 44.6423 48.2143H37.4994C36.5522 48.2143 35.6438 47.838 34.9741 47.1682C34.3043 46.4985 33.928 45.5901 33.928 44.6429V30.3571C33.928 29.4099 34.3043 28.5015 34.9741 27.8318C35.6438 27.162 36.5522 26.7857 37.4994 26.7857H41.0709"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>

            <p>24/7 Our Support</p>
            <p className="text-neutral-600">
              Round-the-clock support for all your urgent repair needs.
            </p>
          </div>

          <div className="border  px-5 py-7 rounded-4xl border-neutral-300 flex flex-col gap-2 h-fit ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <path
                  d="M19.6423 3.57141H1.78516V21.4286H19.6423V3.57141Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M47.32 48.2142H29.4629"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M29.4629 30.3572H47.32"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M29.4629 39.2857H47.32"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M48.2132 21.4286H28.5703L38.3917 1.78571L48.2132 21.4286Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M10.7137 48.2143C15.6448 48.2143 19.6423 44.2168 19.6423 39.2857C19.6423 34.3546 15.6448 30.3571 10.7137 30.3571C5.78261 30.3571 1.78516 34.3546 1.78516 39.2857C1.78516 44.2168 5.78261 48.2143 10.7137 48.2143Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>

            <p>Providing Awesome Service </p>
            <p className="text-neutral-600 ">
              Skilled professionals dedicated to delivering quality.
            </p>
          </div>
        </div>

        <div className="mt-20 lg:mt-25">
          <div className="flex items-center gap-2 md:gap-4 text-neutral-800">
            <span className="md:text-2xl">
              <GoDotFill />
            </span>
            <p className="text-3xl lg:text-5xl ">
              Home services at your doorstep
            </p>
          </div>

          <div className="mt-10 flex gap-5 lg:gap-10 flex-wrap items-center ">
            <div className="flex flex-col items-center">
              <img
                className="h-30 w-30 object-cover rounded-4xl"
                src="https://plus.unsplash.com/premium_photo-1684407616442-87bf0d69e8b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xlYW5pbmd8ZW58MHx8MHx8fDA%3D"
                alt=""
              />
              <p className="font-medium text-neutral-800">Cleaning</p>
            </div>

            <div className="flex flex-col items-center">
              <img
                className="h-30 w-30 object-cover rounded-4xl"
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGVsZWN0cmljaWFufGVufDB8fDB8fHww"
                alt=""
              />
              <p className="font-medium text-neutral-800">Electical</p>
            </div>

            <div className="flex flex-col items-center">
              <img
                className="h-30 w-30 object-cover rounded-4xl"
                src="https://plus.unsplash.com/premium_photo-1663045239492-f1289d9440f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fEhvbWUlMjBTZXJ2aWNlc3xlbnwwfHwwfHx8MA%3D%3D"
                alt=""
              />
              <p className="font-medium text-neutral-800">Home Services</p>
            </div>

            <div className="flex flex-col items-center">
              <img
                className="h-30 w-30 object-cover rounded-4xl"
                src="https://plus.unsplash.com/premium_photo-1664301132849-f52af765df79?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fFBsdW1iaW5nfGVufDB8fDB8fHww"
                alt=""
              />
              <p className="font-medium text-neutral-800">Plumbing</p>
            </div>

            <div className="flex flex-col items-center">
              <img
                className="h-30 w-30 object-cover rounded-4xl"
                src="https://plus.unsplash.com/premium_photo-1661342406124-740ae7a0dd0e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8QXBwbGlhbmNlcyUyMHJlcGFpcnxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
              />
              <p className="font-medium text-neutral-800">Appliances</p>
            </div>

            <div className="flex flex-col items-center">
              <img
                className="h-30 w-30 object-cover rounded-4xl"
                src="https://images.unsplash.com/photo-1625047509252-ab38fb5c7343?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QXV0b21vYmlsZSUyMHJlcGFpcnxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
              />
              <p className="font-medium text-neutral-800">Automobile</p>
            </div>

            <div className="flex flex-col items-center">
              <img
                className="h-30 w-30 object-cover rounded-4xl"
                src="https://media.istockphoto.com/id/1452726459/photo/worker-hand-in-glove-holds-diagonal-pliers-on-a-yellow-background-idea-for-building-or.webp?a=1&b=1&s=612x612&w=0&k=20&c=0NrRPDk737XWRZ6FSXk_nTqGrf1KNkil1oj2TzgrntQ="
                alt=""
              />
              <p className="font-medium text-neutral-800">Mechanic</p>
            </div>

            <div className="flex flex-col items-center">
              <img
                className="h-30 w-30 object-cover rounded-4xl"
                src="https://plus.unsplash.com/premium_photo-1661956464824-8740e013d924?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VHV0b3Jpbmd8ZW58MHx8MHx8fDA%3D"
                alt=""
              />
              <p className="font-medium text-neutral-800">Tutoring</p>
            </div>
          </div>
        </div>

        <div className="mt-20 lg:mt-25">
          <div className="flex items-center gap-2 md:gap-4 text-neutral-800">
            <span className="md:text-2xl">
              <GoDotFill />
            </span>
            <p className="text-3xl lg:text-5xl ">Our Services</p>
          </div>
          <ServiceList />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
