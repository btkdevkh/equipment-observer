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
      className={`md:p-5 flex justify-center items-center gap-3 ${
        healthStatus ? "bg-orange-400" : "bg-green-700"
      } p-2 rounded`}
    >
      <div className="flex items-center gap-3">
        <GiHealthPotion size={50} />
        <p>
          <strong>{healthStatus ? "Pas Ok" : "Ok"}</strong>
        </p>
      </div>
    </div>
  );
};

export default WeeplowIndicator;
