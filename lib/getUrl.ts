import { storage } from "@/appwrite";

export const getUrl = async (image: Image) => {
  const url = storage.getFileView(image.bucketId, image.fileId);

  return url;
};
