import React from "react";
import Image from "next/image";

const Loisir = () => {
  return (
    <div className="flex justify-between items-center  mx-auto pt-16 ">
      <div className="flex flex-row space-x-20">
        <div className="flex flex-col pt-14 space-y-9">
          <h1 className="text-4xl text-[#15213D] font-poppins font-semibold">
            Vous peinez à trouver des loisirs <br /> et des activités pour vos
            vacances ?
          </h1>
          <p className="text-[#263056]">
            Ne vous inquiétez pas ! <br /> Découvrez ici une variété d'activités
            amusantes.
          </p>
        </div>
        <div className="relative flex-1 items-center pt-10">
          <Image src="/hero-carrousel/photo(2).svg" width={300} height={400} />
        </div>
      </div>
    </div>
  );
};

export default Loisir;
