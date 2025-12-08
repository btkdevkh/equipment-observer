"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { Equipments, IEquipment } from "@/types/Equipment";

const addLiters = async (
  prevState: { equipment: IEquipment },
  formData: FormData
) => {
  const nbLiters = formData.get("nb-liters");

  if (!nbLiters) {
    return {
      ...prevState,
      success: false,
      message: "Champ obligatoire",
    };
  }

  // Get exists file
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
  const equipments = JSON.parse(jsonData) as Equipments;

  // Map & Find equipment
  const mapEquipments = equipments.equipments.map((eqp) => {
    if (
      prevState.equipment.maxCapacityFilters &&
      eqp.id === prevState.equipment.id
    ) {
      const liters = Number(eqp.litersUsed ?? 0) + Number(nbLiters);
      eqp.litersUsed = liters;
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
    message: "Ajout success",
  };
};

export default addLiters;
