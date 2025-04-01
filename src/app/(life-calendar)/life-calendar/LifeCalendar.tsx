"use client";
import { FixedSizeList as List } from "react-window";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUp, Info, ChevronLeft } from "lucide-react";
import driveFont from "~/components/font/driveFont";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import Link from "next/link";

type DisplayUnit =
  | "years"
  | "months"
  | "weeks"
  | "days"
  | "hours"
  | "minutes"
  | "seconds";

const allDisplayUnits: DisplayUnit[] = [
  "years",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
];
type UnitPercentages = Record<DisplayUnit, number>;

type UserInfo = {
  birthDate: string;
  expectedAge: number;
  displayUnit: DisplayUnit;
};

const getElapsedUnits = (
  birthDate: Date,
  now: Date,
  unit: DisplayUnit,
): number => {
  const diffTime = Math.abs(now.getTime() - birthDate.getTime());
  switch (unit) {
    case "years":
      return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    case "months":
      return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    case "weeks":
      return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    case "days":
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    case "hours":
      return Math.floor(diffTime / (1000 * 60 * 60));
    case "minutes":
      return Math.floor(diffTime / (1000 * 60));
    case "seconds":
      return Math.floor(diffTime / 1000);
  }
};

const getTotalUnits = (expectedAge: number, unit: DisplayUnit): number => {
  switch (unit) {
    case "years":
      return expectedAge;
    case "months":
      return expectedAge * 12;
    case "weeks":
      return expectedAge * 52;
    case "days":
      return expectedAge * 365;
    case "hours":
      return expectedAge * 365 * 24;
    case "minutes":
      return expectedAge * 365 * 24 * 60;
    case "seconds":
      return expectedAge * 365 * 24 * 60 * 60;
  }
};

const LifeCalendar = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  return (
    <>
      <Link href={"/blog/life-calendar"} passHref>
        <Button
          variant={"outline"}
          title="Back to previous page"
          className="group fixed left-4 top-4 z-10 flex p-3"
        >
          <ChevronLeft />
          <p className="hidden group-hover:block">Back to Blog</p>
        </Button>
      </Link>
      <div className="grid h-screen place-items-center items-center justify-center md:hidden">
        <span>Only available on desktop.</span>
        <Link href="/blog/life-calendar" className="underline">
          Go back
        </Link>
      </div>
      <div className="mt-10 hidden md:block">
        <div className="space-y-10">
          <h1
            className={`mx-auto w-fit bg-gradient-to-r from-cyberblue via-cyberpink to-cyberviolet bg-clip-text py-2 text-center text-3xl font-bold text-transparent lg:text-5xl`}
          >
            <span
              className={`${driveFont.variable} ${driveFont.className} pr-2 font-medium`}
            >
              Life
            </span>
            Calendar
          </h1>
          <div className="flex flex-col gap-4">
            <LifeForm setUserInfo={setUserInfo} />
          </div>
        </div>
        {userInfo != null && <CalendarDisplay userInfo={userInfo} />}
        {/* <Legend /> */}
        <ScrollToTopButton />
      </div>
    </>
  );
};

interface LifeFormProps {
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

const LifeForm: React.FC<LifeFormProps> = ({ setUserInfo }) => {
  const [form, setForm] = useState<UserInfo>({
    birthDate: "",
    expectedAge: 80,
    displayUnit: "months",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setUserInfo(form);
      }}
      className="my-2 flex flex-col gap-2"
    >
      <div className="items-centergap-2 flex flex-row">
        <div className="flex flex-row items-center gap-2">
          I was born on{" "}
          <Label htmlFor="birth" className="sr-only">
            Birth Date
          </Label>
          <Input
            className="w-[11ch] placeholder:text-xs"
            id="birth"
            placeholder="dd.mm.yyyy"
            pattern="[0-9]{2}.[0-9]{2}.[0-9]{4}"
            required
            value={form.birthDate}
            onChange={(e) =>
              setForm({
                ...form,
                birthDate: e.target.value,
              })
            }
          />
        </div>

        <div className="flex flex-row items-center gap-2">
          {" "}
          and expect to live for
          <Label htmlFor="expectedAge" className="sr-only">
            Expected Lifespan
          </Label>
          <Input
            className="w-[6ch]"
            id="expectedAge"
            pattern="[0-9]{1,3}"
            placeholder="80?"
            value={form.expectedAge ? form.expectedAge.toString() : ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm({
                ...form,
                expectedAge: parseInt(e.target.value) || 0,
              })
            }
            required
          />
          years.
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        Display boxes in{" "}
        <Label htmlFor="displayUnit" className="sr-only">
          Display Unit
        </Label>
        <Select
          value={form.displayUnit}
          onValueChange={(e) =>
            setForm({
              ...form,
              displayUnit: e as DisplayUnit,
            })
          }
        >
          <SelectTrigger className="w-[13ch]">
            <SelectValue id="displayUnit" />
          </SelectTrigger>
          <SelectContent>
            {allDisplayUnits.map((unit) => (
              <SelectItem key={unit} value={unit} disabled={false}>
                {unit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="submit"
          variant={"default"}
          className="bg-cyberblue/85 text-white hover:bg-cyberblue/90"
        >
          Generate!
        </Button>
      </div>
    </form>
  );
};

// CalendarDisplay.tsx
interface CalendarDisplayProps {
  userInfo: UserInfo;
}

interface CalendarMetrics {
  total: number;
  elapsed: number;
}

const parseDateFromString = (dateString: string): Date => {
  const [day, month, year] = dateString.split(".").map(Number);
  if (day == null || month == null || year == null) {
    throw new Error("Invalid date string");
  }
  return new Date(year, month - 1, day);
};

const CalendarDisplay: React.FC<CalendarDisplayProps> = ({ userInfo }) => {
  const calculateBoxes = useCallback((): CalendarMetrics => {
    const birthDate = parseDateFromString(userInfo.birthDate);
    const now = new Date();
    const totalUnits = getTotalUnits(
      userInfo.expectedAge,
      userInfo.displayUnit,
    );
    const elapsedUnits = getElapsedUnits(birthDate, now, userInfo.displayUnit);

    return { total: totalUnits, elapsed: elapsedUnits };
  }, [userInfo.birthDate, userInfo.displayUnit, userInfo.expectedAge]);

  const { total, elapsed } = calculateBoxes();
  const livedInPercent = Math.round((elapsed / total) * 100);

  const calculateUnitPercentages = useCallback((): UnitPercentages => {
    const totalYears = userInfo.expectedAge;
    const totalMonths = totalYears * 12;
    const totalWeeks = totalYears * 52;
    const totalDays = totalYears * 365;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    return {
      years: Number((1 / totalYears) * 100),
      months: Number((1 / totalMonths) * 100),
      weeks: Number((1 / totalWeeks) * 100),
      days: Number((1 / totalDays) * 100),
      hours: Number((1 / totalHours) * 100),
      minutes: Number((1 / totalMinutes) * 100),
      seconds: Number((1 / totalSeconds) * 100),
    };
  }, [userInfo]);

  const unitPercentages = calculateUnitPercentages();

  return (
    <div>
      <div className="mb-8 flex flex-col gap-2">
        <p>Congrats. You lived {livedInPercent}% of your lifetime.</p>
        <p>
          {elapsed.toLocaleString()} out of {total.toLocaleString()}{" "}
          {userInfo.displayUnit}.
        </p>
        <div>
          <div className="grid max-w-2xl grid-cols-4 text-sm">
            <div className="flex flex-col items-center justify-center gap-4 border border-cyberblue p-1">
              <span> 1 life = 100% </span>
            </div>
            {allDisplayUnits.map((unit) => (
              <div
                className="flex flex-col items-center justify-center gap-4 border border-cyberblue p-1"
                key={unit}
              >
                <span>
                  1 {unit.slice(0, -1)} ={" "}
                  {formatPercentage(unitPercentages[unit])}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LifeCalendarGrid
        total={total}
        elapsed={elapsed}
        mode={userInfo.displayUnit}
      />
    </div>
  );
};

export default LifeCalendar;

const ROW_CHECKBOX_COUNT = 31;
const ROW_HEIGHT = 20; // adjust as needed (in px)
const TOP_OFFSET = 122 + 33 + 204 + 40; // Height of your form (px)

function LifeCalendarGrid({
  total,
  elapsed,
  mode,
}: {
  total: number;
  elapsed: number;
  mode: DisplayUnit;
}) {
  const listRef = useRef<List | null>(null);

  // Calculate the number of rows needed.
  const numRows = Math.ceil(total / ROW_CHECKBOX_COUNT);
  // Total height of the grid.
  const totalHeight = numRows * ROW_HEIGHT;

  useEffect(() => {
    const handleScroll = () => {
      if (listRef.current) {
        // Adjust the scroll offset by subtracting the top offset.
        const adjustedScroll = window.scrollY - TOP_OFFSET;
        // Ensure non-negative value.
        listRef.current.scrollTo(adjustedScroll < 0 ? 0 : adjustedScroll);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Row renderer: renders a row of 31 checkboxes (or fewer in the last row)
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const startIndex = index * ROW_CHECKBOX_COUNT;
    const rowCheckboxCount =
      index === numRows - 1 ? total - startIndex : ROW_CHECKBOX_COUNT;

    const isJanuary1st = (index: number, mode: DisplayUnit): boolean => {
      switch (mode) {
        case "years":
          return true;
        case "months":
          return index % 12 === 0;
        case "weeks":
          return index % 52 === 0;
        case "days":
          return index % 365 === 0;
        case "hours":
          return index % (365 * 24) === 0;
        case "minutes":
          return index % (365 * 24 * 60) === 0;
        case "seconds":
          return index % (365 * 24 * 60 * 60) === 0;
      }
    };

    return (
      <>
        <div style={{ ...style }} className="flex flex-row gap-1">
          {Array.from({ length: rowCheckboxCount }, (_, col) => (
            <div
              key={startIndex + col}
              title={`${mode.slice(0, -1)} ${startIndex + col + 1} of ${total}`}
            >
              <div
                className={`-z-10 flex size-4 items-center justify-center rounded-lg border border-cyberblue p-1 text-white disabled:cursor-default disabled:opacity-100 ${isJanuary1st(startIndex + col, mode) ? "bg-cyberpink" : "bg-transparent"}`}
              >
                {startIndex + col < elapsed && <span>{"\u2713"}</span>}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    // Set marginTop to TOP_OFFSET to align with the content above.
    <div
      style={{
        height: totalHeight,
        position: "relative",
        // marginTop: TOP_OFFSET,
      }}
    >
      <List
        ref={listRef}
        height={window.innerHeight}
        width={768} //max-w-3xl
        itemSize={ROW_HEIGHT}
        itemCount={numRows}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "visible",
        }}
      >
        {Row}
      </List>
    </div>
  );
}

function formatPercentage(value: number): string {
  // If the value is non-zero and is smaller than 0.01, use scientific notation.
  if (value !== 0 && Math.abs(value) < 0.01) {
    // toExponential(2) shows the value in scientific notation with 2 decimals in the mantissa.
    return value.toExponential(2) + "%";
  }

  // Otherwise, format normally with exactly two decimals.
  return (
    value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "%"
  );
}

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-row gap-2">
      {isVisible && (
        <Button variant={"outline"} onClick={scrollToTop}>
          <ArrowUp />
          Go to Top
        </Button>
      )}
      <Legend />
    </div>
  );
};
const Legend = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" className="p-0" asChild>
            <Info className="size-6 p-0" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-2 text-white">
            <div className="flex flex-row items-center gap-2">
              <span className="flex size-4 items-center justify-center rounded-full border border-cyberblue">
                {"\u2713"}
              </span>{" "}
              <span>Lived through</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="flex size-4 items-center justify-center rounded-full border border-cyberblue"></span>{" "}
              <span>Not lived through</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="flex size-4 items-center justify-center rounded-full border border-cyberblue bg-cyberviolet"></span>{" "}
              <span>New year starts here</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
