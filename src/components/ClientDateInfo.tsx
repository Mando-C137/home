"use client";

import { type ComponentPropsWithoutRef } from "react";
import DateIcon from "./icons/DateIcon";
import { isDateToday, isDateYesterday } from "../utils";

export default function DateInfo(
  props: ComponentPropsWithoutRef<"div"> & {
    text?: string;
    dateStr: string;
    withIcon: boolean;
  },
) {
  const { dateStr, withIcon, text, ...rest } = props;
  const date = getDateRepresentation(new Date(dateStr));

  return (
    <div {...rest}>
      {withIcon && <DateIcon className="h-4 w-4 md:h-5 md:w-5" />}
      <span>
        {text} {date}
      </span>
    </div>
  );
}

function getDateRepresentation(date: Date) {
  const isToday = isDateToday(date);
  const isYesterday = isDateYesterday(date);
  switch (true) {
    case isToday:
      return "Today";
    case isYesterday:
      return "Yesterday";
    default:
      return date.toLocaleDateString();
  }
}
