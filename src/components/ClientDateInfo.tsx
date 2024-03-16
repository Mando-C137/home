"use client";

import { type ComponentPropsWithoutRef } from "react";
import DateIcon from "./icons/DateIcon";

export default function DateInfo(
  props: ComponentPropsWithoutRef<"div"> & { dateStr: string },
) {
  const { dateStr, ...rest } = props;
  return (
    <div {...rest}>
      <DateIcon className="h-6 w-6 pr-2 " />
      <span>{new Date(dateStr).toLocaleDateString()}</span>
    </div>
  );
}
