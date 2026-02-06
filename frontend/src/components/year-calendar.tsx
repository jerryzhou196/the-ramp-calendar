"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
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

export type Expense = { amount: number; description: string };
export type ExpensesMap = Record<string, Expense>;

async function fetchExpenses(): Promise<ExpensesMap> {
  const response = await fetch("http://127.0.0.1:5002/api/expenses");
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return response.json();
}

export type DayData = {
  key: string;
  date: Date;
  expense?: Expense;
};

function generateYearDays(year: number, expenses: ExpensesMap): DayData[] {
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);
  const days: DayData[] = [];
  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    const date = new Date(d);
    const key = formatDateKey(date);
    const expense = expenses[key];
    days.push({ key, date, expense });
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
  day: DayData | null;
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

  const { key, date, expense } = day;
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

      {/* Expense displayed in the center of the cell */}
      {expense && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[11px] font-semibold text-green-400">
              ${expense.amount.toFixed(2)}
            </div>
            <div className="text-[8px] text-muted-foreground truncate max-w-full px-1">
              {expense.description}
            </div>
          </div>
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
  const { data: expenses = {}, isLoading, error } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  const todayKey = formatDateKey(new Date());
  const days = generateYearDays(year, expenses);


  const [isMobile, ] = React.useState<boolean>(false);

  if (isLoading) {
    return (
      <div>
        <CalendarHeader />
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
            <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
            <div className="w-3 h-3 rounded-full bg-white animate-bounce" />
          </div>
          <span className="text-white text-sm">Loading expenses...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <CalendarHeader />
        <div className="flex items-center justify-center h-64 text-red-500">
          Error loading expenses: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <CalendarHeader />
      <div
          className="grid bg-border dark:!bg-[hsl(0,0%,12%)] p-px"
          style={{
            gridTemplateColumns: `repeat(12, 1fr)`,
            gridAutoRows: isMobile ? `12px` : "auto",
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
