"use server";

import fs from "fs";
import path from "path";
import fsPromise from "fs/promises";
import { Equipments } from "@/types/Equipment";

const getEquipments = async () => {
  const filePath = path.resolve("./data/data.json");

  // Read existing file content
  let data: Equipments = { equipments: [] };
  if (fs.existsSync(filePath)) {
    const fileContent = await fsPromise.readFile(filePath, "utf-8");

    if (fileContent) {
      data = JSON.parse(fileContent);
    }
  } else {
    // Create file with default data
    await fsPromise.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  }

  return data;
};

export default getEquipments;
