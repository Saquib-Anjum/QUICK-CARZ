import React from "react";
import { assets } from "../assets/assets";
const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500">
      {/* "text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32 */}
      <div className="flex flex-wrap justify-between gap-8 pb-6 border-borderColor md:gap-6 items-start">
        <div className="">
          <img src={assets.logo2} alt="logo" className=" h-12 md:h-12" />
          <p className="text-sm max-w-80 mt-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
          </p>
          <div className="flex items-center gap-3 mt-6">
            {/* facebook */}
            <a href="#">
              <img src={assets.facebook_logo} alt="" className="w-5 h-5" />
            </a>
            {/* Instagram */}
            <a href="#">
              <img src={assets.instagram_logo} alt="" className="w-5 h-5" />
            </a>
            {/* tweeter */}
            <a href="#">
              <img src={assets.twitter_logo} alt="" className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-lg text-gray-800 uppercase">Quick Links</h2>
          <ul className="mt-3 flex flex-col gap-1.5 ">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Browse Cars</a>
            </li>
            <li>
              <a href="#">List Your Car</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-lg text-gray-800 uppercase">Resources</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy and Policy</a>
            </li>
            <li>
              <a href="#">Insurance</a>
            </li>
            <li>
              <a href="#">Accessibility</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-lg text-gray-800 uppercase">Contact</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li> QuickCarz </li>
            <li>Delhi India</li>
            <li>122-345-0781</li>
            <li>quickcarz@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr className="border-gray-300 mt-8" />
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>
          © {new Date().getFullYear()}{" "}
          <a href="https://quickcarz.vercel.app">Quick Carz</a>. All rights
          reserved.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">Sitemap</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
