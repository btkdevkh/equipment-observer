import { IEquipment } from "@/types/Equipment";
import addSystemThumbnail from "@/actions/addSystemThumbnail";

type AddSystemThumbnailFormProps = {
  equipment: IEquipment;
};

const AddSystemThumbnailForm = ({ equipment }: AddSystemThumbnailFormProps) => {
  const addSystemThumbnailWithEquipment = addSystemThumbnail.bind(
    null,
    equipment
  );

  return (
    <>
      <form
        action={addSystemThumbnailWithEquipment}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col text-gray-400">
          <label>Ajouter l&apos;image de l&apos;appareil</label>
          <input
            type="file"
            name="thumbnail"
            className="p-2 border border-[#37436a] rounded outline-0"
          />
        </div>

        <div>
          <input
            type="submit"
            value="Ajouter"
            className="w-full bg-[#3d3d76] p-2 rounded font-semibold cursor-pointer"
          />
        </div>
      </form>
    </>
  );
};

export default AddSystemThumbnailForm;
