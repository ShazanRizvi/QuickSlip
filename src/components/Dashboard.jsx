import React from 'react'
import InvoiceCarddashboard from './InvoiceCarddashboard'
import SideBardashboard from './SideBardashboard'


const Dashboard = () => {
  return (
   <div className='pt-4 flex h-screen dark:text-white w-screen gap-3 overflow-hidden'>
    
     <SideBardashboard/>
    
    <div className='p-5 justify-items-center justify-center w-[1200px]'>
    <div>
     <h1 className='text-4xl font-bold'> Your Invoices</h1>
    </div>
    {/* This is card grid */}
    <div className='pt-10 grid grid-cols-3 gap-5 place-content-center'>
    <div>
    <InvoiceCarddashboard/>
    </div>
    <div>
    <InvoiceCarddashboard/>
    </div>
    <div>
    <InvoiceCarddashboard/>
    </div>
    <div>
    <InvoiceCarddashboard/>
    </div>
    <div>
    <InvoiceCarddashboard/>
    </div>
    <div>
    <InvoiceCarddashboard/>
    </div>
    
    
    </div>
    </div>
   </div>
  )
}

export default Dashboard
