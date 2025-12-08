import { IEquipment } from "@/types/Equipment";
import Image from "next/image";
import AddSystemThumbnailForm from "./forms/AddSystemThumbnailForm";

const mode = process.env.NODE_ENV !== "development" ? "/equipmentobs" : "";

type ThumbnailProps = {
  equipment: IEquipment;
};

const Thumbnail = ({ equipment }: ThumbnailProps) => {
  return (
    <>
      {equipment.thumbnail ? (
        <div className="relative w-full bg-white border border-gray-200 rounded p-4">
          <div className="relative w-full h-[230px] flex items-center justify-center overflow-hidden">
            <Image
              src={`${mode}/thumbnails/${equipment.thumbnail}`}
              fill
              alt={equipment.model}
              unoptimized={true}
              className="object-contain p-2"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="relative w-full bg-white border border-gray-200 rounded p-4">
            <div className="relative w-full h-[230px] flex items-center justify-center overflow-hidden">
              <Image
                src={`${mode}/no_image.png`}
                fill
                alt={equipment.model}
                unoptimized={true}
                className="object-contain p-2"
              />
            </div>
          </div>
          <AddSystemThumbnailForm equipment={equipment} />
        </>
      )}
    </>
  );
};

export default Thumbnail;
