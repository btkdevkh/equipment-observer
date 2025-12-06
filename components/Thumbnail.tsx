import { IEquipment } from "@/types/Equipment";
import Image from "next/image";
import AddSystemThumbnailForm from "./AddSystemThumbnailForm";

type ThumbnailProps = {
  equipment: IEquipment;
};

const Thumbnail = ({ equipment }: ThumbnailProps) => {
  return (
    <>
      {equipment.thumbnail ? (
        <div className="w-full h-[300px] flex items-center border-2 border-[#7FEBF8] rounded p-1  overflow-hidden">
          <Image
            src={
              equipment.thumbnail
                ? `/equipmentobs/thumbnails/${equipment.thumbnail}`
                : `/equipmentobs/thumbnails/no_image.png`
            }
            width={300}
            height={300}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              scale: 0.8,
            }}
            alt={equipment.model}
            className="rounded"
            unoptimized={true}
          />
        </div>
      ) : (
        <AddSystemThumbnailForm equipment={equipment} />
      )}
    </>
  );
};

export default Thumbnail;
