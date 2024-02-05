import { ServiceResponse } from "../services/axios";
import { cardUpload } from "../services/columns";

export const postImageToServer = async (selectedImage: File, columnId: number): Promise<string> => {
  const formData = new FormData();
  if (selectedImage) {
    formData.append("image", selectedImage);
    const response = (await cardUpload(columnId, formData)) as ServiceResponse<{ imageUrl: string }>;
    if (response && response.data && response.data.imageUrl) {
      return response.data.imageUrl;
    }
  }
  return "";
};
