"use client";
import React, { useState } from "react";
import driveFont from "~/components/font/driveFont";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

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

type UserInfo = {
  birthDate: string;
  expectedAge: number;
  displayUnit: DisplayUnit;
};

const LifeCalendar = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  return (
    <div className="space-y-10">
      <h1
        className={`bg-gradient-to-r from-cyberblue via-cyberpink to-cyberviolet bg-clip-text py-2 text-3xl font-bold text-transparent lg:text-5xl`}
      >
        Your
        <span
          className={`${driveFont.variable} ${driveFont.className} font-medium`}
        >
          {" "}
          Life{" "}
        </span>
        Calendar
      </h1>
      <div className="flex flex-col gap-4">
        <LifeForm setUserInfo={setUserInfo} />
        {!!userInfo && <CalendarDisplay userInfo={userInfo} />}
      </div>
    </div>
  );
};

// LifeForm.tsx
interface LifeFormProps {
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

const LifeForm: React.FC<LifeFormProps> = ({ setUserInfo }) => {
  const [form, setForm] = useState<UserInfo>({
    birthDate: "",
    expectedAge: 80,
    displayUnit: "weeks",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setUserInfo(form);
      }}
      className="flex w-full flex-row flex-wrap gap-2"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="birth">Birth Date</Label>
        <Input
          className="w-32"
          id="birth"
          placeholder="dd.mm.yyyy"
          pattern="[0-9]{2}.[0-9]{2}.[0-9]{4}"
          required
          value={form.birthDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({
              ...form,
              birthDate: e.target.value,
            })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="expectedAge">Expected Lifespan</Label>
        <Input
          className="w-32"
          id="expectedAge"
          pattern="[0-9]{1,3}"
          placeholder="years lived"
          value={form.expectedAge ? form.expectedAge.toString() : ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({
              ...form,
              expectedAge: parseInt(e.target.value) || 0,
            })
          }
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="displayUnit">Display Unit</Label>
        <Select
          value={form.displayUnit}
          onValueChange={(e) =>
            setForm({
              ...form,
              displayUnit: e as DisplayUnit,
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue id="displayUnit" />
          </SelectTrigger>
          <SelectContent>
            {allDisplayUnits.map((unit) => (
              <SelectItem
                key={unit}
                value={unit}
                disabled={
                  unit === "seconds" ||
                  unit === "hours" ||
                  unit === "minutes" ||
                  unit === "days"
                }
              >
                {unit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" variant={"default"} className="mt-auto">
        Generate Calendar!
      </Button>
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
  const calculateBoxes = (): CalendarMetrics => {
    const birthDate = parseDateFromString(userInfo.birthDate);
    const now = new Date();
    const totalUnits = getTotalUnits(
      userInfo.expectedAge,
      userInfo.displayUnit,
    );
    const elapsedUnits = getElapsedUnits(birthDate, now, userInfo.displayUnit);

    return { total: totalUnits, elapsed: elapsedUnits };
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
      case "seconds":
        return Math.floor(diffTime / 1000);
      default:
        return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    }
  };

  const { total, elapsed } = calculateBoxes();
  console.log(total, elapsed);
  const livedInPercent = Math.round((elapsed / total) * 100);

  return (
    <div>
      <p>Congrats. You lived {livedInPercent}% of your lifetime.</p>
      <div
        className="flex flex-row flex-wrap"
        key={`${elapsed}${total}${userInfo.birthDate}${userInfo.expectedAge}${userInfo.displayUnit}`}
      >
        {Array.from({ length: total }, (_, index) => (
          <input
            type="checkbox"
            defaultChecked={index < elapsed}
            disabled
            data-number={index}
            key={index}
            className="m-1 size-4 p-1 text-white disabled:cursor-default disabled:opacity-100"
            style={{ backgroundColor: "initial" }}
          />
        ))}
      </div>
    </div>
  );
};

export default LifeCalendar;
