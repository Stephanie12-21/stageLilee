import Image from "next/image";

const Emploi = () => {
  return (
    <div className="flex justify-between items-center  mx-auto pt-16 ">
      <div className="flex flex-row space-x-20">
        <div className="flex flex-col pt-14 space-y-9">
          <h1 className="text-4xl text-[#15213D] font-poppins font-semibold">
            Vous souhaitez assister <br /> des personnes à mobilité réduite?
          </h1>
          <p className="text-[#263056]">
            Vous êtes au bon endroit. <br /> Déposez vos annonces ici.
          </p>
        </div>
        <div className="relative flex-1 items-center pt-">
          <Image src="/hero-carrousel/photo(1).svg" width={300} height={300} />
        </div>
      </div>
    </div>
  );
};

export default Emploi;
