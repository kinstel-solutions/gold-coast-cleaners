"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CalendarDays,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Constants (module-level — never reallocated) ─────────────────────────────

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Stable today — computed once at module load, valid for the entire page session
// (a page won't span midnight in practice for a booking form)
const TODAY = (() => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
})();

const CURRENT_YEAR = TODAY.getFullYear();
const CURRENT_MONTH = TODAY.getMonth();

// Year options — computed once at module level
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - 1 + i);

// Stable box-shadow string — computed once, never changes
const PANEL_SHADOW = [
  "0 24px 64px -12px rgba(11, 45, 110, 0.22)",
  "0 0 0 1px rgba(0, 119, 204, 0.55)",
  "0 0 8px 2px rgba(0, 119, 204, 0.30)",
  "0 0 24px 6px rgba(11, 45, 110, 0.18)",
  "inset 0 0 0 1px rgba(0, 119, 204, 0.45)",
  "inset 0 0 12px 0px rgba(0, 119, 204, 0.14)",
  "inset 0 0 40px 0px rgba(11, 45, 110, 0.07)",
].join(", ");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  disabled?: (date: Date) => boolean;
  placeholder?: string;
  className?: string;
  inline?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// ─── Custom dropdown panel ────────────────────────────────────────────────────

interface DropdownPanelProps {
  open: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  children: React.ReactNode;
}

function DropdownPanel({ open, triggerRef, onClose, children }: DropdownPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      const target = e.target as Node;
      // Close only when click is outside both the panel AND its trigger button
      if (
        panelRef.current && !panelRef.current.contains(target) &&
        triggerRef.current && !triggerRef.current.contains(target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 mt-1 z-[100]",
        "min-w-[130px] max-h-52 overflow-y-auto",
        "rounded-xl border border-slate-100",
        // Fully opaque — no transparency, no blur needed
        "bg-white shadow-lg shadow-primary/12",
        // Emerge top-to-bottom: scale from origin-top so it unfolds downward
        "animate-in fade-in zoom-in-95 duration-150 origin-top"
      )}
    >
      {children}
    </div>
  );
}

// ─── Nav arrow ────────────────────────────────────────────────────────────────

// Stable class string — avoids cn() call on every render
const NAV_ARROW_CLASS =
  "flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full " +
  "bg-primary text-white hover:bg-primary/85 active:scale-95 " +
  "shadow-sm shadow-primary/40 transition-all duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2";

function NavArrow({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className={NAV_ARROW_CLASS}>
      {direction === "prev" ? (
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
      ) : (
        <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
      )}
    </button>
  );
}

// ─── Calendar Grid ────────────────────────────────────────────────────────────

interface CalendarGridProps {
  viewYear: number;
  viewMonth: number;
  selected?: Date;
  disabled?: (date: Date) => boolean;
  onSelect: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onToday: () => void;
}

function CalendarGrid({
  viewYear,
  viewMonth,
  selected,
  disabled,
  onSelect,
  onPrevMonth,
  onNextMonth,
  onYearChange,
  onMonthChange,
  onToday,
}: CalendarGridProps) {
  const [monthOpen, setMonthOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);

  const monthBtnRef = useRef<HTMLButtonElement>(null);
  const yearBtnRef = useRef<HTMLButtonElement>(null);

  // Build grid cells — memoised so it only recalculates when month/year changes
  const { cells, totalRows } = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const raw: Array<Date | null> = [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
    ];
    // Pad to complete the last week row
    const remainder = raw.length % 7;
    if (remainder !== 0) {
      raw.push(...Array(7 - remainder).fill(null));
    }
    return { cells: raw, totalRows: raw.length / 7 };
  }, [viewYear, viewMonth]);

  return (
    <div className="select-none w-full">

      {/* ── Header: grid keeps arrows pinned at exactly 36px each side ── */}
      <div className="grid grid-cols-[36px_1fr_36px] items-center gap-1 w-full mb-4">
        <NavArrow direction="prev" onClick={onPrevMonth} label="Previous month" />

        <div className="flex items-center justify-center gap-0.5 min-w-0">

          {/* Month selector */}
          <div className="relative">
            <button
              ref={monthBtnRef}
              type="button"
              aria-label="Select month"
              aria-expanded={monthOpen}
              onClick={() => { setMonthOpen((o) => !o); setYearOpen(false); }}
              className={cn(
                "flex items-center gap-1 px-2 py-1.5 rounded-lg min-w-0",
                "text-sm font-bold text-slate-800",
                "hover:bg-primary/10 hover:text-primary",
                monthOpen && "bg-primary/10 text-primary",
                "transition-colors duration-150 focus-visible:outline-none"
              )}
            >
              {/* Short name on mobile, full name on sm+ */}
              <span className="sm:hidden">{MONTH_NAMES_SHORT[viewMonth]}</span>
              <span className="hidden sm:inline">{MONTH_NAMES[viewMonth]}</span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-primary/60 transition-transform duration-150",
                  monthOpen && "rotate-180"
                )}
                strokeWidth={2.5}
              />
            </button>
            <DropdownPanel
              open={monthOpen}
              triggerRef={monthBtnRef}
              onClose={() => setMonthOpen(false)}
            >
              {MONTH_NAMES.map((name, i) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => { onMonthChange(i); setMonthOpen(false); }}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm font-medium",
                    "hover:bg-primary/10 hover:text-primary transition-colors",
                    i === viewMonth
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-slate-700"
                  )}
                >
                  {name}
                </button>
              ))}
            </DropdownPanel>
          </div>

          {/* Year selector */}
          <div className="relative">
            <button
              ref={yearBtnRef}
              type="button"
              aria-label="Select year"
              aria-expanded={yearOpen}
              onClick={() => { setYearOpen((o) => !o); setMonthOpen(false); }}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1.5 rounded-lg",
                "text-sm font-bold text-slate-800",
                "hover:bg-primary/10 hover:text-primary",
                yearOpen && "bg-primary/10 text-primary",
                "transition-colors duration-150 focus-visible:outline-none"
              )}
            >
              {viewYear}
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-primary/60 transition-transform duration-150",
                  yearOpen && "rotate-180"
                )}
                strokeWidth={2.5}
              />
            </button>
            <DropdownPanel
              open={yearOpen}
              triggerRef={yearBtnRef}
              onClose={() => setYearOpen(false)}
            >
              {YEAR_OPTIONS.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => { onYearChange(y); setYearOpen(false); }}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm font-medium",
                    "hover:bg-primary/10 hover:text-primary transition-colors",
                    y === viewYear
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-slate-700"
                  )}
                >
                  {y}
                </button>
              ))}
            </DropdownPanel>
          </div>
        </div>

        <NavArrow direction="next" onClick={onNextMonth} label="Next month" />
      </div>

      {/* ── Unified grid: headers + day cells ── */}
      <div className="grid grid-cols-7 border border-primary/[0.08] rounded-xl overflow-hidden">

        {/* Day-of-week header row */}
        {DAY_NAMES.map((d, i) => {
          const isWeekend = i === 0 || i === 6;
          return (
            <div
              key={d}
              className={cn(
                "text-center text-[10px] font-bold tracking-widest uppercase py-2",
                "border-b border-primary/[0.08]",
                i < 6 && "border-r border-primary/[0.08]",
                isWeekend ? "text-primary/60 bg-primary/[0.03]" : "text-slate-500"
              )}
            >
              {d}
            </div>
          );
        })}

        {/* Day cells */}
        {cells.map((date, idx) => {
          const col = idx % 7;
          const row = Math.floor(idx / 7);
          const isLastRow = row === totalRows - 1;
          const isLastCol = col === 6;
          const isWeekendCol = col === 0 || col === 6;

          const cellClass = cn(
            "flex items-center justify-center h-10",
            !isLastRow && "border-b border-primary/[0.08]",
            !isLastCol && "border-r border-primary/[0.08]",
            isWeekendCol && "bg-primary/[0.02]"
          );

          if (!date) {
            return <div key={`e-${idx}`} className={cellClass} />;
          }

          const isToday = isSameDay(date, TODAY);
          const isSelected = selected ? isSameDay(date, selected) : false;
          const isDisabled = disabled ? disabled(date) : date < TODAY;

          return (
            <div key={date.getTime()} className={cellClass}>
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => onSelect(date)}
                aria-label={`${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`}
                aria-pressed={isSelected}
                className={cn(
                  "relative flex items-center justify-center",
                  "w-8 h-8 rounded-full text-sm",
                  "transition-all duration-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1",

                  !isSelected && !isDisabled && [
                    isWeekendCol ? "font-semibold text-primary/80" : "font-medium text-slate-700",
                    "cursor-pointer hover:bg-primary hover:text-white hover:scale-110 hover:shadow-sm hover:shadow-primary/30",
                  ],

                  isToday && !isSelected && "ring-2 ring-primary/50 ring-offset-1 text-primary font-bold",

                  isSelected && "bg-primary text-white font-semibold scale-110 shadow-md shadow-primary/40",

                  isDisabled && "text-slate-300 cursor-not-allowed opacity-40 font-normal"
                )}
              >
                {date.getDate()}
                {isToday && !isSelected && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* ── Today footer ── */}
      <div className="mt-3 pt-3 border-t border-primary/10 flex items-center justify-center">
        <button
          type="button"
          onClick={onToday}
          className={cn(
            "flex items-center gap-1.5 px-4 py-1.5 rounded-full",
            "text-xs font-semibold text-primary/70",
            "hover:bg-primary/10 hover:text-primary",
            "border border-primary/20 hover:border-primary/40",
            "transition-all duration-150"
          )}
        >
          <RotateCcw className="w-3 h-3" strokeWidth={2.5} />
          Today
        </button>
      </div>
    </div>
  );
}

// ─── Main DatePicker ──────────────────────────────────────────────────────────

export function DatePicker({
  value,
  onChange,
  disabled,
  placeholder = "Pick a date",
  className,
  inline = false,
  onOpenChange,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? CURRENT_YEAR);
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? CURRENT_MONTH);
  const [dropDir, setDropDir] = useState<"top" | "bottom">("bottom");

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync view to selected value each time the picker opens
  const openPicker = useCallback(() => {
    setViewYear(value?.getFullYear() ?? CURRENT_YEAR);
    setViewMonth(value?.getMonth() ?? CURRENT_MONTH);
    setOpen(true);
    onOpenChange?.(true);
  }, [value, onOpenChange]);

  // Compute flip direction after open state is committed to DOM
  useLayoutEffect(() => {
    if (!open || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setDropDir(spaceBelow < 380 && rect.top > spaceBelow ? "top" : "bottom");
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, onOpenChange]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); onOpenChange?.(false); }
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open, onOpenChange]);

  const handleToggle = useCallback(() => {
    if (open) { setOpen(false); onOpenChange?.(false); }
    else openPicker();
  }, [open, openPicker, onOpenChange]);

  const handleSelect = useCallback(
    (date: Date) => {
      onChange(date);
      if (!inline) { setOpen(false); onOpenChange?.(false); }
    },
    [onChange, inline, onOpenChange]
  );

  const prevMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) { setViewYear((y) => y - 1); return 11; }
      return m - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) { setViewYear((y) => y + 1); return 0; }
      return m + 1;
    });
  }, []);

  const handleToday = useCallback(() => {
    setViewYear(CURRENT_YEAR);
    setViewMonth(CURRENT_MONTH);
  }, []);

  // ── Shared CalendarGrid props ──
  const gridProps = {
    viewYear,
    viewMonth,
    selected: value,
    disabled,
    onSelect: handleSelect,
    onPrevMonth: prevMonth,
    onNextMonth: nextMonth,
    onYearChange: setViewYear,
    onMonthChange: setViewMonth,
    onToday: handleToday,
  };

  // ── Inline mode — render panel directly, no popover wrapper ──
  if (inline) {
    return (
      <div
        className="rounded-2xl p-4 w-full bg-white/92 backdrop-blur-2xl"
        style={{ boxShadow: PANEL_SHADOW }}
      >
        <CalendarGrid {...gridProps} />
      </div>
    );
  }

  // ── Trigger label ──
  const formattedDate = value
    ? value.toLocaleDateString("en-AU", {
        weekday: "short", day: "numeric", month: "long", year: "numeric",
      })
    : null;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger button */}
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={handleToggle}
        className={cn(
          "w-full flex items-center gap-3 text-left",
          "px-4 py-3 rounded-xl",
          "border border-input bg-background",
          "text-sm transition-all duration-200",
          "hover:border-primary/40 hover:bg-primary/[0.02]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          open && "border-primary/50 ring-2 ring-primary/20",
          className
        )}
      >
        <CalendarDays
          className={cn(
            "w-4 h-4 flex-shrink-0 transition-colors",
            formattedDate ? "text-primary" : "text-muted-foreground"
          )}
        />
        {formattedDate ? (
          <span className="font-medium text-slate-800">{formattedDate}</span>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </button>

      {/* Dropdown panel — smart flip positioning */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Date picker"
          className={cn(
            "absolute z-50",
            "left-0 right-0 sm:right-auto sm:w-[300px]",
            dropDir === "bottom"
              ? "top-full mt-2 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150"
              : "bottom-full mb-2 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-150"
          )}
        >
          <div
            className="rounded-2xl p-4 w-full bg-white/92 backdrop-blur-2xl"
            style={{ boxShadow: PANEL_SHADOW }}
          >
            <CalendarGrid {...gridProps} />
          </div>
        </div>
      )}
    </div>
  );
}
