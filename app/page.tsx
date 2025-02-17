import ProductCards from '@/components/ProductCards'
import React from 'react'
import { IoMedkit } from 'react-icons/io5'
import Logo from '@/components/logo'

const page = () => {
  return (
    <div className = 'w-full h-screen p-4 bg-blue-6'>
      <div className = 'flex justify-between'>
        <div className = 'flex flex-start mb-5 pt-2 pl-2 underline text-5xl'>
          दव<p className = 'font-bold'>AI</p>
          <Logo/>
        </div>
        <div className = 'align-end'>
          <div className = 'text-end font-bold'>
            Selvaganesh A.
          </div>
          <div>
            <p>JP Nagar 2nd Stage</p>
            <p>Bengaluru - 560078</p>
          </div>
        </div>
      </div>
{/* 
      <div className = 'mt-4 text-2xl font-bold'>
        Welcome, Pharmacist!
      </div> */}

      <ProductCards/>
    </div>
  )
}

export default page