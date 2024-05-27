import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";   

const LoadingSkeleton = () => {
  return (
     <div className="flex flex-col space-y-3">
      <Skeleton className="h-[150px] w-[350px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[350px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
    </div>
  )
}

export default LoadingSkeleton
