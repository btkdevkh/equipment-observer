import { IEquipment } from "@/types/Equipment";
import Image from "next/image";
import AddSystemThumbnailForm from "./forms/AddSystemThumbnailForm";

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
              src={`/equipmentobs/thumbnails/${equipment.thumbnail}`}
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
                src={`/no_image.png`}
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
