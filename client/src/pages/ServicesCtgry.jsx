import React from "react";
import ServiceList from "../components/ServiceList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearServicesByCategory, getServiceByCategory } from "../features/service/serviceSlice";
import { useEffect } from "react";

const ServicesCtgry = () => {
  const { category } = useParams();
  console.log(category);

  const dispatch = useDispatch();
  const { servicesByCategory, loading, error, currentCategory } = useSelector(
    (state) => state.service
  );

  useEffect(() => {
    // Clear previous category data immediately
    dispatch(clearServicesByCategory());

    // Then fetch new category data
    if (category) {
      dispatch(getServiceByCategory(category));
    }
  }, [category, dispatch]);

  // ✅ Show loading while data is fetching
  if (loading) {
    return <p className="text-center h-screen">Loading...</p>;
  }

  // ✅ Show message if API returned no data or 404
  if (!loading && error && servicesByCategory.length === 0) {
    return (
      <p className="text-red-600 h-screen text-center mt-40 text-lg">
        Currently no services available for "{category}" category.  
      </p>
    );
  }
  return (
    <div className="my-20 md:my-30 px-6 md:px-16 lg:px-24 xl:px-32">
      <ServiceList data={servicesByCategory} />
    </div>
  );
};

export default ServicesCtgry;
