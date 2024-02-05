import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImgaeInputProps } from "./ImageInput";

export function ImageInput({ type, id, imgUrl, register }: ImgaeInputProps) {
  //
  const { watch } = useForm();
  const avatar = watch("image");
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const fileList = event.target.files;
  //   if (fileList && fileList.length > 0) {
  //     const file = fileList[0];
  //     watch("image", file);
  //     setImagePreview(URL.createObjectURL(file));
  //   }
  // };
  // const handleImgaeUpload = () => {
  //   const imageInput = document.getElementById("imageInput") as HTMLInputElement;
  //   imageInput.click();
  // };
  //
  return (
    <button onClick={handleImgaeUpload}>
      <div className="bg-[#F5F5F5] rounded-6 w-100 h-100 tablet:w-182 tablet:h-182 flex items-center justify-center shrink-0 relative overflow-hidden">
        <input type={type} id={id} className="hidden" {...register("image")} accept="image/*" />
        {avatarPreview ? (
          <Image fill src={avatarPreview} alt="프로필 사진" />
        ) : (
          <div className="relative w-20 h-20 tablet:w-30 tablet:h-30">
            <Image src="/images/add.png" alt="프로필 추가 아이콘" fill priority={true} />
          </div>
        )}

        {/* <button onClick={handleImgaeUpload}>
            {imgUrl ? <Image fill src={imagePreview} alt="프로필 사진" /> : ""}
            {imgUrl ? (
              
            ) : (
              <div className="relative w-20 h-20 tablet:w-30 tablet:h-30">
                <Image src="/images/add.png" alt="프로필 추가 아이콘" fill priority={true} />
              </div>
            )}
          </button> */}

        {/* <input
            type={type}
            id={id}
            className="hidden"
            {...register("image")}
            accept="image/*"
            // onChange={handleFileChange}
          />
          <button onClick={handleImgaeUpload}>
            {imgUrl ? <Image fill src={imagePreview} alt="프로필 사진" /> : ""}
            {imgUrl ? (
              ""
            ) : (
              <div className="relative w-20 h-20 tablet:w-30 tablet:h-30">
                <Image src="/images/add.png" alt="프로필 추가 아이콘" fill priority={true} />
              </div>
            )}
          </button> */}
      </div>
    </button>
  );
}
