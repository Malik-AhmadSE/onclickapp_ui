"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

<<<<<<< HEAD:components/ui/label.tsx
import { cn } from "@/lib/utils"
=======
import { cn } from "@/shared/lib/utils"
>>>>>>> d4a65246a98b6601cb26fee6ec555bf3fc349fe1:shared/ui/label.tsx

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
