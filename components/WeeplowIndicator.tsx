import { IWeeplow } from "@/types/Weeplow";
import { MdOutlineMoodBad } from "react-icons/md";
import { MdOutlineMood } from "react-icons/md";

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
      <div className="flex justify-center items-center">
        {healthStatus ? (
          <>
            <MdOutlineMoodBad size={30} />
          </>
        ) : (
          <>
            <MdOutlineMood size={30} />
          </>
        )}
      </div>
    </div>
  );
};

export default WeeplowIndicator;
