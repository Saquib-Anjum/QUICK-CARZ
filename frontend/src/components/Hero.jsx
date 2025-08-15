import React, { useState } from "react";
import { assets, cityList } from "../assets/assets.js";
import Trusted from "../components/Trusted.jsx";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext.jsx";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");

  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    );
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-14">
      <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
        Want to Rent Luxury Car
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
          {/* select location */}
          <div className="flex flex-col items-start gap-2">
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              required
              className="px-3 py-2 border rounded"
            >
              <option value="">Pickup Location</option>
              {cityList.map((city, idx) => (
                <option key={idx} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {pickupLocation || "Please select location"}
            </p>
          </div>

          {/* select pickup date */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              onChange={(e) => setPickupDate(e.target.value)}
              value={pickupDate}
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500"
              required
            />
          </div>

          {/* select return date */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              onChange={(e) => setReturnDate(e.target.value)}
              value={returnDate}
              type="date"
              id="return-date"
              min={pickupDate || new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500"
              required
            />
          </div>
        </div>

        {/* search button */}
        <button className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dual text-white rounded-full cursor-pointer">
          <img
            src={assets.search_icon}
            alt="search"
            className="brightness-300"
          />
          Search
        </button>
      </form>

      <img src={assets.main_car1} alt="main Car" className="max-h-74" />
    </div>
  );
};

export default Hero;
