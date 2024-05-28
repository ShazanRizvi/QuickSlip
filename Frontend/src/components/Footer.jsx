import React from 'react'

const Footer = () => {
  return (
     <footer class="fixed bottom-0 left-0 z-20 p-4 flex justify-between h-14 w-full px-5 py-1 items-center space-x-1 rounded-md   text-white bg-gradient-to-r from-blue-600 to-blue-800 shadow-sm dark:bg-blue-600 dark:text-zinc-50">
     <span class="text-sm text-white sm:text-center dark:text-gray-100">© 2024 <a href="https://quickslip.com/" class="hover:underline">QuickSlip</a>. All Rights Reserved.
     </span>
     <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-100 dark:text-gray-100 sm:mt-0">
         <li>
             <a href="#" class="hover:underline me-4 md:me-6">About</a>
         </li>
         <li>
             <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
         </li>
         <li>
             <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
         </li>
         <li>
             <a href="#" class="hover:underline">Contact</a>
         </li>
     </ul>
 </footer>
  )
}

export default Footer
