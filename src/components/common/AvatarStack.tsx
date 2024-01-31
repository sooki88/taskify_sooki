import React, { useState } from "react";
import Avatar from "./Avatar";
import ProfileLabel from "./ProfileLabel";

interface AvatarsProps {
  list: any[];
}

const VISIBLE_COUNT_INIT = 4;

function AvatarStack({ list }: AvatarsProps) {
  //추후 브라우저 사이즈에 따라 갯수 조정할 예정.
  const [visibleCount, setVisibleCount] = useState(VISIBLE_COUNT_INIT);

  const count = list.length;
  const others = count - VISIBLE_COUNT_INIT;

  const isVisible = count > visibleCount;

  return (
    <div className={`relative flex group`}>
      <div className={`h-38 flex items-center -space-x-10 tablet:-space-x-8`}>
        {list.slice(0, VISIBLE_COUNT_INIT).map((data, index) => {
          return (
            <div key={index} className={`relative`}>
              <Avatar nickname={data.nickname} profileImageUrl={data.profileImageUrl} />
            </div>
          );
        })}
        {isVisible && (
          <div
            className={`relative flex items-center justify-center border-2 border-white rounded-full h-38 w-38 bg-[#F4D7DA] text-[#D25B68] tablet:h-34 tablet:w-34`}>
            +{others}
          </div>
        )}
      </div>
      <div
        className={`absolute hidden border border-black rounded-8 border-solid top-38 w-120 left-10 group-hover:flex-col group-hover:flex group-hover:items-center`}>
        {list.map((data, index) => {
          return <ProfileLabel key={index} data={data} />;
        })}
      </div>
    </div>
  );
}

export default AvatarStack;
