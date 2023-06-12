import { IFreePost } from "@type/freePosts";
import { IVideoPost } from "@type/videoPosts";

export const isVideoPost = (
  data: IVideoPost | IFreePost
): data is IVideoPost => {
  return (data as IVideoPost).thumbnail !== undefined;
};

export const isFreePost = (data: IVideoPost | IFreePost): data is IFreePost => {
  return (data as IFreePost).postImage !== undefined;
};
