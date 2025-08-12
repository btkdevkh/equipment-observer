import fs from "fs";
import path from "path";
import { Equipments, IEquipment } from "@/types/Equipment";
import { revalidatePath } from "next/cache";
import { getNextChangeFiltersDate } from "@/functions/functions";

type ChangeFiltersFormProps = {
  equipment: IEquipment;
  nextChangeFiltersDate?: string;
};

const ChangeFiltersForm = ({
  equipment,
  nextChangeFiltersDate,
}: ChangeFiltersFormProps) => {
  const changeFilters = async (formData: FormData) => {
    "use server";

    const changeFiltersDate = formData.get("change-filters-date");

    if (!changeFiltersDate) {
      return;
    }

    // Get exists Nb liters
    const filePath = path.resolve(process.cwd(), "data.json");
    const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
    const equipments = JSON.parse(jsonData) as Equipments;

    // Find equipment
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

  return (
    <>
      <form action={changeFilters} className="flex gap-2">
        <input
          type="hidden"
          name="change-filters-date"
          value={nextChangeFiltersDate}
          className="w-full px-2 border border-[#37436a] outline-0 placeholder:text-sm"
        />
        <input
          type="submit"
          value="Valider"
          title="À valider si les filtres ont été changés"
          className="bg-green-700 px-2 text-sm font-semibold cursor-pointer"
        />
      </form>
    </>
  );
};

export default ChangeFiltersForm;
