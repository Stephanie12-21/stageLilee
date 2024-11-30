import React from "react";
import SideFooter from "./SideFooter/SideFooter";
import MenuFooter from "./MenuFooter/MenuFooter";

const Footer = () => {
  return (
    <div className="bg-[#15213D] flex flex-col items-center h-auto py-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-10 px-6">
        <div className="w-full lg:w-auto mt-5 flex justify-center lg:justify-start">
          <SideFooter />
        </div>

        <div className="w-full lg:w-auto mt-5 flex justify-center lg:justify-end">
          <MenuFooter />
        </div>
      </div>

      <div className="mt-8 py-4 text-center text-[#71717A] text-sm md:text-base">
        © 2024 made by <span className="text-white">Khepri Services</span>
      </div>
    </div>
  );
};

export default Footer;
