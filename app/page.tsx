import fs from "fs";
import path from "path";
import HeadingTitle from "@/components/HeadingTitle";
import { Equipments } from "@/types/Equipment";
import Equipment from "@/components/Equipment";
import AddSystemForm from "@/components/AddSystemForm";
import AppDatetime from "@/components/AppDatetime";
import MoreInfo from "@/components/MoreInfo";
import Link from "next/link";
import { sortedDateStrDESC } from "@/helpers/sortedDateStrDESC";

export default function Home() {
  const filePath = path.resolve(process.cwd(), "data.json");

  // Read existing file content
  let data: Equipments = { equipments: [] };
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    if (fileContent) {
      data = JSON.parse(fileContent);
    }
  } else {
    // Create file with default data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  }

  if (data.equipments.length === 0) {
    return (
      <div className="max-w-[1024px] mx-auto">
        <div className="max-w-[524px] mx-auto">
          {/* Title */}
          <HeadingTitle title="« Vous venez d'acquérir votre appareil / système, ajoutez-le au programme pour un meilleur suivi. »" />
          <br />

          <div className="ml-1 flex flex-col gap-5">
            {/* Add system */}
            <AddSystemForm />

            <small>
              Vous n&apos;avez aucun système / appareil, ajoutez-en!
            </small>
          </div>
        </div>
      </div>
    );
  }

  const sortedEquipmentsByDateStrDESC = sortedDateStrDESC(data.equipments);

  return (
    <div className="max-w-full mx-auto">
      <>
        {/* Title */}
        <HeadingTitle title="« L'état de votre systèmes / appareils. »" />
        <br />

        <div className="ml-1 flex flex-col gap-3">
          {/* Datetime */}
          <AppDatetime initialDate={new Date().toISOString()} />

          {/* Status */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sortedEquipmentsByDateStrDESC.map((equipment, index) => (
              <Equipment
                key={equipment.id}
                equipment={equipment}
                index={index + 1}
              />
            ))}
          </div>

          <Link
            href="/create"
            className="md:w-fit text-center border-2 border-[#7FEBF8] bg-[#1a3b4f] py-2 px-4 font-bold rounded"
          >
            Ajouter un système / appareil
          </Link>

          <br />
          <MoreInfo />
        </div>
      </>
    </div>
  );
}
