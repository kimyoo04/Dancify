import Image from "next/image";

import { cn } from "@lib/utils";

import { Album } from "../../data/albums";

interface PreViewVideoPostsProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Album;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export default function PreViewVideoPosts({
  data,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: PreViewVideoPostsProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={data.cover}
          alt={data.name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>

      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{data.name}</h3>
        <p className="text-xs text-muted-foreground">{data.artist}</p>
      </div>
    </div>
  );
}
