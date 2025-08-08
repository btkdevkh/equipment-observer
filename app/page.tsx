import HeadingTitle from "@/components/HeadingTitle";
import MoreInfo from "@/components/MoreInfo";
import WeeplowStatus from "@/components/WeeplowStatus";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-[480px] mx-auto">
      {/* Title */}
      <HeadingTitle />
      <br />

      <div className="ml-1 flex flex-col gap-5">
        {/* Status */}
        <WeeplowStatus />

        {/* Hero */}
        <Image
          src="/hero.png"
          width={600}
          height={100}
          alt="Hero"
          className="rounded"
        />

        <div className="">
          <MoreInfo />
        </div>
      </div>
    </div>
  );
}
