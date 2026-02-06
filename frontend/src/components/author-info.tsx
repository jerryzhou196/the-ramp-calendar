"use client";
import { RampLogo } from "./ramp-logo";
import { ExternalLinkAnchor } from "./external-link-anchor";

export function AuthorInfo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <span className="font-sans text-[10px]">
        <ExternalLinkAnchor
          href="https://github.com/jerryzhou196"
          className="font-bold"
        >
          Jerry Zhou
        </ExternalLinkAnchor>{" "}
        got rejected trying to build a calendar for  
      </span>
      <span> <RampLogo width={100} className='mt-2 mb-2'/> </span>
      <span>so he built <strong> The Ultimate Expense Calendar™ ️ </strong></span>
    </div>
  );
}
