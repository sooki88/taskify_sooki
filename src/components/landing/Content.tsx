import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";

export default function Content() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        className="h-auto w-287 tablet:w-537 pc:w-722"
        src="/images/landing0.png"
        width={722}
        height={423}
        alt="Landing 이미지"
        priority={true}
      />
      <div className="flex flex-col items-center justify-center gap-5 tablet:flex-row tablet:gap-24 pc:gap-28 mt-26 tablet:mt-48">
        <span className="font-bold leading-tight tracking-tighter text-center font-Pretendard text-40 tablet:text-65 pc:text-76">
          새로운 일정 관리
        </span>
        <Image
          className="h-auto w-150 tablet:w-260 pc:w-280"
          width={327}
          height={80}
          src="/images/Taskify.png"
          alt="Taskify 이미지"
          priority={true}
        />
      </div>
      <div className="font-normal leading-normal tracking-tight text-center mt-18 tablet:mt-41 font-Pretendard text-12 tablet:text-16 pc:text-18">
        일상의 업무를 스마트하게 관리하는 일정 플랫폼 <br />
        Taskify와 함께 지금 바로 당신의 스케줄을 효과적으로 관리해보세요!
      </div>
      <Link className="mt-70 tablet:mt-66 animate-bounce" href="/login">
        <Button variant="filled" buttonType="landing">
          바로 시작하기
        </Button>
      </Link>
      <div>
        <div className="flex flex-col items-center w-full tablet:gap-35 pc:flex-row pc:justify-between pc:items-end h-686 tablet:h-972 pc:h-600 rounded-8 mt-184 bg-gray-FAFA tablet:px-63 pc:px-0 pc:pl-60 pt-60">
          <div className="flex flex-col items-center justify-center pc:items-start gap-61 tablet:gap-30 pc:gap-100 mb-150 tablet:mb-20 pc:mb-223">
            <span className="font-medium leading-normal text-gray-9FA6 text-18 tablet:text-22 font-Pretendard">
              Point 1
            </span>
            <span className="font-bold leading-tight text-center pc:text-start text-36 pc:text-48 font-Pretendard">
              일의 우선순위를
              <br /> 관리하세요
            </span>
          </div>
          <Image
            className="h-auto w-350 tablet:w-500 pc:w-594 tablet:rounded-t-8 pc:rounded-t-0"
            width={594}
            height={497}
            src="/images/landing1.svg"
            alt="Landing 이미지"
            priority={true}
          />
        </div>
        <div className="flex flex-col items-center w-full tablet:gap-40 pc:items-end pc:justify-end pc:gap-100 pc:flex-row-reverse h-686 tablet:h-972 pc:h-600 rounded-8 mt-90 bg-gray-FAFA tablet:px-63 pc:pl-60 pt-60">
          <div className="flex flex-col items-center justify-center pc:items-start gap-61 tablet:gap-30 pc:gap-100 mb-100 tablet:mb-20 pc:mb-223">
            <span className="font-medium leading-normal text-gray-9FA6 text-18 tablet:text-22 font-Pretendard">
              Point 2
            </span>
            <span className="font-bold leading-tight text-center pc:text-start text-36 pc:text-48 font-Pretendard">
              해야할 일을
              <br /> 등록하세요
            </span>
          </div>
          <Image
            className="h-auto w-300 tablet:w-360 pc:w-436"
            width={436}
            height={502}
            src="/images/landing2.svg"
            alt="Landing 이미지"
            priority={true}
          />
        </div>

        <div className="flex flex-col items-center justify-center w-full pc:justify-start pc:items-start mt-90">
          <span className="font-bold font-Pretendard text-22 tablet:text-28">생산성을 높이는 다양한 설정 ⚡</span>
          <div className="grid grid-row-3 pc:grid-cols-3 gap-33 mt-42 tablet:mt-36">
            <div className="col-span-1">
              <div className="flex items-center justify-center px-41 tablet:px-39 rounded-t-8 h-236 tablet:h-260 bg-black-4B4B">
                <Image
                  className="w-auto h-auto"
                  width={300}
                  height={124}
                  src="/images/landing3.svg"
                  alt="Landing 이미지"
                  priority={true}
                />
              </div>
              <div className="flex flex-col justify-center py-32 px-33 h-112 tablet:h-124 gap-18 bg-black-1717 rounded-b-8">
                <span className="font-bold leading-normal text-white text-18">대시보드 설정</span>
                <span className="leading-normal text-white text-16">대시보드 사진과 이름을 변경할 수 있어요.</span>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex items-center justify-center px-41 tablet:px-39 rounded-t-8 h-260 bg-black-4B4B ">
                <Image
                  className="w-auto h-auto"
                  width={300}
                  height={231}
                  src="/images/landing4.svg"
                  alt="Landing 이미지"
                  priority={true}
                />
              </div>
              <div className="flex flex-col justify-center py-32 px-33 h-112 tablet:h-124 gap-18 bg-black-1717 rounded-b-8">
                <span className="font-bold leading-normal text-white text-18">초대</span>
                <span className="leading-normal text-white text-16">새로운 팀원을 초대할 수 있어요.</span>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex items-center justify-center px-41 tablet:px-39 rounded-t-8 h-260 bg-black-4B4B">
                <Image
                  className="w-auto h-auto"
                  width={300}
                  height={195}
                  src="/images/landing5.svg"
                  alt="Landing 이미지"
                  priority={true}
                />
              </div>
              <div className="flex flex-col justify-center py-32 px-33 gap-18 h-112 tablet:h-124 bg-black-1717 rounded-b-8">
                <span className="font-bold leading-normal text-white text-18">구성원</span>
                <span className="leading-normal text-white text-16">구성원을 초대하고 내보낼 수 있어요.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
