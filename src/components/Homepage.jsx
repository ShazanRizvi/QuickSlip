import React from 'react'
import InvoicePreview from './InvoicePreview'
import InvoiceEditor from './InvoiceEditor'

const Homepage = () => {
  return (
    <div className='flex gap-4 justify-center mx-6'>
    <div className=' w-1/2 '>
    <InvoicePreview />
    </div>
    <div className=' w-1/2 '>
      <InvoiceEditor/>
    </div>
     
    </div>
  )
}

export default Homepage
