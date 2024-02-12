import { useEffect } from "react";
import { FieldError, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useToggle } from "usehooks-ts";
import ImageInput from "./ImageInput";
import { me } from "@/lib/services/users";
import { postProfileImageToServer } from "@/lib/util/postImageToServer";
import { UpdateMyInfoRequestDto } from "@/lib/services/users/schema";
import AlertModal from "../modal/alert";
import { useMyData } from "@/layouts/board";
import Button from "../common/Button";
import TextInput from "./TextInput";

function ProfileChangeForm() {
  const { myData, setMyData } = useMyData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    shouldUnregister: false,
    mode: "all",
  });

  const [alertValue, alertToggle, setAlertValue] = useToggle();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData: UpdateMyInfoRequestDto = { nickname: data.nickname, profileImageUrl: null };

      // 선택된 이미지가 있을 경우, 이미지업로드 요청해서 url받기
      if (data.profileImageUrl instanceof File) {
        const selectedImage = data.profileImageUrl;
        const imageUrl = await postProfileImageToServer(selectedImage);
        if (imageUrl) {
          formData.profileImageUrl = imageUrl;
        }

        // 삭제하기 버튼을 눌렀을 경우
      } else if (typeof data.profileImageUrl === "undefined") {
        // console.log("아무것도 선택하지 않았습니다.", data.profileImageUrl);
        // 기존 이미지 주소가 있을 경우
      } else if (typeof data.profileImageUrl === "string") {
        formData.profileImageUrl = data.profileImageUrl;
      }

      const updateMe = (await me("put", formData)).data as UpdateMyInfoRequestDto;

      setMyData((prev) => ({ ...prev, ...updateMe }));
      setValue("profileImageUrl", updateMe.profileImageUrl);
      setAlertValue(true);
    } catch (error) {
      console.error("프로필을 변경하지 못했습니다!");
    }
  };

  useEffect(() => {
    if (myData) {
      setValue("profileImageUrl", myData.profileImageUrl);
      setValue("email", myData.email);
      setValue("nickname", myData.nickname);
    }
  }, [myData, setValue]);

  return (
    <>
      {alertValue && <AlertModal modalType="alert" onClose={alertToggle} alertType="profileSuccess" />}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col tablet:gap-24 gap-16">
        <div className="flex flex-col items-start gap-24 tablet:flex-row tablet:gap-16 tablet:items-start">
          <ImageInput type="file" imgUrl={myData.profileImageUrl as string} register={register} setValue={setValue} />
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
              validation={{
                required: "닉네임을 입력해 주세요.",
                maxLength: { value: 8, message: "닉네임은 8자까지만 입력할 수 있어요." },
              }}
              labelTitle="닉네임"
              placeholder="닉네임을 입력해 주세요."
              setValue={setValue}
              errors={errors["nickname"] as FieldError}
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
