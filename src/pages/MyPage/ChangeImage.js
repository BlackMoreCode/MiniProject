import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// context
import { LoginContext } from "../../contexts/LoginContext";
import { DiarySettingContext } from "../../contexts/DiarySettingContext";
// css
import { Container, Div } from "./MyPageStyles";
// icon
import { IoIosArrowBack } from "react-icons/io";

import AxiosApi from "../../api/AxiosApi";

// 배너 이미지 매핑
import {
  bannerSrcPathDict,
  getBannerNameFromSrc,
} from "../../util/bannerImageUtils";

const ChangeImage = () => {
  const { diarySetting, updateDiarySetting } = useContext(DiarySettingContext);
  const navigate = useNavigate();

  // 배너 이미지 목록을 bannerImageMap를 이용해서 동적으로 생성
  const images = Object.keys(bannerSrcPathDict).map((key) => ({
    src: bannerSrcPathDict[key],
    alt: key,
  }));

  const handleImageDoubleClick = async (src) => {
    const isUpdated = await updateDiarySetting(
      "mainBannerImage",
      getBannerNameFromSrc(src)
    );

    if (isUpdated) {
      alert("배너 이미지가 변경되었습니다.");
      updateDiarySetting(src);
      navigate("/");
    } else {
      alert("이미지를 변경하는 데 실패했습니다.");
    }
  };

  // 폰트 설정
  const [ userFont, setUserFont ] = useState("default");
  useEffect(() => {
    if(diarySetting.font === "Do Hyeon") {
      setUserFont("font-do-hyeon");
    } else if(diarySetting.font === "Gowun Dodum") {
      setUserFont("font-gowun-dodum");
    } else if(diarySetting.font === "Hi Melody") {
      setUserFont("font-hi-melody");
    } else if(diarySetting.font === "Jua") {
      setUserFont("font-jua");
    } else {
      setUserFont("");
    }
  }, [diarySetting.font]);

  return (
    <Container>
      <Div
        className={`${
          diarySetting.theme === "dark"
           ? "banner-container-dark"
            : "banner-container"} 
            ${userFont} 
        `}
      >
        <div className="banner-header">
          <button onClick={() => navigate("/mypage")} className="backBtn">
            <IoIosArrowBack />
          </button>
          <p onClick={() => navigate("/mypage")} className="mypage-title">
            배너
          </p>
        </div>

        <div className="banner-body">
          {images.map((image) => (
            <div
              key={image.alt}
              className="banner-box"
              onDoubleClick={() => handleImageDoubleClick(image.src)}
            >
              <img src={image.src} alt={image.alt} className="banner-image" />
            </div>
          ))}
        </div>
      </Div>
    </Container>
  );
};

export default ChangeImage;
