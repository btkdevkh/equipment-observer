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
        <div className="w-full border-2 border-[#7FEBF8] rounded p-1  overflow-hidden">
          <Image
            src={
              equipment.thumbnail
                ? `/thumbnails/${equipment.thumbnail}`
                : "/thumbnails/no_image.png"
            }
            width={300}
            height={300}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "contain",
            }}
            alt={equipment.model}
            className="rounded"
          />
        </div>
      ) : (
        <AddSystemThumbnailForm equipment={equipment} />
      )}
    </>
  );
};

export default Thumbnail;
