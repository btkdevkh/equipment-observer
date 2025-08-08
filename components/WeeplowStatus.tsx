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

const WeeplowStatus = () => {
  const filePath = path.resolve(process.cwd(), "data.txt");
  const liters = fs.readFileSync(filePath, { encoding: "utf8" });

  return (
    <>
      {/* Indicator */}
      <WeeplowIndicator weeplow={weeplow} litersUsed={Number(liters)} />

      <div className="flex flex-col gap-3 border border-[#37436a] p-3 rounded">
        <div>
          <div className="flex items-center gap-3">
            <IoWaterOutline size={20} />
            <p>
              Model :{" "}
              <em>
                <strong>{weeplow.model}</strong>
              </em>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <MdOutlineDateRange size={20} />
            <p>
              Date d&apos;acquisition :{" "}
              <em>
                <strong>le {weeplow.dateAchat}</strong>
              </em>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineDateRange size={20} />
            <p>
              Date de mise en service :{" "}
              <em>
                <strong>le {weeplow.dateMiseEnService}</strong>
              </em>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <TiHeartFullOutline size={20} />
            <p>
              Capacité max :{" "}
              <em>
                <strong>{weeplow.maxLifeSpanLiters} litres</strong>
              </em>
            </p>
          </div>

          <div className="border border-[#37436a] rounded p-2 w-fit">
            <div className="flex items-center gap-3">
              <RiDrinks2Fill size={20} />
              <p>
                Déjà consommés :{" "}
                <em>
                  <strong>{liters} litres</strong>
                </em>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <IoMdAdd size={20} />
              <AddLitersForm />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <GiDuration size={20} />
            <p>
              Capacité restante :{" "}
              <em>
                <strong>
                  {getNbLeftLiters(weeplow.maxLifeSpanLiters, Number(liters))}{" "}
                  litres
                </strong>
              </em>
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <MdOutlineDateRange size={20} />
            <p>
              Filtres à changer :{" "}
              <em>
                <strong>le {weeplow.changingFiltersDate}</strong>
              </em>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineDateRange size={20} />
            <p>
              Filtres à nettoyer :{" "}
              <em>
                <strong>le {weeplow.nextCleanFiltersDate}</strong>{" "}
              </em>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <GiDuration size={20} />
            <p>
              Cuves à nettoyer dans :{" "}
              <em>
                <strong>{weeplow.nextCleanInox} jours</strong>{" "}
              </em>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeeplowStatus;

const getNbLeftLiters = (nbLiterMax: number, nbLiterUsed: number = 0) => {
  return nbLiterMax - nbLiterUsed;
};

const getChangingFiltersDate = (dateMiseEnService: Date) => {
  const date =
    dateMiseEnService.getDate() < 10
      ? `0${dateMiseEnService.getDate()}`
      : dateMiseEnService.getDate();
  const month =
    dateMiseEnService.getMonth() + 1 < 10
      ? `0${dateMiseEnService.getMonth() + 1}`
      : dateMiseEnService.getMonth() + 1;

  return `${date}/${month}/${dateMiseEnService.getFullYear() + 2}`;
};

const getCurrentMonthDays = (): number => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // getMonth() returns 0–11
  return new Date(year, month, 0).getDate();
};

const getNextCleanInox = (): number => {
  const now = new Date();
  const currentMonthDays = getCurrentMonthDays();
  return currentMonthDays - now.getDate();
};

const getNextCleanFiltersDate = (lastCleanedDate: Date) => {
  // On clone la date pour éviter de modifier l'original
  const nextDate = new Date(lastCleanedDate);
  // Ajout de 3 mois
  nextDate.setMonth(nextDate.getMonth() + 3);

  // Formatage en JJ/MM/AAAA
  const day = nextDate.getDate().toString().padStart(2, "0");
  const month = (nextDate.getMonth() + 1).toString().padStart(2, "0");
  const year = nextDate.getFullYear();

  return `${day}/${month}/${year}`;
};

// Weeplow obj
const weeplow: IWeeplow = {
  model: "Weeplow Neptune 11L",
  maxLifeSpanLiters: 22000,
  dateAchat: new Date("2025-08-05").toLocaleDateString("fr-FR"),
  dateMiseEnService: new Date("2025-08-07").toLocaleDateString("fr-FR"),
  nextCleanFiltersDate: getNextCleanFiltersDate(new Date("2025-08-07")),
  nextCleanInox: getNextCleanInox(),
  changingFiltersDate: getChangingFiltersDate(new Date("2025-08-07")),
};
