import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../common/Button/Button";
import ImageInput from "./ImageInput";
import { useEffect, useState } from "react";
import { me } from "@/lib/services/users";
import TextInput from "./PasswordInput";
import AlertModal from "../modal/alert";
import { postProfileImageToServer } from "@/lib/util/postImageToServer";
import { useToggle } from "usehooks-ts";

export interface ProfileChangeFormProps {
  email: string;
  nickname: string;
  profileImageUrl: string | undefined | Blob;
}

function ProfileChangeForm({ myData, getMeData }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<ProfileChangeFormProps>({
    shouldUnregister: false,
  });

  const [alertValue, alertToggle, setAlertValue] = useToggle();

  const [modalProfileSuccess, setModalProfileSuccess] = useState(false);

  useEffect(() => {
    setValue("email", myData?.email);
    setValue("nickname", myData?.nickname);
    setValue("profileImageUrl", myData?.profileImageUrl);
  }, [myData]);

  const onSubmit: SubmitHandler<ProfileChangeFormProps> = async (data) => {
    console.log(data.profileImageUrl);
    try {
      let formData = { nickname: data.nickname, profileImageUrl: data.profileImageUrl };

      if (data.profileImageUrl instanceof File) {
        const selectedImage = data.profileImageUrl;
        const imageUrl = await postProfileImageToServer(selectedImage);
        if (imageUrl) {
          formData.profileImageUrl = imageUrl;
        }
      }
      const updateMe = await me("put", formData);
      const newImgSrc = updateMe.data.profileImageUrl;
      setValue("profileImageUrl", newImgSrc);
      setAlertValue(true);
      getMeData();
    } catch (error) {
      console.error("프로필을 변경하지 못했습니다!");
    }
  };

  return (
    <>
      {alertValue && <AlertModal modalType="alert" onClose={alertToggle} alertType="profileSuccess" />}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col tablet:gap-24 gap-16">
        <div className="flex flex-col items-start gap-24 tablet:flex-row tablet:gap-16 tablet:items-center">
          <ImageInput
            type="file"
            id="profileImageUrl"
            imgUrl={getValues("profileImageUrl")}
            register={register}
            setValue={setValue}
          />
          <div className="flex flex-col w-full gap-16 tablet:gap-20 grow tablet:mt-0">
            <TextInput
              type="text"
              id="email"
              register={register}
              labelTitle="이메일"
              placeholder="이메일을 입력해 주세요."
              disabled={true}
            />
            <TextInput
              type="text"
              id="nickname"
              register={register}
              errors={errors}
              validation={{
                required: "닉네임을 입력해주세요",
              }}
              labelTitle="닉네임"
              placeholder="닉네임을 입력해 주세요."
            />
          </div>
        </div>
        <div className="flex justify-end tablet:text-14 text-12">
          <Button variant="filled_4" buttonType="comment" type="submit">
            저장
          </Button>
        </div>
      </form>
    </>
  );
}

export default ProfileChangeForm;
