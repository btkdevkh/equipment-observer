"use server";

import fs from "fs";
import path from "path";
import { Equipments, IEquipment } from "@/types/Equipment";
import { revalidatePath } from "next/cache";
import { getNextCleanFiltersDate } from "@/functions/functions";

const cleanFilters = async (
  prevState: { equipment: IEquipment; success: boolean; message: string },
  formData: FormData
) => {
  const cleanFiltersDate = formData.get("clean-filters-date");

  if (!cleanFiltersDate) {
    return {
      ...prevState,
      success: false,
      message: "Champ obligatore",
    };
  }

  // Get exists file
  const filePath = path.resolve("./data/data.json");
  const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
  const equipments = JSON.parse(jsonData) as Equipments;

  // Map & Find equipment
  const mapEquipments = equipments.equipments.map((eqp) => {
    if (
      prevState.equipment.maxCapacityFilters &&
      eqp.id === prevState.equipment.id
    ) {
      const lastCleanedFiltersDate = cleanFiltersDate.toString();
      eqp.nextCleanFiltersDate = getNextCleanFiltersDate(
        lastCleanedFiltersDate
      );
    }

    return eqp;
  });

  const data: Equipments = { equipments: [] };
  data.equipments = mapEquipments;

  // Update by writting file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  revalidatePath("/");

  return {
    ...prevState,
    success: true,
    message: "Opération réusit",
  };
};

export default cleanFilters;
