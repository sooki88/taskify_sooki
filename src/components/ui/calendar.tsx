import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";

import { cn } from "@/lib/shadcnUI/utils";

import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const classNames = {
  months: `flex flex-col space-y-4`,
  month: `space-y-4`,
  caption: `flex justify-center pt-1 relative items-center`,
  caption_label: `font-medium text-20`,
  nav: `space-x-1 flex items-center`,
  nav_button: cn(
    buttonVariants({ variant: "outline" }),
    "size-24 bg-transparent p-0 opacity-50 hover:opacity-100 border-none",
  ),
  nav_button_previous: `absolute left-1`,
  nav_button_next: `absolute right-1`,
  table: `w-full border-collapse space-y-1`,
  head_row: `flex`,
  head_cell: `text-violet rounded-md font-normal text-18 m-auto`,
  row: `flex mt-2`,
  cell: `w-full text-16 text-center p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20`,
  day: cn(
    buttonVariants({ variant: "ghost" }),
    "size-24 aria-selected:opacity-100 hover:bg-violet-F1EF focus:outline-none focus:ring focus:ring-violet-300",
  ),
  // day_range_end: "day-range-end",
  // day_selected: `bg-violet-F1EF text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground`,
  day_today: `bg-violet-F1EF text-violet`,
  day_outside:
    "day-outside text-slate-500 opacity-50 aria-selected:bg-slate-100/50 aria-selected:text-slate-500 aria-selected:opacity-30 dark:text-slate-400 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-400",
  // day_disabled: `text-muted-foreground opacity-50`,
  // day_range_middle: `aria-selected:bg-accent aria-selected:text-accent-foreground`,
  // day_hidden: `invisible`,
};

function Calendar({ className, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      locale={ko}
      showOutsideDays={showOutsideDays}
      className={cn("p-3 w-250 z-modal", className)}
      classNames={classNames}
      components={{
        IconLeft: () => <ChevronLeft />,
        IconRight: () => <ChevronRight />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
