import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { UseFormRegister, UseFormSetValue, useForm } from "react-hook-form";
import { ProfileChangeFormProps } from "./ProfileChangeForm";

interface ImgaeInputProps {
  type: string;
  id: "profileImageUrl";
  imgUrl?: any;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<ProfileChangeFormProps>;
}

function ImageInput({ type, id, imgUrl, register, setValue }: ImgaeInputProps) {
  const { watch } = useForm();
  const avatar = watch("image");
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (imgUrl) {
      setAvatarPreview(imgUrl);
    }
  }, [imgUrl]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
      setValue("profileImageUrl", file);
    }
  };

  return (
    <label className="bg-[#F5F5F5] rounded-6 w-100 h-100 tablet:w-182 tablet:h-182 flex items-center justify-center shrink-0 overflow-hidden cursor-pointer">
      <input
        type={type}
        id={id}
        className="hidden"
        {...register("profileImageUrl")}
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="relative w-full h-full">
        {avatarPreview ? (
          <Image
            fill
            src={avatarPreview}
            alt="프로필 사진"
            style={{ objectFit: "cover" }}
            priority
            sizes="(max-width: 744px) 100vw, (max-width: 1199px) 50vw, 25vw"
          />
        ) : (
          <div className="relative w-20 h-20 tablet:w-30 tablet:h-30">
            <Image src="/images/add.png" alt="프로필 추가 아이콘" fill priority={true} />
          </div>
        )}
      </div>
    </label>
  );
}

export default ImageInput;
