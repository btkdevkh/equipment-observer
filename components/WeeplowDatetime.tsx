"use client";

import { useEffect, useState } from "react";

type WeeplowDatetimeProps = {
  initialDate: string;
};

const WeeplowDatetime = ({ initialDate }: WeeplowDatetimeProps) => {
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
    };
  };

  return (
    <div className="w-full h-full flex items-center justify-center gap-2 text-xl md:text-4xl bg-gray-800 px-2">
      <div className="">{getCurrentDate().todayDate}</div>
      <div className="text-yellow-400">{getCurrentDate().hhmmss}</div>
    </div>
  );
};

export default WeeplowDatetime;
