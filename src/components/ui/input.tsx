import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onChange, onKeyDown, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex-wrap justify-center gap-x-2 gap-y-2.5 inline-flex flex-row items-start space-x-3 space-y-0",
          className
        )}
				onChange={onChange}
				onKeyDown={onKeyDown}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
