import Image from "next/image";

function SettingButton() {
  return (
    <button className="flex items-center justify-center flex-shrink-0 gap-8 px-12 border tablet:px-16 rounded-8 text-14 h-30 bg-FFF border-gray-D9D9 tablet:h-36 pc:h-40 pc:text-16">
      <div className="hidden tablet:flex">
        <Image src="/images/settings.png" alt="초대하기 아이콘" width={20} height={20} />
      </div>
      <p>관리</p>
    </button>
  );
}

export default SettingButton;
