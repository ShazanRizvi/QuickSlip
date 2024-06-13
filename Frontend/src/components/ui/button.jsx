import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-blue-300",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow hover:bg-blue-900 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-800",
          delete:
          " text-red-600 hover:text-red-800  dark:text-red-600 dark:hover:text-red-800",
        destructive:
          "bg-red-500 text-blue-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-white dark:hover:bg-red-900/90",
        outline:
          "border dark:bg-transparent text-blue-700 font-semibold border-blue-600 dark:border-blue-600 shadow-sm hover:bg-blue-600 hover:text-white dark:text-blue-600",
        secondary:
          "bg-blue-100 text-blue-600 text-sm font-bold shadow-sm hover:bg-blue-100/50 dark:bg-blue-950/50 dark:text-blue-600 dark:hover:bg-blue-800/80 dark:hover:text-white",
        ghost: "hover:bg-blue-100 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-50",
        link: "text-blue-600 underline-offset-4 hover:underline dark:text-blue-500 dark:hover:text-blue-400",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
