import React, { createContext, useState } from "react";

export const BannerImageContext = createContext();

// 배너 이미지
export const BannerImageProvider = ({ children }) => {
  // 처음 이미지 세팅을 5번 이미지로
  const [bannerImage, setBannerImage] = useState(
    "/assets/bannerimages/image5.jpg"
  );

  return (
    <BannerImageContext.Provider value={{ bannerImage, setBannerImage }}>
      {children}
    </BannerImageContext.Provider>
  );
};
