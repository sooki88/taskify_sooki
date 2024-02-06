import { ServiceResponse } from "../services/axios";
import { cardUpload } from "../services/columns";
import { meUpload } from "../services/users";

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

export const postProfileImageToServer = async (selectedImage: File): Promise<string> => {
  const formData = new FormData();
  if (selectedImage) {
    formData.append("image", selectedImage);
    const response = await meUpload(formData);
    if (response && response.data && response.data.profileImageUrl) {
      return response.data.profileImageUrl;
    }
  }
  return "";
};
