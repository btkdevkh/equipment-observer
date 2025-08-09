import fs from "fs";
import path from "path";
import { IWeeplow } from "@/types/Weeplow";
import { getNextChangeFiltersDate } from "./WeeplowStatus";
import { revalidatePath } from "next/cache";

type ChangeFiltersFormProps = {
  nextChangeFiltersDate?: string;
};

const ChangeFiltersForm = ({
  nextChangeFiltersDate,
}: ChangeFiltersFormProps) => {
  const changeFilters = async (formData: FormData) => {
    "use server";

    const changeFiltersDate = formData.get("change-filters-date");

    if (!changeFiltersDate) {
      return;
    }

    // Get exists Nb liters
    const filePath = path.resolve(process.cwd(), "data.json");
    const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
    const weeplow = JSON.parse(jsonData) as IWeeplow;

    const lastChangedFiltersDate = new Date(changeFiltersDate.toString());

    weeplow.nextChangeFiltersDate = getNextChangeFiltersDate(
      lastChangedFiltersDate
    );

    // Update
    fs.writeFileSync(filePath, JSON.stringify(weeplow));

    // "Refresh" by re-reading the file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
      }
    });

    revalidatePath("/");
  };

  return (
    <>
      <form action={changeFilters} className="flex gap-2">
        <input
          type="hidden"
          name="change-filters-date"
          value={nextChangeFiltersDate}
          className="w-full px-2 border border-[#37436a] rounded outline-0 placeholder:text-sm"
        />
        <input
          type="submit"
          value="Valider"
          title="À valider si les filtres ont été changés"
          className="bg-green-700 px-2 rounded text-sm font-semibold cursor-pointer"
        />
      </form>
    </>
  );
};

export default ChangeFiltersForm;
