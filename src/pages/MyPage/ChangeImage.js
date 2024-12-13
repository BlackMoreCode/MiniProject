import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BannerImageContext } from "../../contexts/BannerImageContext";
import { Container, Div } from "./MyPageStyles";
import { IoIosArrowBack } from "react-icons/io";
import { LoginContext } from "../../contexts/LoginContext";
import AxiosApi from "../../api/AxiosApi";

import image1 from "../../assets/bannerimages/banner1.jpg";
import image2 from "../../assets/bannerimages/banner2.jpg";
import image3 from "../../assets/bannerimages/banner3.jpg";
import image4 from "../../assets/bannerimages/banner4.jpg";
import image5 from "../../assets/bannerimages/banner5.jpg";

// 불러온 이미지들을 백엔드가 알 수 있는 키로 매핑 처리;
// 해당 키들이 (banner1, banner2, ...) 등이 DB내 참조되는 테이블에 존재하는 유효한 행이여야함
const imageMap = new Map([
  [image1, "banner1"],
  [image2, "banner2"],
  [image3, "banner3"],
  [image4, "banner4"],
  [image5, "banner5"],
]);

const images = [
  { src: image1, alt: "banner 1" },
  { src: image2, alt: "banner 2" },
  { src: image3, alt: "banner 3" },
  { src: image4, alt: "banner 4" },
  { src: image5, alt: "banner 5" },
];

const ChangeImage = () => {
  const { setBannerImage } = useContext(BannerImageContext);
  const { isDarkMode, loggedInMember } = useContext(LoginContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleImageDoubleClick = async (src) => {
    // UI 즉각 업데이트
    setBannerImage(src);

    // 이미지 SRC랑 해당하는 키를 매핑
    const bannerKey = imageMap.get(src) || "banner1";
    // 맵에 없다면 기본을 banner1로 쓰거나 에러 핸들링으로.

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
      setBannerImage(currentSettings?.mainBannerImage || image5);
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
              key={image.src}
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
