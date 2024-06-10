import React from 'react'
import { Button } from './ui/button'
import  hero from '../assets/Hero.svg';
import { NavLink } from 'react-router-dom';

const Hero = () => {
  return (
     <div>
     <section className="bg-white dark:bg-cyan-950 h-screen items-center flex">
     <div className="grid max-w-screen-xl px-0 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
         <div className="mr-auto place-self-center lg:col-span-7">
             <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Welcome to Quickslip</h1>
             <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">The fastest invoice generation tool to help you create professional invoices in minutes</p>
             <NavLink to='/InvoiceGenerator/signup'>
             <Button className='text-lg p-6 rounded-md'>Get Started <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></Button>
             </NavLink>
             
           
         </div>
         <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
             <img className='object-fill' src={hero} alt="mockup"/>
         </div>                
     </div>
 </section>
 </div>
  )
}

export default Hero
