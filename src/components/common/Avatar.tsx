import React from "react";

interface AvatarProps {
  name?: string;
  src?: string;
  profile?: boolean;
}

function Avatar({ name, src, profile }: AvatarProps) {
  const initial = name?.charAt(0) || "";

  const backgroundStyle = {
    background: src ? `url(${src})` : "orange",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const avatarStyle = profile ? "h-34 w-34 mobile:h-38 mobile:w-38" : "h-26 w-26";

  return (
    <div
      className={`flex items-center justify-center text-white border-2 border-white rounded-full ${avatarStyle}`}
      style={backgroundStyle}>
      <span className="text-12 tablet:text-16">{initial}</span>
    </div>
  );
}

export default Avatar;
