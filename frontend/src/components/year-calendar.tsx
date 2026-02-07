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

export type Expense = { amount: number; description: string };
export type ExpensesMap = Record<string, Expense>;

async function fetchExpenses(): Promise<ExpensesMap> {
  const response = await fetch("http://127.0.0.1:5002/api/expenses");
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return response.json();
}
const EXPENSES: ExpensesMap = {
  "2026-01-05": { amount: 45.99, description: "Lunch" },
  "2026-01-12": { amount: 120.00, description: "Software" },
  "2026-01-20": { amount: 89.50, description: "Office supplies" },
  "2026-02-03": { amount: 250.00, description: "Travel" },
  "2026-02-14": { amount: 65.00, description: "Dinner" },
  "2026-02-28": { amount: 199.99, description: "Equipment" },
  "2026-03-10": { amount: 35.00, description: "Books" },
  "2026-03-22": { amount: 150.00, description: "Conference" },
  "2026-04-05": { amount: 75.50, description: "Team lunch" },
  "2026-04-18": { amount: 320.00, description: "Hardware" },
  "2026-05-01": { amount: 55.00, description: "Subscription" },
  "2026-05-15": { amount: 180.00, description: "Training" },
  "2026-06-08": { amount: 95.00, description: "Supplies" },
  "2026-06-25": { amount: 420.00, description: "Software license" },
  "2026-07-04": { amount: 85.00, description: "Team event" },
  "2026-07-20": { amount: 210.00, description: "Travel" },
  "2026-08-12": { amount: 145.00, description: "Office" },
  "2026-09-03": { amount: 78.50, description: "Lunch" },
  "2026-10-15": { amount: 550.00, description: "Equipment" },
  "2026-11-22": { amount: 125.00, description: "Books" },
  "2026-12-10": { amount: 300.00, description: "Holiday party" },
};

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
  const todayKey = formatDateKey(new Date());
  const days = generateYearDays(year, EXPENSES);

  const [isMobile, ] = React.useState<boolean>(false);

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
