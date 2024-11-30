import React from "react";
import Rubriques from "./Rubriques";
import Divers from "./Divers";
import { ListIcons } from "../../Header/TopHeader/TopHeader";

const MenuFooter = () => {
  return (
    <div className="flex flex-col items-center mt-8 w-full">
      <div className="flex gap-x-52 pr-10">
        <Rubriques />
        <Divers />
      </div>

      <div className="flex items-center justify-center mt-10 w-full">
        <ListIcons />
      </div>
    </div>
  );
};

export default MenuFooter;
