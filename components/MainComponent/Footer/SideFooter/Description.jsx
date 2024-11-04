import Image from 'next/image'
import React from 'react'

const Description = () => {
  return (
    <div className='flex flex-col justify-between w-[456px]'>
      <div className='flex justify-between '>
        <Image src="/assets/Logo_site.svg" width={140} height={50}/>
      </div>

      <div className='flex mt-5'>
        <p className='font-medium  text-white'>Lilee a été crée dans le but de faciliter  les recherches de logements PMR (Personnes à Mobilité Réduite). 
          Logements  qui sont vérifiés et validés par des professionnels de l’aménagement du  Handicap.</p>
      </div>

    
    </div>
  )
}

export default Description
