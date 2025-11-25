import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import React from "react";

interface ArrowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const ArrowButton = React.forwardRef<
  HTMLButtonElement,
  ArrowButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all bg-white dark:bg-transparent rounded-md border border-foreground outline-none hover:bg-white dark:hover:bg-black/10 group",
        className
      )}
      {...props}
    >
      <span className="relative text-left text-foreground transition-colors duration-300 ease-in-out group-hover:text-background dark:group-hover:text-foreground flex items-center gap-2">
        {children}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
      </span>
    </button>
  );
});

ArrowButton.displayName = "ArrowButton";
