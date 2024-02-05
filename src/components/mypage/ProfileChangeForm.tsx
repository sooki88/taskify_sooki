import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../common/Button/Button";
import ImageInput from "./ImageInput";
import { useEffect, useState } from "react";
import { me } from "@/lib/services/users";
import TextInput from "./PasswordInput";
import AlertModal from "../modal/alert";

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

  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const [modalProfileSuccess, setModalProfileSuccess] = useState(false);

  useEffect(() => {
    setValue("email", myData?.email);
    setValue("nickname", myData?.nickname);
    setValue("profileImageUrl", myData?.profileImageUrl);
  }, [myData]);

  const onSubmit: SubmitHandler<ProfileChangeFormProps> = async (data) => {
    let formData;

    if (data.profileImageUrl === null) {
      formData = { nickname: data.nickname, profileImageUrl: null };
    } else {
      formData = { nickname: data.nickname, profileImageUrl: data.profileImageUrl };
    }

    try {
      const response = await me("put", formData);
      if (response.errorMessage) {
        setErrorMessage(response.errorMessage);
      } else {
        setValue("profileImageUrl", response.data.profileImageUrl);
        setValue("nickname", response.data.nickname);
        setModalProfileSuccess(true);
        getMeData();
      }
    } catch (error) {
      console.error("프로필을 변경하지 못했습니다!");
    }
  };

  return (
    <>
      {modalProfileSuccess && (
        <AlertModal modalType="alert" onClose={() => setModalProfileSuccess(false)} alertType="profileSuccess" />
      )}

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
