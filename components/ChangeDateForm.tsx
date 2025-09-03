import { IEquipment } from "@/types/Equipment";
import changeDate from "@/actions/changeDate";

type ChangeFiltersFormProps = {
  equipment: IEquipment;
  nextChangeDate?: string;
};

const ChangeDateForm = ({
  equipment,
  nextChangeDate,
}: ChangeFiltersFormProps) => {
  const changeDateWithEquipment = changeDate.bind(null, equipment);

  return (
    <>
      <form action={changeDateWithEquipment} className="flex gap-2">
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
