import { IoMdAdd } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { GiDuration } from "react-icons/gi";
import { TiHeartFullOutline } from "react-icons/ti";
import { Category, IEquipment } from "@/types/Equipment";
import { RiDrinks2Fill } from "react-icons/ri";
import AddLitersForm from "./waterFilterSystem/AddLitersForm";
import ChangeFiltersForm from "./waterFilterSystem/ChangeFiltersForm";
import CleanFiltersForm from "./waterFilterSystem/CleanFiltersForm";
import StatusIndicator from "./StatusIndicator";
import ChangeDateForm from "./ChangeDateForm";
import { HiMiniCpuChip } from "react-icons/hi2";
import {
  getCurrentDate,
  getKeyFromKey,
  getNbLeftLiters,
  getNextCleanTanks,
  parseDateFR,
} from "@/functions/functions";
import Thumbnail from "./Thumbnail";

type EquipmentProps = {
  equipment: IEquipment;
  index: number;
};

const ICON_SIZE = 25;

const Equipment = ({ equipment, index }: EquipmentProps) => {
  return (
    <div className="border border-[#37436a] p-3 flex flex-col justify-between h-fit">
      <div className="flex flex-col gap-3 py-3 relative w-full">
        <span className="absolute top-2 -left-1 border-2 border-[#7FEBF8] bg-[#1a3b4f] h-7 w-7 rounded-full flex items-center justify-center">
          <small>{index}</small>
        </span>

        <div className="h-[3rem] flex justify-around items-center gap-3 text-2xl">
          {/* Indicator */}
          <StatusIndicator equipment={equipment} />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <HiMiniCpuChip size={ICON_SIZE} />
            <p>
              Appareil :{" "}
              <em>
                <strong>{equipment.model}</strong>
              </em>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <MdOutlineDateRange size={ICON_SIZE} />
            <p>
              Date d&apos;acquisition :{" "}
              <em>
                <strong>le {equipment.buyDate}</strong>
              </em>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineDateRange size={ICON_SIZE} />
            <p>
              Date de mise en service :{" "}
              <em>
                <strong>le {equipment.putIntoServiceDate}</strong>
              </em>
            </p>
          </div>
        </div>

        {equipment.nextDescalingDate &&
          equipment.category ===
            getKeyFromKey(Category, Category.COFFEE_MACHINE) && (
            <div className="flex items-center gap-3">
              <MdOutlineDateRange size={ICON_SIZE} />
              <p>
                Date de détartrage :{" "}
                <em>
                  {parseDateFR(equipment.nextDescalingDate) <=
                  parseDateFR(getCurrentDate()) ? (
                    <>
                      <strong className="text-orange-400">
                        Machine à détartrer!
                      </strong>{" "}
                    </>
                  ) : (
                    <>
                      <strong>le {equipment.nextDescalingDate}</strong>
                    </>
                  )}
                </em>
              </p>

              {parseDateFR(equipment.nextDescalingDate) <=
                parseDateFR(getCurrentDate()) && (
                <ChangeDateForm
                  equipment={equipment}
                  nextChangeDate={equipment.nextDescalingDate}
                />
              )}
            </div>
          )}

        {equipment.nextChangeOilDate &&
          equipment.category ===
            getKeyFromKey(Category, Category.TREADMILL) && (
            <div className="flex items-center gap-3">
              <MdOutlineDateRange size={ICON_SIZE} />
              <p>
                L&apos;huile à changer :{" "}
                <em>
                  {parseDateFR(equipment.nextChangeOilDate) <=
                  parseDateFR(getCurrentDate()) ? (
                    <>
                      <strong className="text-orange-400">
                        L&apos;huile à changer!
                      </strong>{" "}
                    </>
                  ) : (
                    <>
                      <strong>le {equipment.nextChangeOilDate}</strong>
                    </>
                  )}
                </em>
              </p>

              {parseDateFR(equipment.nextChangeOilDate) <=
                parseDateFR(getCurrentDate()) && (
                <ChangeDateForm
                  equipment={equipment}
                  nextChangeDate={equipment.nextChangeOilDate}
                />
              )}
            </div>
          )}

        <div className="flex flex-col gap-3">
          {equipment.maxCapacityFilters &&
            equipment.nextChangeFiltersDate &&
            equipment.nextCleanFiltersDate && (
              <>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <TiHeartFullOutline size={ICON_SIZE} />
                    <p>
                      Capacité filtres max :{" "}
                      <em>
                        <strong>{equipment.maxCapacityFilters} litres</strong>
                      </em>
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 border border-[#37436a] p-2 w-fit rounded">
                    <div className="flex items-center gap-3">
                      <RiDrinks2Fill size={ICON_SIZE} />
                      <p>
                        Déjà consommés :{" "}
                        <em>
                          <strong>{equipment.litersUsed ?? 0} litres</strong>
                        </em>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <IoMdAdd size={ICON_SIZE} />
                      <AddLitersForm equipment={equipment} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <GiDuration size={ICON_SIZE} />
                    <p>
                      Capacité filtres restantes :{" "}
                      <em>
                        <strong>
                          {getNbLeftLiters(
                            equipment.maxCapacityFilters,
                            Number(equipment.litersUsed ?? 0)
                          )}{" "}
                          litres
                        </strong>
                      </em>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <MdOutlineDateRange size={ICON_SIZE} />
                    <p>
                      Filtres à changer :{" "}
                      <em>
                        {parseDateFR(equipment.nextChangeFiltersDate) <=
                        parseDateFR(getCurrentDate()) ? (
                          <>
                            <strong className="text-orange-400">
                              filtres à changer!
                            </strong>{" "}
                          </>
                        ) : (
                          <>
                            <strong>
                              le {equipment.nextChangeFiltersDate}
                            </strong>{" "}
                          </>
                        )}
                      </em>
                    </p>

                    {parseDateFR(equipment.nextChangeFiltersDate) <=
                      parseDateFR(getCurrentDate()) && (
                      <ChangeFiltersForm
                        equipment={equipment}
                        nextChangeFiltersDate={equipment.nextChangeFiltersDate}
                      />
                    )}
                  </div>

                  {parseDateFR(equipment.nextChangeFiltersDate) <=
                    parseDateFR(getCurrentDate()) && (
                    <hr className="mt-1 mb-1 border-0 bg-orange-400 h-[0.5px]" />
                  )}

                  <div className="flex items-center gap-3">
                    <MdOutlineDateRange size={ICON_SIZE} />
                    <p>
                      Filtres à nettoyer :{" "}
                      <em>
                        {parseDateFR(equipment.nextCleanFiltersDate) <=
                        parseDateFR(getCurrentDate()) ? (
                          <>
                            <strong className="text-orange-400">
                              filtres à nettoyer!
                            </strong>{" "}
                          </>
                        ) : (
                          <>
                            <strong>le {equipment.nextCleanFiltersDate}</strong>{" "}
                          </>
                        )}
                      </em>
                    </p>

                    {parseDateFR(equipment.nextCleanFiltersDate) <=
                      parseDateFR(getCurrentDate()) && (
                      <CleanFiltersForm
                        equipment={equipment}
                        nextCleanFiltersDate={equipment.nextCleanFiltersDate}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <GiDuration size={ICON_SIZE} />
                    <p>
                      Cuves à nettoyer dans :{" "}
                      <em>
                        {getNextCleanTanks() <= 0 ? (
                          <>
                            <strong className="text-orange-400">
                              Cuves à nettoyer!
                            </strong>
                          </>
                        ) : (
                          <>
                            <strong className="text-green-500">
                              {getNextCleanTanks()}
                            </strong>{" "}
                            jours
                          </>
                        )}
                      </em>
                    </p>
                  </div>
                </div>
              </>
            )}
        </div>
      </div>

      <Thumbnail equipment={equipment} />
    </div>
  );
};

export default Equipment;
