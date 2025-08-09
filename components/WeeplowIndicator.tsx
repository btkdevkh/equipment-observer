import { IWeeplow } from "@/types/Weeplow";
import { GiHealthPotion } from "react-icons/gi";

type WeeplowIndicatorProps = {
  weeplow: IWeeplow;
  litersUsed: number;
};

const WeeplowIndicator = ({ weeplow, litersUsed }: WeeplowIndicatorProps) => {
  const healthStatus = weeplow.maxCapacityFilters - litersUsed <= 0;

  return (
    <div
      className={`flex justify-center items-center gap-3 ${
        healthStatus ? "bg-orange-400" : "bg-green-700"
      } p-2 rounded`}
    >
      <div className="flex items-center gap-3">
        <GiHealthPotion size={30} />
        <p>
          État : <strong>{healthStatus ? "Not Ok" : "Ok"}</strong>
        </p>
      </div>
    </div>
  );
};

export default WeeplowIndicator;
