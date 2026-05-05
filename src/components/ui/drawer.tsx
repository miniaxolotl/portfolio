"use client";

import { Drawer as DrawerBase } from "@base-ui/react/drawer";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Drawer = ({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) => (
  <DrawerBase.Root
    open={open}
    onOpenChange={(o) => onOpenChange(o)}
    swipeDirection="left"
  >
    {children}
  </DrawerBase.Root>
);

export const DrawerTrigger = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <DrawerBase.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground cursor-pointer h-10 w-10",
      className,
    )}
    {...props}
  />
));
DrawerTrigger.displayName = "DrawerTrigger";

export const DrawerClose = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <DrawerBase.Close
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground cursor-pointer h-10 px-4 py-2",
      className,
    )}
    {...props}
  />
));
DrawerClose.displayName = "DrawerClose";

export const DrawerContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { id?: string }
>(({ className, children, id, ...props }, ref) => (
  <DrawerBase.Portal>
    <DrawerBase.Backdrop className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 transition-opacity duration-500" />
    <DrawerBase.Viewport className="fixed inset-0 z-[60] flex items-stretch justify-start">
      <DrawerBase.Popup
        ref={ref}
        className={cn(
          "flex h-full w-[min(85vw,360px)] flex-col rounded-r-2xl bg-background shadow-2xl border-r border-border/50",
          "data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full",
          "transition-[transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          className,
        )}
        data-vaul-drawer
        id={id}
        aria-labelledby={id ? `${id}-title` : undefined}
        {...props}
      >
        {children}
      </DrawerBase.Popup>
    </DrawerBase.Viewport>
  </DrawerBase.Portal>
));
DrawerContent.displayName = "DrawerContent";

export const DrawerTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <DrawerBase.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";
