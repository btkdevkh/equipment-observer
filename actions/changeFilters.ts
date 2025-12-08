"use server";

import fs from "fs";
import path from "path";
import { Equipments, IEquipment } from "@/types/Equipment";
import { revalidatePath } from "next/cache";
import { getNextChangeFiltersDate } from "@/functions/functions";

const changeFilters = async (equipment: IEquipment, formData: FormData) => {
  const changeFiltersDate = formData.get("change-filters-date");

  if (!changeFiltersDate) {
    return;
  }

  // Get exists file
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
  const equipments = JSON.parse(jsonData) as Equipments;

  // Map & Find equipment
  const mapEquipments = equipments.equipments.map((eqp) => {
    if (equipment.maxCapacityFilters && eqp.id === equipment.id) {
      const lastChangedFiltersDate = changeFiltersDate.toString();
      eqp.nextChangeFiltersDate = getNextChangeFiltersDate(
        lastChangedFiltersDate
      );
    }

    return eqp;
  });

  const data: Equipments = { equipments: [] };
  data.equipments = mapEquipments;

  // Update by writting file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  revalidatePath("/");
};

export default changeFilters;
