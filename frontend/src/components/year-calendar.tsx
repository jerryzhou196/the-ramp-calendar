"use client";
import React from "react";
import { CalendarHeader } from "./calendar-header";

export type CalendarListItem = {
  id: string;
  summary: string;
  primary?: boolean;
  backgroundColor?: string;
  accountEmail?: string;
  accessRole?: string;
};

export type AllDayEvent = {
  id: string;
  summary: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD (exclusive)
  calendarId?: string;
};


function generateYearDays(year: number) {
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);
  const days: Array<{ key: string; date: Date }> = [];
  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    const date = new Date(d);
    days.push({ key: formatDateKey(date), date });
  }
  return days;
}


const monthShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dayOfWeekShort = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

interface DayCellProps {
  day: { key: string; date: Date } | null;
  index: number;
  isMobile: boolean;
  todayKey: string;
}

export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function DayCell({ day, index, isMobile, todayKey }: DayCellProps) {
  if (day === null) {
    // Empty cell for days before January 1st or after December 31st
    return (
      <div
        key={`empty-${index}`}
        data-day-cell="1"
        className={
          "relative bg-muted/30 p-1 min-w-0 min-h-0 overflow-hidden" +
          (!isMobile ? " aspect-square" : "")
        }
      />
    );
  }

  const { key, date } = day;
  const isToday = key === todayKey;
  const isFirstOfMonth = date.getDate() === 1;
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  return (
    <div
      data-day-cell="1"
      style={{
        backgroundColor: isWeekend ? "hsl(0,0%,10%)" : "black",
        borderLeft: isFirstOfMonth ? "2px solid hsl(0,0%,85%)" : "none",
      }}
      className={[
        "relative p-1 min-w-0 min-h-0 overflow-hidden",
        !isMobile && "aspect-square",
        isWeekend &&
          "bg-[hsl(0,0%,13%)]",
        isToday && "ring-1 ring-primary",
        isFirstOfMonth &&
          "border-l-2 border-[hsl(0,0%,85%)]",
      ]
        .filter(Boolean)
        .join(" ")}
      title={date.toDateString()}
    >
      {isFirstOfMonth ? (
        <div className="absolute top-0 left-0 bg-foreground text-background text-[10px] leading-none uppercase tracking-wide px-1.5 py-0.5">
          {monthShort[date.getMonth()]}
        </div>
      ) : (
        <div className="absolute top-0 left-0 bg-foreground text-background text-[10px] leading-none uppercase tracking-wide px-1.5 py-0.5">
          <span className="ml-1 text-[8px] uppercase">{dayOfWeekShort[date.getDay()]}</span> {date.getDate()} 
        </div>
      )}

    </div>
  );
}

export function YearCalendar({
  year,
}: {
  year: number;
  events: AllDayEvent[];
  alignWeekends?: boolean;
}) {
  const todayKey = formatDateKey(new Date());
  const days = generateYearDays(year);

  // Important for hydration: start with a deterministic server/client match,
  // then compute real columns after mount to avoid style mismatches.
  const [gridDims, setGridDims] = React.useState<{
    cols: number;
    cell: number;
  }>(() => ({
    cols: 12,
    cell: 12,
  }));

  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  return (
    <div>
      <CalendarHeader />
      <div
          className="grid bg-border dark:!bg-[hsl(0,0%,12%)] p-px"
          style={{
            gridTemplateColumns: `repeat(${gridDims.cols}, 1fr)`,
            gridAutoRows: isMobile ? `${gridDims.cell}px` : "auto",
            gap: "1px",
          }}
        >
          {days.map((day, index) => (
            <DayCell
              key={day?.key ?? `empty-${index}`}
              day={day}
              index={index}
              isMobile={isMobile}
              todayKey={todayKey}
            />
          ))}
      </div>
    </div>
  );
}
