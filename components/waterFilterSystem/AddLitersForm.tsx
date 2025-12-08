"use client";

import { IEquipment } from "@/types/Equipment";
import addLiters from "@/actions/addLiters";
import { IoMdAdd } from "react-icons/io";
import { useActionState, useEffect } from "react";

type AddLitersFormProps = {
  equipment: IEquipment;
};

const AddLitersForm = ({ equipment }: AddLitersFormProps) => {
  const [state, formAction, isPending] = useActionState(addLiters, {
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
      <form action={formAction} className="flex items-center gap-2 w-full">
        <input
          type="number"
          name="nb-liters"
          id="nb-liters"
          placeholder="Ajouter le nombre de litre d'eau remplis"
          className="w-full px-2 py-1 border text-sm border-[#37436a] outline-0 rounded"
          min={1}
        />

        <button type="submit" className="text-gray-400 hover:text-gray-200">
          <IoMdAdd size={25} className="cursor-pointer" title="Ajouter" />
        </button>
      </form>
    </>
  );
};

export default AddLitersForm;
