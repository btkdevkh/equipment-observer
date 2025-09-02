import fs from "fs";
import path from "path";
import { Equipments, IEquipment } from "@/types/Equipment";
import { revalidatePath } from "next/cache";

type AddSystemThumbnailFormProps = {
  equipment: IEquipment;
};

const AddSystemThumbnailForm = ({ equipment }: AddSystemThumbnailFormProps) => {
  const createSystemThumbnail = async (formData: FormData) => {
    "use server";

    const thumbnail = formData.get("thumbnail");

    if (!thumbnail) {
      return;
    }

    // Formatting file
    let newFileName: string | null = null;
    if (thumbnail) {
      const buffer = await (thumbnail as File).arrayBuffer();

      const modelNameFormat = equipment.model
        .replaceAll(" ", "_")
        .replaceAll(/[\/,?*]/g, "");

      newFileName = modelNameFormat + path.extname((thumbnail as File).name);

      const uploadDir = path.join(process.cwd(), "public/thumbnails");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, newFileName.toLowerCase());
      fs.writeFileSync(filePath, Buffer.from(buffer));
    }

    // Get exists file
    const filePath = path.resolve(process.cwd(), "data.json");
    const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
    const equipments = JSON.parse(jsonData) as Equipments;

    // Map & Find equipment
    const mapEquipments = equipments.equipments.map((eqp) => {
      if (eqp.id === equipment.id) {
        eqp.thumbnail = newFileName?.toLowerCase() ?? "n/a";
      }

      return eqp;
    });

    const data: Equipments = { equipments: [] };
    data.equipments = mapEquipments;

    // Update by writting file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    revalidatePath("/");
  };

  return (
    <>
      <form action={createSystemThumbnail} className="flex flex-col gap-3">
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
