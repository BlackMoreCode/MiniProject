import React, { createContext, useState } from "react";
import image5 from "../assets/bannerimages/banner5.jpg"; // adjust path as needed

export const BannerImageContext = createContext();

//배너 이미지
export const BannerImageProvider = ({ children }) => {
  // Use the imported image as the default banner image
  const [bannerImage, setBannerImage] = useState(image5);

  return (
    <BannerImageContext.Provider value={{ bannerImage, setBannerImage }}>
      {children}
    </BannerImageContext.Provider>
  );
};
