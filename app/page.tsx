import fs from "fs";
import path from "path";
import HeadingTitle from "@/components/HeadingTitle";
import MoreInfo from "@/components/MoreInfo";
import WeeplowStatus from "@/components/WeeplowStatus";
import Image from "next/image";
import { IWeeplow } from "@/types/Weeplow";
import AddWaterSystemForm from "@/components/AddWaterSystemForm";

export default function Home() {
  const filePath = path.resolve(process.cwd(), "data.json");
  const jsonData = fs.readFileSync(filePath, { encoding: "utf8" });
  const weeplow = JSON.parse(jsonData) as IWeeplow;

  return (
    <div className="max-w-[1024px] mx-auto">
      {!weeplow.id ? (
        <>
          {/* Title */}
          <HeadingTitle title="« Vous venez d'acquérir votre système de filtration d'eau par gravité, ajoutez-le au programme pour un meilleur suivi. »" />
          <br />

          <div className="ml-1 flex flex-col gap-5">
            {/* Add water system tank */}
            <AddWaterSystemForm />

            <br />
            <div className="">
              <MoreInfo />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Title */}
          <HeadingTitle title="« L'état de votre système de filtration d'eau par gravité. »" />
          <br />

          <div className="ml-1 flex flex-col gap-3">
            {/* Status */}
            <WeeplowStatus />

            {/* Hero */}
            <Image
              src="/hero.png"
              width={600}
              height={100}
              alt="Hero"
              className="rounded w-full md:hidden"
            />

            <div className="">
              <MoreInfo />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
