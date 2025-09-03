import { IEquipment } from "@/types/Equipment";
import addLiters from "@/actions/addLiters";

type AddLitersFormProps = {
  equipment: IEquipment;
};

const AddLitersForm = ({ equipment }: AddLitersFormProps) => {
  const addLitersWithEquipment = addLiters.bind(null, equipment);

  return (
    <>
      <form action={addLitersWithEquipment} className="flex gap-2">
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
