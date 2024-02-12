import React, { useState, useEffect } from "react";

const ScrollTopButton: React.FC = () => {
  const [toggleBtn, setToggleBtn] = useState(true);

  const handleScroll = () => {
    const { scrollY } = window;

    scrollY > 200 ? setToggleBtn(true) : setToggleBtn(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return toggleBtn ? (
    <div className="fixed flex items-center justify-center rounded-full bottom-50 tablet:bottom-100 right-50 tablet:right-80 animate-bounce w-50 h-50 bg-violet">
      <button className="text-white text-30" onClick={goToTop}>
        ⬆️
      </button>
    </div>
  ) : null;
};

export default ScrollTopButton;
