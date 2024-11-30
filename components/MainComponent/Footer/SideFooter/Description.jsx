import Image from "next/image";
import React from "react";

const Description = () => {
  return (
    <div className="flex flex-col justify-between w-[456px]">
      <div className="flex justify-between ">
        <Image
          src="/assets/Logo_site.svg"
          alt="logo du site Lilee"
          width={140}
          height={50}
        />
      </div>

      <div className="flex mt-5">
        <p className="font-medium  text-white">
          Lilee a été crée dans le but de faciliter les recherches de logements,
          des équipements et autres indipensables de vie pour aider les
          personnes PMR (Personnes à Mobilité Réduite). Lilee offre un espace de
          publication d&apos;annonces qui sont vérifiées et validées par des
          professionnels de l&apos;aménagement du Handicap afin d&apos;aider aux
          mieux les personnes dans leurs recherches.
        </p>
      </div>
    </div>
  );
};

export default Description;
