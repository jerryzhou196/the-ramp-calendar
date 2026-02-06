"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  /** Left section content (e.g., logo, title) */
  left?: ReactNode;
  /** Center section content (e.g., navigation, title) */
  center?: ReactNode;
  /** Right section content (e.g., actions, user menu) */
  right?: ReactNode;
  /** Additional className for the header container */
  className?: string;
  /** Show bottom border */
  showBorder?: boolean;
}

export function Header({
  left,
  center,
  right,
  className,
  showBorder = false,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex h-14 items-center justify-between gap-4 bg-background px-4 transition-shadow",
        showBorder && "shadow-sm border-b border-border",
        className
      )}
    >
      {/* Left section */}
      <div className="flex items-center gap-2">{left}</div>

      {/* Center section */}
      <div className="flex items-center gap-2">{center}</div>

      {/* Right section */}
      <div className="flex items-center gap-2">{right}</div>
    </header>
  );
}
