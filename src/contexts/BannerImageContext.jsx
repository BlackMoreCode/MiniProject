import React, { createContext, useState } from "react";

export const BannerImageContext = createContext();

// 배너 이미지
export const BannerImageProvider = ({ children }) => {
  // Initial image setup; defaults to the last image in your array (image5)
  const [bannerImage, setBannerImage] = useState(
    "/assets/bannerimages/image5.jpg"
  );

  return (
    <BannerImageContext.Provider value={{ bannerImage, setBannerImage }}>
      {children}
    </BannerImageContext.Provider>
  );
};
