import Image from "next/image";

function ProfileImgInputField() {
  const handleAddProfileImage = () => {};

  return (
    <div className="bg-[#F5F5F5] rounded-6 w-100 h-100 tablet:w-182 tablet:h-182 flex items-center justify-center shrink-0">
      <input id="profileImage" type="file" accept="imgae/*" className="hidden" onChange={handleAddProfileImage} />
      <div className="relative w-20 h-20 tablet:w-30 tablet:h-30">
        <Image src="/images/add.png" alt="프로필 추가" fill priority={true} />
      </div>
    </div>
  );
}

export default ProfileImgInputField;
