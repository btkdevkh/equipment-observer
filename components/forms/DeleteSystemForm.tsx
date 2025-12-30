"use client";

import deleteSystem from "@/actions/deleteSystem";
import { IEquipment } from "@/types/Equipment";
import { FormEvent, useActionState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

type DeleteSystemFormProps = {
  equipment: IEquipment;
};

const DeleteSystemForm = ({ equipment }: DeleteSystemFormProps) => {
  const [state, formAction, isPending] = useActionState(deleteSystem, {
    equipment,
    success: false,
    message: "",
  });

  useEffect(() => {
    if (!state.success && state.message) {
      alert(state.message);
    }

    if (state.success && state.message) {
      alert(state.message);
    }
  }, [state]);

  const handleConfirmDelete = async (e: FormEvent) => {
    if (!confirm(`Souhaitez-vous supprimer ${equipment.model} ?`)) {
      e.preventDefault();
    }
  };

  return (
    <form
      action={formAction}
      onSubmit={handleConfirmDelete}
      title={`Supprimer ${equipment.model}`}
      className="absolute -top-3 -right-2.5"
    >
      <input type="hidden" value={equipment.id} />
      <button type="submit" className="cursor-pointer">
        <MdDelete color="crimson" size={20} />
      </button>
    </form>
  );
};

export default DeleteSystemForm;
