import fs from "fs";
import path from "path";
import { IoWaterOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { GiDuration } from "react-icons/gi";
import { TiHeartFullOutline } from "react-icons/ti";
import WeeplowIndicator from "./WeeplowIndicator";
import { IWeeplow } from "@/types/Weeplow";
import { RiDrinks2Fill } from "react-icons/ri";
import AddLitersForm from "./AddLitersForm";
import { IoMdAdd } from "react-icons/io";
import ChangeFiltersForm from "./ChangeFiltersForm";
import CleanFiltersForm from "./CleanFiltersForm";
import WeeplowDatetime from "./WeeplowDatetime";

const WeeplowStatus = () => {
  const filePath = path.resolve(process.cwd(), "data.json");
  const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
  const weeplow = JSON.parse(jsonData) as IWeeplow;

  return (
    <>
      <div className="h-[3rem] flex justify-around items-center gap-3 text-2xl">
        {/* Datetime */}
        <WeeplowDatetime initialDate={new Date().toISOString()} />

        {/* Indicator */}
        <WeeplowIndicator
          weeplow={weeplow}
          litersUsed={Number(weeplow.litersUsed ?? 0)}
        />
      </div>

      <div className="flex flex-col md:gap-6 border border-[#37436a] p-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <IoWaterOutline size={ICON_SIZE} />
            <p>
              Model :{" "}
              <em>
                <strong>{weeplow.model}</strong>
              </em>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <MdOutlineDateRange size={ICON_SIZE} />
            <p>
              Date d&apos;acquisition :{" "}
              <em>
                <strong>le {weeplow.buyDate}</strong>
              </em>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineDateRange size={ICON_SIZE} />
            <p>
              Date de mise en service :{" "}
              <em>
                <strong>le {weeplow.putIntoServiceDate}</strong>
              </em>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <TiHeartFullOutline size={ICON_SIZE} />
            <p>
              Capacité filtres max :{" "}
              <em>
                <strong>{weeplow.maxCapacityFilters} litres</strong>
              </em>
            </p>
          </div>

          <div className="flex flex-col gap-1 border border-[#37436a] p-2 w-fit">
            <div className="flex items-center gap-3">
              <RiDrinks2Fill size={ICON_SIZE} />
              <p>
                Déjà consommés :{" "}
                <em>
                  <strong>{weeplow.litersUsed ?? 0} litres</strong>
                </em>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <IoMdAdd size={ICON_SIZE} />
              <AddLitersForm />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <GiDuration size={ICON_SIZE} />
            <p>
              Capacité filtres restantes :{" "}
              <em>
                <strong>
                  {getNbLeftLiters(
                    weeplow.maxCapacityFilters,
                    Number(weeplow.litersUsed ?? 0)
                  )}{" "}
                  litres
                </strong>
              </em>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <MdOutlineDateRange size={ICON_SIZE} />
            <p>
              Filtres à changer :{" "}
              <em>
                {weeplow.nextChangeFiltersDate === getCurrentDate() ? (
                  <>
                    <strong className="text-orange-400">
                      filtres à changer!
                    </strong>{" "}
                  </>
                ) : (
                  <>
                    <strong>le {weeplow.nextChangeFiltersDate}</strong>{" "}
                  </>
                )}
              </em>
            </p>

            {weeplow.nextChangeFiltersDate === getCurrentDate() && (
              <ChangeFiltersForm
                nextChangeFiltersDate={weeplow.nextChangeFiltersDate}
              />
            )}
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineDateRange size={ICON_SIZE} />
            <p>
              Filtres à nettoyer :{" "}
              <em>
                {weeplow.nextCleanFiltersDate === getCurrentDate() ? (
                  <>
                    <strong className="text-orange-400">
                      filtres à nettoyer!
                    </strong>{" "}
                  </>
                ) : (
                  <>
                    <strong>le {weeplow.nextCleanFiltersDate}</strong>{" "}
                  </>
                )}
              </em>
            </p>

            {weeplow.nextCleanFiltersDate === getCurrentDate() && (
              <CleanFiltersForm
                nextCleanFiltersDate={weeplow.nextCleanFiltersDate}
              />
            )}
          </div>
          <div className="flex items-center gap-3">
            <GiDuration size={ICON_SIZE} />
            <p>
              Cuves à nettoyer dans :{" "}
              <em>
                <>
                  <strong
                    className={`${
                      getNextCleanTanks() === 0
                        ? "text-orange-400"
                        : "text-green-500"
                    }`}
                  >
                    {getNextCleanTanks()}
                  </strong>{" "}
                  jours
                </>
              </em>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeeplowStatus;

const ICON_SIZE = 25;

const getNbLeftLiters = (nbLiterMax: number, nbLiterUsed: number = 0) => {
  return nbLiterMax - nbLiterUsed;
};

const getCurrentMonthDays = (): number => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // getMonth() returns 0–11
  return new Date(year, month, 0).getDate();
};

export const getCurrentDate = () => {
  const now = new Date();

  // Formatage en JJ/MM/AAAA
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();

  return `${day}/${month}/${year}`;
};

const getNextCleanTanks = (): number => {
  const now = new Date();
  const currentMonthDays = getCurrentMonthDays();
  return currentMonthDays - now.getDate();
};

export const getNextChangeFiltersDate = (lastChangedFiltersdDate: Date) => {
  // On clone la date pour éviter de modifier l'original
  const nextDate = new Date(
    lastChangedFiltersdDate.toLocaleDateString("fr-FR")
  );

  // Ajout de 2 ans
  nextDate.setFullYear(nextDate.getFullYear() + 2);

  // Formatage en JJ/MM/AAAA
  const day = nextDate.getDate().toString().padStart(2, "0");
  const month = (nextDate.getMonth() + 1).toString().padStart(2, "0");
  const year = nextDate.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getNextCleanFiltersDate = (lastCleanedDate: Date) => {
  // On clone la date pour éviter de modifier l'original
  const nextDate = new Date(lastCleanedDate.toLocaleDateString("fr-FR"));

  // Ajout de 3 mois
  nextDate.setMonth(nextDate.getMonth() + 3);

  // Formatage en JJ/MM/AAAA
  const day = nextDate.getDate().toString().padStart(2, "0");
  const month = (nextDate.getMonth() + 1).toString().padStart(2, "0");
  const year = nextDate.getFullYear();

  return `${day}/${month}/${year}`;
};
