"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export function DatePickerInput({
  selected,
  onChange,
}: {
  selected: Date | undefined;
  onChange: (selectedValue: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "border-1 rounded-6 py-14 px-16 border-gray-D9D9 h-42 tablet:h-48 flex gap-10 justify-start",
            !selected && "text-muted-foreground",
          )}>
          <CalendarIcon className="mr-2 size-20 tabelt:size-22 text-gray-9FA6" />
          {selected ? (
            <div className="w-full flex justify-between items-center">
              <span className="text-14 tablet:text-16 text-gray-9FA6">{format(selected, "yyyy-MM-dd HH:mm")}</span>
            </div>
          ) : (
            <span className="text-14 tablet:text-16 text-gray-9FA6">날짜를 선택해 주세요.</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="">
        <Calendar mode="single" selected={selected} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
