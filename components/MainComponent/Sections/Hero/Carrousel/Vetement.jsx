import React from "react";
import Image from "next/image";

const Vetement = () => {
  return (
    <div className="flex justify-between items-center  mx-auto pt-16 ">
      <div className="container px-4 md:px-8 flex gap-20">
        <div className="flex flex-col pt-14 max-md:pt-0 gap-9 text-start">
          <h1 className="text-4xl text-[#15213D] font-poppins font-semibold">
            Vous souhaitez acheter des vêtements <br />
            adaptées <br /> à une certaine situation de handicap?
          </h1>
          <p className="text-[#263056]">
            Vous êtes au bon endroit. <br /> Trouvez ici tout ce dont vous aurez
            besoin.
          </p>
        </div>
        <div className="relative flex-1 items-center max-md:hidden">
          <Image
            src="/hero-carrousel/photo(7).svg"
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

export default Vetement;
