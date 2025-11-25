import { cn } from "@/lib/utils";
import React from "react";

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  accentColor?: string;
  asLink?: boolean;
  href?: string;
}

export const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(
  (
    {
      children,
      className,
      accentColor = "bg-primary",
      asLink = false,
      href,
      ...props
    },
    ref
  ) => {
    if (asLink && href) {
      return (
        <a
          href={href}
          className={cn(
            "relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all bg-white dark:bg-transparent rounded-md border border-foreground outline-none hover:bg-white dark:hover:bg-black/10 group",
            className
          )}
        >
          <span
            className={cn(
              "w-48 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0",
              accentColor
            )}
          />
          <span className="relative text-left text-foreground transition-colors duration-300 ease-in-out group-hover:text-background dark:group-hover:text-foreground">
            {children}
          </span>
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all bg-white dark:bg-transparent rounded-md border border-foreground outline-none hover:bg-white dark:hover:bg-black/10 group",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "w-48 h-48 rounded rotate-[-40deg] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0",
            accentColor
          )}
        />
        <span className="relative text-left text-foreground transition-colors duration-300 ease-in-out group-hover:text-background dark:group-hover:text-foreground">
          {children}
        </span>
      </button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
