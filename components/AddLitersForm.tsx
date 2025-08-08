import fs from "fs";
import path from "path";

const AddLitersForm = () => {
  const createLiter = async (formData: FormData) => {
    "use server";

    const dataLiters = formData.get("nb-liters");

    const filePath = path.resolve(process.cwd(), "data.txt");

    // Get exists Nb liters
    const data = fs.readFileSync(filePath, { encoding: "utf8" });

    const finalData = Number(data) + Number(dataLiters);
    fs.writeFileSync(filePath, finalData.toString());

    // "Refresh" by re-reading the file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  };

  return (
    <>
      <form action={createLiter} className="flex gap-2">
        <input
          type="number"
          name="nb-liters"
          id="nb-liters"
          placeholder="Ajouter (L)"
          className="w-full px-2 border border-[#37436a] rounded outline-0 placeholder:text-sm"
          min={1}
        />
        <input
          type="submit"
          value="Valider"
          className="bg-[#3d3d76] px-2 rounded text-sm font-semibold"
        />
      </form>
    </>
  );
};

export default AddLitersForm;
