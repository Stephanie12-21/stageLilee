import Image from "next/image";

const Logement = () => {
  return (
    <div className="flex justify-between items-center  mx-auto pt-16 ">
      <div className="flex flex-row space-x-20">
        <div className="flex flex-col pt-14 space-y-9">
          <h1 className="text-4xl text-[#15213D] font-poppins font-semibold">
            Vous avez du mal à trouver la maison idéale <br /> pour vos vacances
            ?
          </h1>
          <p className="text-[#263056]">
            Ne cherchez plus ! <br /> Découvrez ici une sélection de biens
            immobiliers parfaitement adaptés à vos besoins.
          </p>
        </div>
        <div className="relative flex-1 items-center">
          <Image src="/hero-carrousel/photo(1).svg" width={300} height={400} />
        </div>
      </div>
    </div>
  );
};

export default Logement;
