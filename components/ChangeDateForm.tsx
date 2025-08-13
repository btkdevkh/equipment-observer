import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { getKeyFromKey } from "./AddSystemForm";
import { Category, Equipments, IEquipment } from "@/types/Equipment";
import { getNextChangeDateInterval } from "@/functions/functions";

type ChangeFiltersFormProps = {
  equipment: IEquipment;
  nextChangeDate?: string;
};

const ChangeDateForm = ({
  equipment,
  nextChangeDate,
}: ChangeFiltersFormProps) => {
  const changeFilters = async (formData: FormData) => {
    "use server";

    const changeDate = formData.get("change-date");

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
        equipment.category ===
          getKeyFromKey(Category, Category.COFFEE_MACHINE) &&
        eqp.id === equipment.id
      ) {
        const lastChangedDescalDate = changeDate.toString();
        eqp.nextDescalingDate = getNextChangeDateInterval(
          lastChangedDescalDate,
          3
        );
      }

      if (
        equipment.category === getKeyFromKey(Category, Category.TREADMILL) &&
        eqp.id === equipment.id
      ) {
        const lastChangedOilDate = changeDate.toString();
        eqp.nextChangeOilDate = getNextChangeDateInterval(
          lastChangedOilDate,
          3
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

  return (
    <>
      <form action={changeFilters} className="flex gap-2">
        <input type="hidden" name="change-date" value={nextChangeDate} />
        <input
          type="submit"
          value="Valider"
          title="À valider si l'action a été fait"
          className="bg-green-700 px-2 text-sm font-semibold cursor-pointer rounded"
        />
      </form>
    </>
  );
};

export default ChangeDateForm;
