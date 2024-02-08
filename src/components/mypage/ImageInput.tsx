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

  const handleFileDelete = () => {
    setAvatarPreview("");
    setValue("profileImageUrl", undefined);
  };

  return (
    <div className="relative">
      {avatarPreview && (
        <div
          className="flex justify-center items-center absolute top-[-10px] left-[-10px] z-modal h-28 w-28 rounded-50 bg-violet text-white border-1 border-violet-F1EF"
          onClick={handleFileDelete}>
          <Image src="/images/close_white.png" alt="삭제 버튼 이미지" width="12" height="12" />
        </div>
      )}
      <label className="bg-[#F5F5F5] rounded-6 w-100 h-100 tablet:w-182 tablet:h-182 flex items-center justify-center shrink-0 overflow-hidden cursor-pointer relative hover:border-2 hover:border-violet">
        <input
          type={type}
          id={id}
          className="hidden"
          {...register("profileImageUrl")}
          accept="image/*"
          onChange={handleFileChange}
        />
        {avatarPreview && avatarPreview.length > 0 ? (
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
            <Image
              src="/images/add.png"
              alt="프로필 추가 아이콘"
              fill
              priority={true}
              sizes="(max-width: 744px) 100vw, (max-width: 1199px) 50vw, 25vw"
            />
          </div>
        )}
      </label>
    </div>
  );
}

export default ImageInput;
