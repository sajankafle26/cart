'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import ProductsByCat from './components/ProductsByCat';

function page() {
  
  return (
    <div>
     <ProductsByCat catName="cloth" catId='68597477427b85bf6543585d'/>
     <ProductsByCat  catName="Watch" catId='685a3329dce69739eef19be2'/>
    </div>
  )
}

export default page
