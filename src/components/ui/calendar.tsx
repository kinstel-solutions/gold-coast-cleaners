"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout="dropdown"
      className={cn(
        "p-4 bg-white rounded-2xl shadow-xl shadow-primary/5 border border-primary/10",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 pb-2 relative items-center gap-2",
        caption_label: "text-[15px] font-bold text-slate-900 hidden",
        dropdowns: "flex items-center gap-2",
        dropdown:
          "appearance-none cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm hover:border-primary/50 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all",
        dropdown_month: "min-w-[110px]",
        dropdown_year: "min-w-[76px]",
        nav: "flex items-center gap-1 absolute inset-x-1 top-0 justify-between pointer-events-none",
        button_previous: cn(
          "pointer-events-auto flex items-center justify-center h-9 w-9 rounded-lg",
          "text-slate-500 hover:text-primary hover:bg-primary/8 active:bg-primary/15",
          "border border-transparent hover:border-primary/20",
          "transition-all duration-150 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        ),
        button_next: cn(
          "pointer-events-auto flex items-center justify-center h-9 w-9 rounded-lg",
          "text-slate-500 hover:text-primary hover:bg-primary/8 active:bg-primary/15",
          "border border-transparent hover:border-primary/20",
          "transition-all duration-150 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex justify-between w-full mb-2",
        weekday:
          "text-slate-400 rounded-md w-9 font-semibold text-[0.75rem] uppercase tracking-wider text-center",
        week: "flex w-full mt-1 justify-between gap-1",
        day: cn(
          "h-9 w-9 text-center text-sm p-0 flex items-center justify-center relative",
          "[&:has([aria-selected].day-range-end)]:rounded-r-full",
          "[&:has([aria-selected].outside)]:bg-primary/5",
          "[&:has([aria-selected])]:bg-primary/10",
          "first:[&:has([aria-selected])]:rounded-l-full",
          "last:[&:has([aria-selected])]:rounded-r-full",
          "focus-within:relative focus-within:z-20"
        ),
        day_button: cn(
          "h-9 w-9 p-0 font-medium text-slate-700",
          "hover:bg-primary/10 hover:text-primary",
          "rounded-full aria-selected:opacity-100",
          "transition-colors duration-100 outline-none cursor-pointer",
          "flex items-center justify-center w-full"
        ),
        range_end: "day-range-end",
        selected:
          "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white rounded-full shadow-md shadow-primary/20",
        today: "bg-secondary text-primary font-bold rounded-full ring-1 ring-primary/30",
        outside:
          "outside text-slate-300 aria-selected:bg-primary/5 aria-selected:text-slate-400 font-normal",
        disabled: "text-slate-300 opacity-40 cursor-not-allowed",
        range_middle: "aria-selected:bg-primary/10 aria-selected:text-slate-900",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props: any) => {
          if (props.orientation === "left") {
            return <ChevronLeft className="h-4 w-4 shrink-0" />;
          }
          return <ChevronRight className="h-4 w-4 shrink-0" />;
        },
      } as any}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
