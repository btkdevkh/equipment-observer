import fs from "fs";
import path from "path";
import { IWeeplow } from "@/types/Weeplow";
import {
  getNextChangeFiltersDate,
  getNextCleanFiltersDate,
} from "./WeeplowStatus";
import { revalidatePath } from "next/cache";

const AddWaterSystemForm = () => {
  const createWeeplow = async (formData: FormData) => {
    "use server";

    const modelName = formData.get("model-name");
    const buyDate = formData.get("buy-date");
    const putIntoServiceSate = formData.get("put-into-service-date");
    const maxCapacityFilters = formData.get("max-capacity-filters");

    if (!modelName || !buyDate || !putIntoServiceSate || !maxCapacityFilters) {
      return;
    }

    // Get exists json file
    const filePath = path.resolve(process.cwd(), "data.json");

    const newWeeplow: IWeeplow = {
      id: 1,
      model: modelName.toString(),
      buyDate: new Date(buyDate.toString()).toLocaleDateString("fr-FR"),
      putIntoServiceDate: new Date(
        putIntoServiceSate.toString()
      ).toLocaleDateString("fr-FR"),
      maxCapacityFilters: Number(maxCapacityFilters),
      nextChangeFiltersDate: getNextChangeFiltersDate(
        new Date(
          new Date(putIntoServiceSate.toString()).toLocaleDateString("fr-FR")
        )
      ),
      nextCleanFiltersDate: getNextCleanFiltersDate(
        new Date(
          new Date(putIntoServiceSate.toString()).toLocaleDateString("fr-FR")
        )
      ),
    };

    // Write data
    fs.writeFileSync(filePath, JSON.stringify(newWeeplow));

    // "Refresh" by re-reading the file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
      }
    });

    revalidatePath("/");
  };

  return (
    <>
      <form action={createWeeplow} className="flex flex-col gap-3">
        <div className="flex flex-col text-gray-400">
          <label className="">
            Nom du model <small className="text-red-700">*</small>
          </label>
          <input
            type="text"
            name="model-name"
            placeholder="Nom du model"
            className="p-2 border border-[#37436a] rounded outline-0"
          />
        </div>
        <div className="flex flex-col text-gray-400">
          <label>
            Date d&apos;acquisition <small className="text-red-700">*</small>
          </label>
          <input
            type="date"
            name="buy-date"
            className="p-2 border border-[#37436a] rounded outline-0"
          />
        </div>
        <div className="flex flex-col text-gray-400">
          <label>
            Date de mise en service <small className="text-red-700">*</small>
          </label>
          <input
            type="date"
            name="put-into-service-date"
            className="p-2 border border-[#37436a] rounded outline-0"
          />
        </div>
        <div className="flex flex-col text-gray-400">
          <label className="">
            Capacité max des filtres en litres{" "}
            <small className="text-red-700">*</small>
          </label>
          <input
            type="number"
            name="max-capacity-filters"
            placeholder="Capacité max des filtres en litres"
            className="p-2 border border-[#37436a] rounded outline-0"
          />
        </div>

        <div>
          <input
            type="submit"
            value="Valider"
            className="w-full bg-[#3d3d76] p-2 rounded font-semibold cursor-pointer"
          />
        </div>
      </form>
    </>
  );
};

export default AddWaterSystemForm;
