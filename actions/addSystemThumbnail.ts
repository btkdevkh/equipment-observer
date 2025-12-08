"use server";

import fs from "fs";
import path from "path";
import { Equipments, IEquipment } from "@/types/Equipment";
import { revalidatePath } from "next/cache";

const addSystemThumbnail = async (
  equipment: IEquipment,
  formData: FormData
) => {
  const thumbnail = formData.get("thumbnail");

  if (!thumbnail) {
    return;
  }

  // Formatting file
  let newFileName: string | null = null;
  if (thumbnail) {
    const buffer = await (thumbnail as File).arrayBuffer();

    const modelNameFormat = equipment.model
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

  // Get exists file
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
  const equipments = JSON.parse(jsonData) as Equipments;

  // Map & Find equipment
  const mapEquipments = equipments.equipments.map((eqp) => {
    if (eqp.id === equipment.id) {
      eqp.thumbnail = newFileName?.toLowerCase() ?? "n/a";
    }

    return eqp;
  });

  const data: Equipments = { equipments: [] };
  data.equipments = mapEquipments;

  // Update by writting file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  revalidatePath("/");
};

export default addSystemThumbnail;
