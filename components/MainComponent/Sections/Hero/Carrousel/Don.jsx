import React from "react";
import Image from "next/image";

const Don = () => {
  return (
    <div className="flex justify-between items-center  mx-auto pt-16 ">
      <div className="flex flex-row space-x-20">
        <div className="flex flex-col pt-14 space-y-9">
          <h1 className="text-4xl text-[#15213D] font-poppins font-semibold">
            Vous souhaitez apporter votre soutien <br /> à des personnes <br />{" "}
            en situation de handicap ?
          </h1>
          <p className="text-[#263056]">
            Partagez ici vos annonces et faites une différence dans leur
            quotidien.
          </p>
        </div>
        <div className="relative flex-1 items-center pt-10">
          <Image src="/hero-carrousel/photo(6).svg" width={500} height={500} />
        </div>
      </div>
    </div>
  );
};

export default Don;
