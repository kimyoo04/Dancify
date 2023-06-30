import Image from "next/image";

export default function PreviewImageFile({ imageFile }: { imageFile: File }) {
  return (
    <div className="w-full">
      <Image
        src={URL.createObjectURL(imageFile)}
        alt="previewImage"
        width={500}
        height={500}
        quality={50}
        className="h-full w-full"
      />
    </div>
  );
}
