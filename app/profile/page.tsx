// import MedicineDemandChart from '@/components/chart'
import Logo from '@/components/logo'
import React from 'react'

const page = () => {
  return (
    <div className = 'p-4'>
      <div className = 'flex justify-between'>
        <div className = 'font-bold text-2xl'>
          Selvaganesh A.
        </div>
        <Logo/>
      </div>
      {/* <MedicineDemandChart/> */}
    </div>
  )
}

export default page