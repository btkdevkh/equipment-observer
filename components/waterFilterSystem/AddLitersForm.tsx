import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { Equipments, IEquipment } from "@/types/Equipment";

type AddLitersFormProps = {
  equipment: IEquipment;
};

const AddLitersForm = ({ equipment }: AddLitersFormProps) => {
  const createLiter = async (formData: FormData) => {
    "use server";

    const nbLiters = formData.get("nb-liters");

    // Get exists Nb liters
    const filePath = path.resolve(process.cwd(), "data.json");
    const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
    const equipments = JSON.parse(jsonData) as Equipments;

    // Find equipment
    const mapEquipments = equipments.equipments.map((eqp) => {
      if (equipment.maxCapacityFilters && eqp.id === equipment.id) {
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
  };

  return (
    <>
      <form action={createLiter} className="flex gap-2">
        <input
          type="number"
          name="nb-liters"
          id="nb-liters"
          placeholder="Ajouter (L)"
          className="w-full px-2 border text-sm border-[#37436a] outline-0 rounded"
          min={1}
        />
        <input
          type="submit"
          value="Valider"
          className="bg-green-700 px-3 text-sm font-semibold cursor-pointer rounded"
        />
      </form>
    </>
  );
};

export default AddLitersForm;
