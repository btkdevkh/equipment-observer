import { IWeeplow } from "@/types/Weeplow";
import { MdHealthAndSafety } from "react-icons/md";

type WeeplowIndicatorProps = {
  weeplow: IWeeplow;
  litersUsed: number;
};

const WeeplowIndicator = ({ weeplow, litersUsed }: WeeplowIndicatorProps) => {
  const healthStatus = weeplow.maxCapacityFilters - litersUsed <= 0;

  return (
    <div
      className={`w-full h-full flex justify-center items-center gap-3 ${
        healthStatus ? "bg-orange-400" : "bg-green-700"
      }`}
    >
      <div className="flex items-center gap-3">
        <MdHealthAndSafety size={40} />
        <p>
          <strong>{healthStatus ? "PAS OK" : "OK"}</strong>
        </p>
      </div>
    </div>
  );
};

export default WeeplowIndicator;
