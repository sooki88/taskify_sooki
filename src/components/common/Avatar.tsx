import React from "react";

interface AvatarProps {
  src?: string;
}

function Avatar({ src }: AvatarProps) {
  const style = {
    background: src ? `url(${src})` : "orange",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return <div className={`border-2 border-white rounded-full h-38 w-38`} style={style} />;
}

export default Avatar;
