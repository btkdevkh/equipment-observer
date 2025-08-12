import { IEquipment } from "@/types/Equipment";

export const sortedDateStrDESC = (equipments: IEquipment[]) => {
  return equipments.sort((a, b) => {
    const [dayA, monthA, yearA] = a.buyDate.split("/").map(Number);
    const [dayB, monthB, yearB] = b.buyDate.split("/").map(Number);

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateB.getTime() - dateA.getTime(); // Descending
  });
};
