import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
 
import { cn } from "@/lib/utils"
 
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, title, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={'select-none cursor-pointer rounded-[100px] border border-transparent px-6 text-black transition-colors duration-200 ease-in-out'}
    {...props}
  >
		{title}

    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName
 
export { Checkbox }
