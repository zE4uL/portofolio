"use client";

import { useEffect, useState } from "react";

export type HudClockValue = {
  hh: string;
  mm: string;
  ss: string;
  tz: string;
};

function format(d: Date): HudClockValue {
  return {
    hh: String(d.getHours()).padStart(2, "0"),
    mm: String(d.getMinutes()).padStart(2, "0"),
    ss: String(d.getSeconds()).padStart(2, "0"),
    tz: "IST",
  };
}

export function useHudClock(): HudClockValue {
  const [value, setValue] = useState<HudClockValue>(() => format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setValue(format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return value;
}
