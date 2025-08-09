import { IWeeplow } from "@/types/Weeplow";
import fs from "fs";
import { revalidatePath } from "next/cache";
import path from "path";

const AddLitersForm = () => {
  const createLiter = async (formData: FormData) => {
    "use server";

    const nbLiters = formData.get("nb-liters");

    // Get exists Nb liters
    const filePath = path.resolve(process.cwd(), "data.json");
    const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
    const weeplow = JSON.parse(jsonData) as IWeeplow;

    const liters = Number(weeplow.litersUsed ?? 0) + Number(nbLiters);
    weeplow.litersUsed = liters;

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
      <form action={createLiter} className="flex gap-2">
        <input
          type="number"
          name="nb-liters"
          id="nb-liters"
          placeholder="Ajouter (L)"
          className="w-full px-2 md:py-1 border border-[#37436a] rounded outline-0"
          min={1}
        />
        <input
          type="submit"
          value="Valider"
          className="bg-green-700 px-2 md:px-7 rounded text-sm md:text-2xl font-semibold cursor-pointer"
        />
      </form>
    </>
  );
};

export default AddLitersForm;
