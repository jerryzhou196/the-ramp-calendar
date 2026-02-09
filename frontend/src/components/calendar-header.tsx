"use client";
import { RampLogo } from "./ramp-logo";
import { ExternalLink } from "lucide-react";
import { ReceiptHand } from "./receipt-hand";

export function CalendarHeader({ isMobile }: { isMobile: boolean }) {
  return (
    <header>
      <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' />
      <div className="flex flex-wrap m-4">
        <div className="w-1/2">
          <span className="font-sans text-[10px]">
            <a
              href="https://github.com/jerryzhou196"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold inline-flex items-center gap-0.5"
            >
              Jerry Zhou
              <ExternalLink className="w-3 h-3" />
            </a>{" "}
            got rejected trying to build a calendar for  
          </span>
          <RampLogo width={100} className='mt-2 mb-2'/>
          <span>so he built <strong> His Own Expense Calendar️ </strong></span>
        </div>
        <ReceiptHand isMobile={isMobile} />
      </div>
    </header>
  );
}
