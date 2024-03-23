"use client";

import { type ComponentPropsWithoutRef } from "react";
import DateIcon from "./icons/DateIcon";
import { isDateToday, isDateYesterday } from "../utils";

export default function DateInfo(
  props: ComponentPropsWithoutRef<"div"> & {
    dateStr: string;
    withIcon: boolean;
  },
) {
  const { dateStr, withIcon, ...rest } = props;
  const date = getDateRepresentation(new Date(dateStr));

  return (
    <div {...rest}>
      {withIcon && <DateIcon className="h-4 w-4 md:h-5 md:w-5" />}
      <span>{date}</span>
    </div>
  );
}

function getDateRepresentation(date: Date) {
  const isToday = isDateToday(date);
  const isYesterday = isDateYesterday(date);
  switch (true) {
    case isToday:
      return "Today" as const;
    case isYesterday:
      return "Yesterday" as const;
    default:
      return date.toLocaleDateString();
  }
}
