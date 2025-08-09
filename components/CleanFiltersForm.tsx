import fs from "fs";
import path from "path";
import { IWeeplow } from "@/types/Weeplow";
import { getNextCleanFiltersDate } from "./WeeplowStatus";
import { revalidatePath } from "next/cache";

type CleanFiltersFormProps = {
  nextCleanFiltersDate?: string;
};

const CleanFiltersForm = ({ nextCleanFiltersDate }: CleanFiltersFormProps) => {
  const cleanFilters = async (formData: FormData) => {
    "use server";

    const cleanFiltersDate = formData.get("clean-filters-date");

    if (!cleanFiltersDate) {
      return;
    }

    // Get exists Nb liters
    const filePath = path.resolve(process.cwd(), "data.json");
    const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
    const weeplow = JSON.parse(jsonData) as IWeeplow;

    const lastCleanedFiltersDate = new Date(cleanFiltersDate.toString());

    weeplow.nextCleanFiltersDate = getNextCleanFiltersDate(
      lastCleanedFiltersDate
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
      <form action={cleanFilters} className="flex gap-2">
        <input
          type="hidden"
          name="clean-filters-date"
          value={nextCleanFiltersDate}
          className="w-full px-2 border border-[#37436a] rounded outline-0 placeholder:text-sm"
        />
        <input
          type="submit"
          value="Valider"
          title="À valider si les filtres ont été nettoyés"
          className="bg-green-700 px-2 rounded text-sm font-semibold cursor-pointer"
        />
      </form>
    </>
  );
};

export default CleanFiltersForm;
