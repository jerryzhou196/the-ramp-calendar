"use client";
import { ExternalLink } from "lucide-react";
import { ReactNode } from "react";

interface ExternalLinkAnchorProps {
  href: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
  iconSize?: string;
}

export function ExternalLinkAnchor({
  href,
  children,
  className = "",
  showIcon = true,
  iconSize = "w-3 h-3",
}: ExternalLinkAnchorProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-0.5 ${className}`}
    >
      {children}
      {showIcon && <ExternalLink className={iconSize} />}
    </a>
  );
}
