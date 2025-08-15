import React, { useState, useEffect } from "react";
import Title from "../../components/owner/TitleOwner";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
const AddCar = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { axios } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return null;
      setIsLoading(true);
    }
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));

      // Fix: Correct the API endpoint URL
      const { data } = await axios.post("/api/owner/add-car", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCar({
          brand: "",
          model: "",
          year: 0,
          pricePerDay: 0,
          category: "",
          transmission: "",
          fuel_type: "", // Fixed typo here too
          seating_capacity: 0,
          location: "",
          description: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(
        err.response?.data?.message || err.message || "Failed to add car"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications"
      />
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* car image upload */}
        <div className="">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              className=""
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </div>
        {/* car brand and model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Brand</label>
            <input
              type="text"
              placeholder="e.g BMW, Mercedese, Audi..."
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md
              outline-none"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Model</label>
            <input
              type="text"
              placeholder="e.g X5, E-Class, M4..."
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md
              outline-none"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>
        {/* car year price category */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {/* 1st */}
          <div className="flex flex-col w-full">
            <label>Year</label>
            <input
              type="Number"
              placeholder="e.g 2020, 2025..."
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md
              outline-none"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>
          {/* 2nd */}
          <div className="flex flex-col w-full">
            <label>{`Daily Price d(${currency})`}</label>
            <input
              type="Number"
              placeholder="e.g 12000"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md
              outline-none"
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          {/* 3rd */}
          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className="px-3 py-2 mt-1 border border-r-borderColor rounded-md outline-none"
            >
              <option value="">Select a Category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>
        {/* car trnsmission fuel type capacity */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {/* 1st */}
          <div className="flex flex-col w-full">
            <label>Transmission</label>
            <select
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              className="px-3 py-2 mt-1 border border-r-borderColor rounded-md outline-none"
            >
              <option value="">Select a Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Menual">Menual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          {/* 2nd */}
          <div className="flex flex-col w-full">
            <label>Fuel Type</label>
            <select
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              value={car.fuel_type}
              required
              className="px-3 py-2 mt-1 border border-r-borderColor rounded-md outline-none"
            >
              <option value="">Select Feul Type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          {/* 3rd */}
          <div className="flex flex-col w-full">
            <label>Seating Capacity</label>
            <input
              type="Number"
              placeholder="4"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md
              outline-none"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>
        {/* location */}
        <div className="flex flex-col w-full">
          <label>Location📌 </label>
          <select
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            value={car.location}
            required
            className="px-3 py-2 mt-1 border border-r-borderColor rounded-md outline-none"
          >
            <option value="">Select Location</option>
            <option value="Gas">Delhi/NCR</option>
            <option value="Diesel">Hydrabad</option>
            <option value="Petrol">Kolkata</option>
            <option value="Electric">Channai</option>
            <option value="Hybrid">Mumbai</option>
            <option value="Hybrid">Banglore</option>
          </select>
        </div>

        {/* descreption */}
        <div className="flex flex-col w-full">
          <label>Description </label>
          <textarea
            placeholder
            name="e.g. A luxury SUV with a spacious interior and a powerful engine"
            id=""
            required
            className="px-3 py-2 mt-1 border border-r-borderColor rounded-md outline-none"
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
            rows={5}
          ></textarea>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor pointer">
          <img src={assets.tick_icon} alt="" />
          {isLoading ? "Listing🚗🚗🚗🚗🚗🚗🚗🚗🚗" : "  List Your Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
