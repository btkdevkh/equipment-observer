"use client";

import { useEffect, useState } from "react";

type AppDatetimeProps = {
  initialDate: string;
};

const AppDatetime = ({ initialDate }: AppDatetimeProps) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date(initialDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getCurrentDate = () => {
    const day = currentDateTime.getDate().toString().padStart(2, "0");
    const month = (currentDateTime.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDateTime.getFullYear();

    const hh = currentDateTime.getHours().toString().padStart(2, "0");
    const mm = currentDateTime.getMinutes().toString().padStart(2, "0");
    const ss = currentDateTime.getSeconds().toString().padStart(2, "0");

    return {
      todayDate: `${day}/${month}/${year}`,
      hhmmss: `${hh}:${mm}:${ss}`,
      hhmm: `${hh}:${mm}`,
    };
  };

  return (
    <div className="w-full h-full flex items-center justify-center gap-2 bg-gray-800 py-3 text-xl">
      <div className="">Au {getCurrentDate().todayDate}, à</div>
      <div className="text-yellow-400">{getCurrentDate().hhmmss}</div>
    </div>
  );
};

export default AppDatetime;
