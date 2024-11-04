import Link from 'next/link'
import React from 'react'

const Divers = () => {
  return (
    <div className='flex flex-col justify-between items-start space-y-2'>
        <h1 className='text-bold text-[30px] text-white'>Divers</h1>
        <p className='text-semibold text-[16px] text-white'>Foire à questions</p>
        <Link href="/PAGES/Blog" className='text-semibold text-[16px] text-white hover:underline'>Blog & presse</Link >
        <Link href="/PAGES/Contact" className='text-semibold text-[16px] text-white hover:underline'>Nous contacter</Link >
        <p className='text-semibold text-[16px] text-white'>Politique de confidentialité</p>
        <p className='text-semibold text-[16px] text-white'>Conditions générales</p>
    </div>
  
  )
}

export default Divers