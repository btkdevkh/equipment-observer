"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { Equipments, IEquipment } from "@/types/Equipment";

const deleteSystem = async (
  prevState: { equipment: IEquipment; success: boolean; message: string },
  formData: FormData
) => {
  if (!prevState.equipment.id) {
    return {
      ...prevState,
      success: false,
      message: "Identifiant obligatoire",
    };
  }

  // Get exists file
  const filePath = path.resolve("./data/data.json");
  const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
  const equipments = JSON.parse(jsonData) as Equipments;

  // Map & Find equipment
  const filteredEquipments = equipments.equipments.filter(
    (eqp) => eqp.id !== prevState.equipment.id
  );

  const data: Equipments = { equipments: [] };
  data.equipments = filteredEquipments;

  // Update by writting file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  revalidatePath("/");

  return {
    ...prevState,
    success: true,
    message: "Opération réussit",
  };
};

export default deleteSystem;
