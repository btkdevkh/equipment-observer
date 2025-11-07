"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { Category, Equipments, IEquipment } from "@/types/Equipment";
import {
  getCurrentDate,
  getKeyFromKey,
  getNextChangeDateInterval,
} from "@/functions/functions";

const changeDate = async (equipment: IEquipment, formData: FormData) => {
  const changeDate = formData.get("change-date");
  const nbMonth = formData.get("nb-month");
  const type = formData.get("type");

  if (!changeDate) {
    return;
  }

  // Get exists Nb liters
  const filePath = path.resolve(process.cwd(), "data.json");
  const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
  const equipments = JSON.parse(jsonData) as Equipments;

  // Find equipment
  const mapEquipments = equipments.equipments.map((eqp) => {
    if (
      equipment.category === getKeyFromKey(Category, Category.COFFEE_MACHINE) &&
      eqp.id === equipment.id
    ) {
      const lastChangedDescalDate =
        eqp.model !== "Delonghi ECAM22.110.B"
          ? changeDate.toString()
          : getCurrentDate();
      eqp.nextDescalingDate = getNextChangeDateInterval(
        lastChangedDescalDate,
        3
      );
    }

    // Kettle
    if (
      equipment.category === getKeyFromKey(Category, Category.KETTLE) &&
      eqp.id === equipment.id
    ) {
      const lastChangedDescalDate = changeDate.toString();
      eqp.nextDescalingDate = getNextChangeDateInterval(
        lastChangedDescalDate,
        1
      );
    }

    // Treadmill
    if (
      equipment.category === getKeyFromKey(Category, Category.TREADMILL) &&
      eqp.id === equipment.id
    ) {
      const lastChangedOilDate = changeDate.toString();
      eqp.nextChangeOilDate = getNextChangeDateInterval(lastChangedOilDate, 3);
    }

    // Robot vacuum
    if (
      equipment.category === getKeyFromKey(Category, Category.ROBOT_VACUUM) &&
      eqp.id === equipment.id
    ) {
      const lastChangedFiltereDate = changeDate.toString();
      const lastChangedMainBrushDate = changeDate.toString();
      const lastChangedLateralBrushDate = changeDate.toString();

      if (nbMonth && Number(nbMonth) === 6 && type && type === "Filter") {
        eqp.nextChangeFilterDate = getNextChangeDateInterval(
          lastChangedFiltereDate,
          6
        );
      } else if (
        nbMonth &&
        Number(nbMonth) === 6 &&
        type &&
        type === "Lateral Brush"
      ) {
        eqp.nextChangeLateralBrushDate = getNextChangeDateInterval(
          lastChangedLateralBrushDate,
          6
        );
      } else {
        eqp.nextChangeMainBrushDate = getNextChangeDateInterval(
          lastChangedMainBrushDate,
          12
        );
      }
    }

    return eqp;
  });

  const data: Equipments = { equipments: [] };
  data.equipments = mapEquipments;

  // Update by writting file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  revalidatePath("/");
};

export default changeDate;
