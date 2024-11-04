import React from "react";
import Image from "next/image";

const Materiel = () => {
  return (
    <div className="flex justify-between items-center  mx-auto pt-16 ">
      <div className="flex flex-row space-x-20">
        <div className="flex flex-col pt-14 space-y-9">
          <h1 className="text-4xl text-[#15213D] font-poppins font-semibold">
            Trouvez des équipements <br /> parfaitement
            adaptés <br /> à vos besoins et votre situation.
          </h1>
          <p className="text-[#263056]">
             Découvrez ici toutes les pépites dont vous
            avez besoin.
          </p>
        </div>
        <div className="relative flex-1 items-center pt-10">
          <Image src="/hero-carrousel/photo(5).svg" width={400} height={500} />
        </div>
      </div>
    </div>
  );
};

export default Materiel;
