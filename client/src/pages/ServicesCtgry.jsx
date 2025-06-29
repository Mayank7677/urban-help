import React from "react";
import ServiceList from "../components/ServiceList";
import { useParams } from "react-router-dom";

const ServicesCtgry = () => {
  const { category } = useParams();
  console.log(category);
  return (
    <div className="my-20 md:my-30 px-6 md:px-16 lg:px-24 xl:px-32">
      <ServiceList />
    </div>
  );
};

export default ServicesCtgry;
