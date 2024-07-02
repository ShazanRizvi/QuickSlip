import * as React from "react"
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const inputType = type === "password" && showPassword ? "text" : type === "number" ? "number" : type;
  return (
    (<div className="relative">
      <input
      type={inputType}
      className={cn(
        "flex h-9 w-full rounded-md border border-neutral-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:placeholder:text-slate-300 dark:focus-visible:ring-neutral-300 dark:text-white",
        className
      )}
      ref={ref}
      {...props} />
        {type === "password" && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={handleTogglePassword}
        >
          {showPassword ? (
            <LuEye className="h-5 w-5 text-gray-400" />
          ) : (
            <LuEyeOff className="h-5 w-5 text-gray-400" />
          )}
        </button>
      )}
    </div>
    )
  );
})
Input.displayName = "Input"

export { Input }
