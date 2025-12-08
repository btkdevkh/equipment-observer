"use client";

import changeFilters from "@/actions/changeFilters";
import { IEquipment } from "@/types/Equipment";
import { useActionState, useEffect } from "react";

type ChangeFiltersFormProps = {
  equipment: IEquipment;
  nextChangeFiltersDate?: string;
};

const ChangeFiltersForm = ({
  equipment,
  nextChangeFiltersDate,
}: ChangeFiltersFormProps) => {
  const [state, formAction, isPending] = useActionState(changeFilters, {
    equipment,
    success: false,
    message: "",
  });

  useEffect(() => {
    if (!state.success && state.message) {
      alert(state.message);
    }
  }, [state]);

  return (
    <>
      <form action={formAction} className="flex gap-2">
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
