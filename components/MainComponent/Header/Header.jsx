import React from "react";
import TopHeader from "./TopHeader/TopHeader";
import { Separator } from "@/components/ui/separator";
import NavBar from "./SubHeader/NavBar";
import MobileNavBar from "./SubHeader/MobileNavBar";

const Header = () => {
  return (
    <div className="bg-[#15213D] ">
      <div className="h-[56px] block max-md:hidden">
        <TopHeader />
      </div>
      <Separator />
      <div>
        <div className="h-[88px] ">
          <NavBar />
        </div>
        <div className="xl:hidden">
          <MobileNavBar />
        </div>
      </div>
    </div>
  );
};

export default Header;
