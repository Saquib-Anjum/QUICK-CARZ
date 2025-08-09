import React from "react";
import Title from "../components/Title";
import { dummyCarData, assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useNavigate } from "react-router-dom";
const FeaturedSection = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center py-24 px-6 md:px-16 lg-px-24 xl:px-32">
      <div>
        <div class=" mt-5 mb-5 w-full flex items-center justify-center space-x-2 max-w-lg py-2.5 rounded-lg font-medium text-sm text-white text-center bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
          <p>
            Get 20% OFF on Your First Booking!{" "}
            <span class="underline"> Get your Car Now! </span>
          </p>
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for you nextt adventure."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {dummyCarData.slice(0, 6).map((car, idx) => (
          <div key={car._id}>
            <CarCard car={car} />
          </div>
        ))}
      </div>
      <button
        className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pinter"
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
      >
        Explores all car
        <img className="h-" src={assets.arrow_icon} alt="" />
      </button>
    </div>
  );
};

export default FeaturedSection;
