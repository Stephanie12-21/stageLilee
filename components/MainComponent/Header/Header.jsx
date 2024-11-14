import React from "react";
import TopHeader from "./TopHeader/TopHeader";
import { Separator } from "@/components/ui/separator";
import NavBar from "./SubHeader/NavBar";
import MobileNavBar from "./SubHeader/MobileNavBar";

const Header = () => {
  return (
    <div className="bg-[#15213D]">
      <TopHeader />
      <Separator />
      <div>
        <div className="h-[88px] ">
          <NavBar />
        </div>
        <MobileNavBar />
      </div>
    </div>
  );
};

export default Header;
