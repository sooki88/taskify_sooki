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
  },
  signUp: {
    welcomeMsg: "첫 방문을 환영합니다!",
    button: "가입하기",
    footerMsg: "이미 가입하셨나요?",
    linkText: "로그인하기",
    href: "login",
  },
};
