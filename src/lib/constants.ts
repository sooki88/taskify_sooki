export const MODAL_POPOVER = [
  {
    title: "수정하기",
    onClick: () => undefined,
  },
  { title: "삭제하기", onClick: () => undefined },
];

export const PROFILE_POPOVER = [
  { title: "마이 페이지", onClick: () => undefined },
  { title: "내 대시보드", onClick: () => undefined },
  { title: "로그아웃", onClick: () => undefined },
];

export const AUTH_MAPPING = {
  logIn: {
    welcomeMsg: "오늘도 만나서 반가워요!",
    button: "로그인",
    footerMsg: "회원이 아니신가요?",
    linkText: "회원가입하기",
    href: "signup",
    formStyle: "flex flex-col gap-16",
    buttonStyle: "pt-4 h-50 text-18 w-full",
    buttonVariant: "filled",
    buttonType: "auth",
  },
  signUp: {
    welcomeMsg: "첫 방문을 환영합니다!",
    button: "가입하기",
    footerMsg: "이미 가입하셨나요?",
    linkText: "로그인하기",
    href: "login",
    formStyle: "flex flex-col gap-16",
    buttonStyle: "pt-4 h-50 text-18 w-full",
    buttonVariant: "filled",
    buttonType: "auth",
  },
  profile: {
    welcomeMsg: "프로필이 저장되었습니다!",
    button: "저장",
    footerMsg: "프로필 저장을 실패했습니다!",
    linkText: "프로필 저장하기",
    href: "mypage",
    formStyle: "flex flex-col tablet:gap-24 gap-16",
    buttonStyle: "flex justify-end tablet:text-14 text-12",
    buttonVariant: "filled_4",
    buttonType: "comment",
  },
  password: {
    welcomeMsg: "비밀번호가 변경되었습니다!",
    button: "변경",
    footerMsg: "현재 비밀번호가 틀렸습니다.",
    linkText: "비밀번호 변경하기",
    href: "mypage",
    formStyle: "flex flex-col tablet:gap-24 gap-16",
    buttonStyle: "flex justify-end tablet:text-14 text-12",
    buttonVariant: "filled_4",
    buttonType: "comment",
  },
};
