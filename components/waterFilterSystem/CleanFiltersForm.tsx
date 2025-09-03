import { IEquipment } from "@/types/Equipment";
import cleanFilters from "@/actions/cleanFilters";

type CleanFiltersFormProps = {
  equipment: IEquipment;
  nextCleanFiltersDate?: string;
};

const CleanFiltersForm = ({
  equipment,
  nextCleanFiltersDate,
}: CleanFiltersFormProps) => {
  const cleanFiltersWithEquipment = cleanFilters.bind(null, equipment);

  return (
    <>
      <form action={cleanFiltersWithEquipment} className="flex gap-2">
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
