"use server";

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Category, Equipments, IEquipment } from "@/types/Equipment";
import {
  getNextChangeFiltersDate,
  getNextChangeDateInterval,
  getNextCleanFiltersDate,
  getKeyFromValue,
} from "@/functions/functions";

const addEquipment = async (formData: FormData) => {
  const category = formData.get("category");
  const modelName = formData.get("model-name");
  const buyDate = formData.get("buy-date");
  const putIntoServiceDate = formData.get("put-into-service-date");
  const maxCapacityFilters = formData.get("max-capacity-filters");
  const thumbnail = formData.get("thumbnail");

  if (!category || !modelName || !buyDate || !putIntoServiceDate) {
    return;
  }

  // Formatting file
  let newFileName: string | null = null;
  if (thumbnail) {
    const buffer = await (thumbnail as File).arrayBuffer();

    const modelNameFormat = (modelName as string)
      .replaceAll(" ", "_")
      .replaceAll(/[\/,?*]/g, "");

    newFileName = modelNameFormat + path.extname((thumbnail as File).name);

    const uploadDir = path.join(process.cwd(), "public/thumbnails");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, newFileName.toLowerCase());
    fs.writeFileSync(filePath, Buffer.from(buffer));
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
    thumbnail: newFileName?.toLowerCase() ?? "n/a",
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

  // Uniquement pour le bouilloir
  if (category === getKeyFromValue(Category, Category.KETTLE)) {
    newEquipment.nextDescalingDate = getNextChangeDateInterval(
      newEquipment.putIntoServiceDate,
      1
    );
  }

  // Uniquement pour le tapis de course
  if (category === getKeyFromValue(Category, Category.TREADMILL)) {
    newEquipment.nextChangeOilDate = getNextChangeDateInterval(
      newEquipment.putIntoServiceDate,
      3
    );
  }

  // Uniquement pour le robo aspirateur
  if (category === getKeyFromValue(Category, Category.ROBOT_VACUUM)) {
    newEquipment.nextChangeMainBrushDate = getNextChangeDateInterval(
      newEquipment.putIntoServiceDate,
      12
    );
    newEquipment.nextChangeLateralBrushDate = getNextChangeDateInterval(
      newEquipment.putIntoServiceDate,
      6
    );
    newEquipment.nextChangeFilterDate = getNextChangeDateInterval(
      newEquipment.putIntoServiceDate,
      6
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

export default addEquipment;
