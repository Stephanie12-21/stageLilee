import React from "react";
import Image from "next/image";

const Loisir = () => {
  return (
    <div className="flex justify-between items-center  mx-auto pt-16 ">
      <div className="container px-4 md:px-8 flex gap-20">
        <div className="flex flex-col pt-14 max-md:pt-0 gap-9 text-start">
          <h1 className="text-4xl text-[#15213D] font-poppins font-semibold">
            Vous peinez à trouver des loisirs <br /> et des activités pour vos
            vacances ?
          </h1>
          <p className="text-[#263056]">
            Ne vous inquiétez pas ! <br /> Découvrez ici une variété
            d&apos;activités amusantes.
          </p>
        </div>
        <div className="relative flex-1 items-center max-md:hidden">
          <Image
            src="/hero-carrousel/photo(2).svg"
            width={300}
            height={400}
            alt="image"
            className="lg:min-w-[200px] md:min-w-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Loisir;
