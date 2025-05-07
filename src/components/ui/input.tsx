import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  `flex h-10 w-full rounded-none border-b border-input focus:outline-none bg-transparent px-3 py-2 text-base file:border-0
  file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground
  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
  {
    variants: {
      variant: {
        default: "border border-input rounded-lg focus:border-muted-foreground",
        secondary: "border border-purple w-full bg-primary/80 rounded-lg",
        underlined: `border-0 border-b-2 border-muted-foreground rounded-none focus:ring-0
        focus:border-b-2 focus:border-primary bg-transparent focus:border-muted-foreground`,
        flat: `!border-none !border-transparent bg-black/60 rounded-lg hover:bg-black/80`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isLoading?: boolean;
  classNames?: {
    wrapper?: string;
    input?: string;
    startContent?: string;
    endContent?: string;
    loader?: string;
  };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startContent,
      endContent,
      variant,
      isLoading,
      classNames,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn("relative flex items-center w-full", classNames?.wrapper)}
      >
        {startContent && (
          <div
            className={cn(
              "absolute left-3 flex items-center text-muted-foreground",
              classNames?.startContent
            )}
          >
            {startContent}
          </div>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant }),
            startContent && "pl-10",
            endContent && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {isLoading && (
          <div
            className={cn(
              "absolute right-3 flex items-center",
              classNames?.loader
            )}
          >
            <LoaderCircle className="animate-spin" size={16} />
          </div>
        )}
        {endContent && !isLoading && (
          <div
            className={cn(
              "absolute right-3 flex items-center text-muted-foreground",
              classNames?.endContent
            )}
          >
            {endContent}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
