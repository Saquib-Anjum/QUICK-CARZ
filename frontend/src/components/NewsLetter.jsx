import React from "react";

const NewsLetter = () => {
  return (
    // <div className="flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10 mb-40">
    //   <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Deal!</h1>
    //   <p className="md:text-lg text-gray-500/70 pb-8">
    //     Subscribe to get the latest offers, new arrivals, and exclusive
    //     discounts
    //   </p>
    //   <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
    //     <input
    //       className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
    //       type="text"
    //       placeholder="Enter your email id"
    //       required
    //     />
    //     <button
    //       type="submit"
    //       className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none"
    //     >
    //       Subscribe
    //     </button>
    //   </form>
    // </div>
    <>
      <div
        className="flex flex-col items-center w-full max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-30 
            relative overflow-hidden text-white"
        style={{
          backgroundImage: `
                    linear-gradient(to right, rgba(236, 72, 153, 0.85), rgba(251, 146, 60, 0.85), rgba(234, 179, 8, 0.85)),
                    url('https://www.transparenttextures.com/patterns/floral.png')
                `,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-[40px] font-bold">Stay Inspired</h1>
          <p className="text-sm md:text-base text-gray-100/90 mt-2 max-w-xl">
            Join our newsletter and be the first to discover new updates,
            exclusive offers, and inspiration.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
          <input
            type="text"
            className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none max-w-66 w-full"
            placeholder="Enter your email"
          />
          <button className="flex items-center justify-center gap-2 group bg-black px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all">
            Subscribe
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </button>
        </div>
        <p className="text-gray-100 mt-6 text-xs text-center">
          By subscribing, you agree to our Privacy Policy and consent to receive
          updates.
        </p>
      </div>
    </>
  );
};

export default NewsLetter;
