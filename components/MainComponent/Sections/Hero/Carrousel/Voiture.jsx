import React from "react";
import Image from "next/image";

const Voiture = () => {
  return (
    <div className="flex justify-between items-center  mx-auto pt-16 ">
      <div className="flex flex-row space-x-20">
        <div className="flex flex-col pt-14 space-y-9">
          <h1 className="text-4xl text-[#15213D] font-poppins font-semibold">
            Vous vous faites du souci à trouver
            <br /> la voiture idéale pour vos déplacements?
          </h1>
          <p className="text-[#263056]">
            Trouvez ici toute une large gamme de voitures répondant à vos
            critères
            <br />
          </p>
        </div>
        <div className="relative flex-1 items-center pt-7">
          <Image src="/hero-carrousel/photo(4).svg" width={400} height={500} />
        </div>
      </div>
    </div>
  );
};

export default Voiture;
