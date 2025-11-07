import { Category, IEquipment } from "@/types/Equipment";
import { MdOutlineMoodBad } from "react-icons/md";
import { MdOutlineMood } from "react-icons/md";
import {
  getCurrentDate,
  getKeyFromKey,
  parseDateFR,
} from "@/functions/functions";

type StatusIndicatorProps = {
  equipment: IEquipment;
};

const StatusIndicator = ({ equipment }: StatusIndicatorProps) => {
  const isWaterSystem =
    equipment.category ===
    getKeyFromKey(Category, Category.WATER_FILTER_SYSTEM);
  const isCoffeeMachine =
    equipment.category === getKeyFromKey(Category, Category.COFFEE_MACHINE);
  const isKettle =
    equipment.category === getKeyFromKey(Category, Category.KETTLE);
  const isTreadmill =
    equipment.category === getKeyFromKey(Category, Category.TREADMILL);

  const healthStatus =
    equipment.maxCapacityFilters && isWaterSystem
      ? equipment.maxCapacityFilters - Number(equipment.litersUsed ?? 0) <= 0
      : isWaterSystem && getCurrentDate() >= equipment.nextChangeFiltersDate!
      ? true
      : isWaterSystem && getCurrentDate() >= equipment.nextCleanFiltersDate!
      ? true
      : (isCoffeeMachine || isKettle) &&
        parseDateFR(getCurrentDate()) >=
          parseDateFR(equipment.nextDescalingDate!)
      ? true
      : isTreadmill &&
        parseDateFR(getCurrentDate()) >=
          parseDateFR(equipment.nextChangeOilDate ?? "")
      ? true
      : false;

  return (
    <div
      className={`w-full h-full flex justify-center items-center gap-3 rounded ${
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

export default StatusIndicator;
