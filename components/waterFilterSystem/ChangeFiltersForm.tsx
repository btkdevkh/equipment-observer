import changeFilters from "@/actions/changeFilters";
import { IEquipment } from "@/types/Equipment";

type ChangeFiltersFormProps = {
  equipment: IEquipment;
  nextChangeFiltersDate?: string;
};

const ChangeFiltersForm = ({
  equipment,
  nextChangeFiltersDate,
}: ChangeFiltersFormProps) => {
  const changeFiltersWithEquipment = changeFilters.bind(null, equipment);

  return (
    <>
      <form action={changeFiltersWithEquipment} className="flex gap-2">
        <input
          type="hidden"
          name="change-filters-date"
          value={nextChangeFiltersDate}
        />
        <input
          type="submit"
          value="Valider"
          title="À valider si les filtres ont été changés"
          className="bg-green-700 px-2 text-sm font-semibold cursor-pointer rounded"
        />
      </form>
    </>
  );
};

export default ChangeFiltersForm;
