import { Category } from "@/types/Equipment";
import { getKeyFromValue } from "@/functions/functions";
import addEquipment from "@/actions/addEquipment";

const AddSystemForm = () => {
  return (
    <>
      <form action={addEquipment} className="flex flex-col gap-3">
        <div className="flex flex-col text-gray-400">
          <label>
            Categories <small className="text-red-700">*</small>
          </label>
          <select
            className="p-2 border border-[#37436a] rounded outline-0"
            name="category"
          >
            {Object.values(Category).map((k) => (
              <option key={k} value={getKeyFromValue(Category, k)}>
                {k}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col text-gray-400">
          <label>
            Nom du model <small className="text-red-700">*</small>
          </label>
          <input
            type="text"
            name="model-name"
            placeholder="Nom du model"
            className="p-2 border border-[#37436a] rounded outline-0"
          />
        </div>
        <div className="flex flex-col text-gray-400">
          <label>
            Date d&apos;acquisition <small className="text-red-700">*</small>
          </label>
          <input
            type="date"
            name="buy-date"
            className="w-full p-2 border border-[#37436a] rounded outline-0"
          />
        </div>
        <div className="flex flex-col text-gray-400">
          <label>
            Date de mise en service <small className="text-red-700">*</small>
          </label>
          <input
            type="date"
            name="put-into-service-date"
            className="w-full p-2 border border-[#37436a] rounded outline-0"
          />
        </div>
        <div className="flex flex-col text-gray-400">
          <label>
            Capacité max des filtres en litres{" "}
            <small>
              (À renseigner uniquement pour le système de filtration
              d&apos;eau.)
            </small>
          </label>
          <input
            type="number"
            name="max-capacity-filters"
            placeholder="Capacité max des filtres en litres"
            className="p-2 border border-[#37436a] rounded outline-0"
          />
        </div>
        <div className="flex flex-col text-gray-400">
          <label>
            Photo<small> (La photo est facultative)</small>
          </label>
          <input
            type="file"
            name="thumbnail"
            className="p-2 border border-[#37436a] rounded outline-0"
          />
        </div>

        <div>
          <input
            type="submit"
            value="Valider"
            className="w-full bg-[#3d3d76] p-2 rounded font-semibold cursor-pointer"
          />
        </div>
      </form>
    </>
  );
};

export default AddSystemForm;
