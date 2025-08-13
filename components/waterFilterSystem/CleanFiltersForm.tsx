import fs from "fs";
import path from "path";
import { Equipments, IEquipment } from "@/types/Equipment";
import { revalidatePath } from "next/cache";
import { getNextCleanFiltersDate } from "@/functions/functions";

type CleanFiltersFormProps = {
  equipment: IEquipment;
  nextCleanFiltersDate?: string;
};

const CleanFiltersForm = ({
  equipment,
  nextCleanFiltersDate,
}: CleanFiltersFormProps) => {
  const cleanFilters = async (formData: FormData) => {
    "use server";

    const cleanFiltersDate = formData.get("clean-filters-date");

    if (!cleanFiltersDate) {
      return;
    }

    // Get exists Nb liters
    const filePath = path.resolve(process.cwd(), "data.json");
    const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
    const equipments = JSON.parse(jsonData) as Equipments;

    // Find equipment
    const mapEquipments = equipments.equipments.map((eqp) => {
      if (equipment.maxCapacityFilters && eqp.id === equipment.id) {
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
  };

  return (
    <>
      <form action={cleanFilters} className="flex gap-2">
        <input
          type="hidden"
          name="clean-filters-date"
          value={nextCleanFiltersDate}
        />
        <input
          type="submit"
          value="Valider"
          title="À valider si les filtres ont été nettoyés"
          className="bg-green-700 px-2 text-sm font-semibold cursor-pointer rounded"
        />
      </form>
    </>
  );
};

export default CleanFiltersForm;
