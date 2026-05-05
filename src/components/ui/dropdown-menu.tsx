"use client";

import { Menu as MenuBase } from "@base-ui/react/menu";
import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => (
  <MenuBase.Root>{children}</MenuBase.Root>
);

export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, children, ...props }, ref) => (
  <MenuBase.Trigger ref={ref} className={cn(className)} {...props}>
    {children}
  </MenuBase.Trigger>
));
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    align?: "start" | "end" | "center";
    sideOffset?: number;
  }
>(({ className, align, sideOffset = 4, children, ...props }, ref) => (
  <MenuBase.Portal keepMounted>
    <MenuBase.Positioner
      align={align}
      sideOffset={sideOffset}
      className="outline-none"
    >
      <MenuBase.Popup
        ref={ref}
        className={cn(
          "z-[100] max-h-[var(--available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg outline-none transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
          className,
        )}
        {...props}
      >
        {children}
      </MenuBase.Popup>
    </MenuBase.Positioner>
  </MenuBase.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    href: string;
    closeOnClick?: boolean;
  }
>(({ className, href, closeOnClick = true, children, ...props }, ref) => (
  <MenuBase.LinkItem
    ref={ref}
    render={
      <Link
        href={href}
        className={cn(
          "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          className,
        )}
        {...props}
      />
    }
    closeOnClick={closeOnClick}
  >
    {children}
  </MenuBase.LinkItem>
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuSeparator = ({
  className,
}: {
  className?: string;
}) => (
  <MenuBase.Separator className={cn("-mx-1 my-1 h-px bg-muted", className)} />
);

export const DropdownMenuGroup = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => (
  <MenuBase.Group ref={ref} className={cn(className)} {...props}>
    {children}
  </MenuBase.Group>
));
DropdownMenuGroup.displayName = "DropdownMenuGroup";

export const DropdownMenuLabel = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => (
  <MenuBase.GroupLabel
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
      className,
    )}
    {...props}
  >
    {children}
  </MenuBase.GroupLabel>
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";
