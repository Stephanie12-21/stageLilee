import React from 'react'
import Rubriques from './Rubriques';
import Divers from './Divers';

const MenuFooter = () => {
  return (
    <div className='flex items-start gap-x-36 mt-8'>
      <Rubriques/>
      <Divers/>
    </div>
  );
};

export default MenuFooter