import React from 'react'
import { CgProfile } from "react-icons/cg";

const AccountCard = ({email}) => {
  return (
     <div className="w-auto flex items-center justify-center">
     <div className="rounded-lg p-1 cursor-pointer fixed bottom-4 ">
       <div className="flex gap-3 items-center">
         <div>
           <CgProfile size={30} />
         </div>
         <div>
           <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
             Welcome
           </h1>
           <p className="text-sm font-normal text-gray-500 dark:text-gray-300">
             {email}
           </p>
         </div>
       </div>
     </div>
     </div>
  )
}

export default AccountCard
