import React, { useState, useEffect } from "react";
import { assets, dummyCarData } from "../assets/assets";
import Title from "../components/Title";
import CarCard from "../components/CarCard";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";

const Cars = () => {
  const [input, setInput] = useState("");
  // getting details from params like pickupDate and returnDate
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");
  const { cars, axios, navigate } = useAppContext();
  const isSearchData = pickupLocation && pickupDate && returnDate;

  // use state to filter car
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const applyFilter = () => {
    if (input.trim() === "") {
      setFilteredCars(cars);
      return;
    }

    // Filter cars based on model or features
    const filtered = cars.filter(
      (car) =>
        car.model?.toLowerCase().includes(input.toLowerCase()) ||
        car.brand?.toLowerCase().includes(input.toLowerCase()) ||
        car.category?.some((feature) =>
          feature.toLowerCase().includes(input.toLowerCase())
        ) ||
        car.transmission?.some((feature) =>
          feature.toLowerCase().includes(input.toLowerCase())
        )
    );

    setFilteredCars(filtered);
  };

  const searchCarAvailability = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/bookings/check-Availability", {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        // Fixed typo: availableCars instead of avaiableCars
        setFilteredCars(data.availableCars || []);
        if (data.availableCars?.length === 0) {
          toast("No Car Available");
        }
      } else {
        toast.error("Failed to check availability");
        setFilteredCars([]);
      }
    } catch (error) {
      console.error("Error checking car availability:", error);
      toast.error("Error checking car availability");
      setFilteredCars([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    } else if (cars.length > 0) {
      setFilteredCars(cars);
    }
  }, [pickupLocation, pickupDate, returnDate, cars]);

  useEffect(() => {
    if (cars.length > 0 && !isSearchData) {
      applyFilter();
    }
  }, [input, cars]);

  return (
    <div className="">
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />

        <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by Model or Feature"
            className="w-full h-full outline-none text-gray-500"
          />
          <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 ml-2" />
        </div>
      </div>

      <div className="px-4 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 px-20 max-w-7xl mx-auto">
          {isLoading ? "Loading..." : `Showing ${filteredCars.length} cars`}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-20">
              <div className="text-gray-500">Loading cars...</div>
            </div>
          ) : filteredCars.length > 0 ? (
            filteredCars.map((car, idx) => (
              <div key={car.id || idx}>
                <CarCard car={car} />
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center py-20">
              <div className="text-gray-500">No cars found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;
