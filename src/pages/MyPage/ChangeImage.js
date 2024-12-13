import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BannerImageContext } from "../../contexts/BannerImageContext";
import { Container, Div } from "./MyPageStyles";
import { IoIosArrowBack } from "react-icons/io";
import { LoginContext } from "../../contexts/LoginContext";
import AxiosApi from "../../api/AxiosApi";

// 배너 이미지 매핑
import { bannerImageMap, imageToKeyMap } from "../../util//bannerImageMap";

// 이 함수는 이미지 src/소스가 주어졌을 때 대응하는 배너키를 찾아줍니다.
function getBannerKeyFromSrc(src) {
  // Src/소스 가 imageToKeyMap의  값과 비교 대조됩니다
  for (const [imageObj, key] of imageToKeyMap.entries()) {
    if (imageObj === src) {
      return key;
    }
  }
  return "banner1"; // 아무것도 찾지 못했다면 fallback 값은 banner1로 설정
}

const ChangeImage = () => {
  const { setBannerImage } = useContext(BannerImageContext);
  const { isDarkMode, loggedInMember } = useContext(LoginContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  // 배너 이미지 목록을 bannerImageMap를 이용해서 동적으로 생성
  const images = Object.keys(bannerImageMap).map((key) => ({
    src: bannerImageMap[key],
    alt: key,
  }));

  const handleImageDoubleClick = async (src) => {
    // UI 즉각 업데이트
    setBannerImage(src);

    // 이미지 SRC랑 해당하는 키를 매핑
    const bannerKey = getBannerKeyFromSrc(src); // 여기서 src를 key로 변환

    // Fetch current settings to maintain consistency 현제 설정 fetch 해와서 일관성 유지
    const currentSettings = await AxiosApi.getDiarySetting(loggedInMember);
    const font = currentSettings?.font || "default";
    const theme = currentSettings?.theme || "default";

    // 알려진 유효한 키들로 백엔드를 업데이트
    const updated = await AxiosApi.updateDiarySetting(
      loggedInMember,
      font,
      theme,
      bannerKey
    );

    if (updated) {
      alert("이미지가 변경되었습니다.");
      navigate("/");
    } else {
      alert("이미지를 변경하는 데 실패했습니다. 다시 시도해주세요.");
      // 실패한다면 기존 세팅의 배너 이미지로 돌아가거나 디폴트 설정로 돌아가기.

      const fallbackKey = currentSettings?.mainBannerImage || "banner5";

      setBannerImage(bannerImageMap[fallbackKey]);
    }
  };

  return (
    <Container>
      <Div
        className={isDarkMode ? "banner-container-dark" : "banner-container"}
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
