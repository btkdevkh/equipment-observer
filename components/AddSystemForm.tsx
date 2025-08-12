import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Category, Equipments, IEquipment } from "@/types/Equipment";
import {
  getNextChangeFiltersDate,
  getNextChangeDateInterval,
  getNextCleanFiltersDate,
} from "@/functions/functions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const AddSystemForm = () => {
  const createWeeplow = async (formData: FormData) => {
    "use server";

    const category = formData.get("category");
    const modelName = formData.get("model-name");
    const buyDate = formData.get("buy-date");
    const putIntoServiceDate = formData.get("put-into-service-date");
    const maxCapacityFilters = formData.get("max-capacity-filters");

    if (!category || !modelName || !buyDate || !putIntoServiceDate) {
      return;
    }

    // Get exists json file
    const filePath = path.resolve(process.cwd(), "data.json");

    const newEquipment: IEquipment = {
      id: crypto.randomUUID(),
      category: category as Category,
      model: modelName.toString(),
      buyDate: new Date(buyDate.toString()).toLocaleDateString("fr-FR"),
      putIntoServiceDate: new Date(
        putIntoServiceDate.toString()
      ).toLocaleDateString("fr-FR"),
    };

    // Uniquement pour le système de filtration d'eau
    if (maxCapacityFilters) {
      newEquipment.maxCapacityFilters = Number(maxCapacityFilters);
      newEquipment.nextChangeFiltersDate = getNextChangeFiltersDate(
        newEquipment.putIntoServiceDate
      );
      newEquipment.nextCleanFiltersDate = getNextCleanFiltersDate(
        newEquipment.putIntoServiceDate
      );
    }

    // Uniquement pour la machine à café
    if (category === getKeyFromValue(Category, Category.COFFEE_MACHINE)) {
      newEquipment.nextDescalingDate = getNextChangeDateInterval(
        newEquipment.putIntoServiceDate,
        3
      );
    }

    // Uniquement pour le tapis de course
    if (category === getKeyFromValue(Category, Category.TREADMILL)) {
      newEquipment.nextChangeOilDate = getNextChangeDateInterval(
        newEquipment.putIntoServiceDate,
        3
      );
    }

    // Read existing file content
    let data: Equipments = { equipments: [] };
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      if (fileContent) {
        data = JSON.parse(fileContent);
      }
    } else {
      // Create file with default data
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    }

    // Add new equipment to data
    data.equipments.push(newEquipment);

    // Write data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    revalidatePath("/");
    redirect("/");
  };

  return (
    <>
      <form action={createWeeplow} className="flex flex-col gap-3">
        <div className="flex flex-col text-gray-400">
          <label>
            Categories <small className="text-red-700">*</small>
          </label>
          <select
            className="p-2 border border-[#37436a] rounded outline-0"
            name="category"
          >
            {Object.values(Category).map((k) => (
              <option key={k} value={getKeyFromValue(Category, k)}>
                {k}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col text-gray-400">
          <label>
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
          <label>
            Capacité max des filtres en litres{" "}
            <small>
              (À renseigner uniquement pour le système de filtration
              d&apos;eau.)
            </small>
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

export default AddSystemForm;

export const getKeyFromValue = <
  T extends Record<string, unknown>,
  V extends T[keyof T]
>(
  obj: T,
  value: V
): { [K in keyof T]: T[K] extends V ? K : never }[keyof T] | undefined => {
  return Object.keys(obj).find((k) => obj[k as keyof T] === value) as
    | { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
    | undefined;
};

export const getKeyFromKey = <
  T extends Record<string, unknown>,
  V extends T[keyof T]
>(
  obj: T,
  key: V
): { [K in keyof T]: T[K] extends V ? K : never }[keyof T] | undefined => {
  return Object.keys(obj).find((k) => obj[k as keyof T] === key) as
    | { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
    | undefined;
};
