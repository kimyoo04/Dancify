import { ImageLoaderProps } from "next/image";

const localImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default localImageLoader;
