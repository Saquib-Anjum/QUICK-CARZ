import React from "react";
import { assets } from "../assets/assets.js";
const Hero = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-14">
      <h1 className="text-4xl md:text-5xl font-semibold">Luxry cars on rent</h1>
      <form className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8"></div>
      </form>
      <img src={assets.main_car} alt="main Car" className="max-h-74" />
      <div>
        <select name="" id="" required></select>
      </div>
    </div>
  );
};

export default Hero;
