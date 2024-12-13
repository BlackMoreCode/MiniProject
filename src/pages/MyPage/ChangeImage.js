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

const images = [
  { src: image1, alt: "banner 1" },
  { src: image2, alt: "banner 2" },
  { src: image3, alt: "banner 3" },
  { src: image4, alt: "banner 4" },
  { src: image5, alt: "banner 5" },
];

const ChangeImage = () => {
  const { setBannerImage } = useContext(BannerImageContext);
  const { isDarkMode } = useContext(LoginContext); // Dark 모드
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
 

  const handleImageDoubleClick = async (src) => {
    try {
      const loggedInMember = 2; // 현재 로그인된 사용자 ID (테스트 값)
      const font = "default";
      const theme = "default";
  
      console.log("API 요청 데이터:", {
        loggedInMember,
        updatedDiarySetting: {
          font,
          theme,
          mainBannerImage: src,
          alertSound: "default",
        },
      });
  
      const response = await AxiosApi.updateDiarySetting(
        loggedInMember,
        font,
        theme,
        src
      );
  
      if (response) {
        setBannerImage(src);
        alert("이미지가 변경되었습니다.");
        navigate("/");
      } else {
        alert("이미지 변경 실패");
      }
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };
  

  return (
    <Container>
      <Div className={isDarkMode ? "banner-container-dark" : "banner-container"}>
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
              onDoubleClick={() => handleImageDoubleClick(image.src)} // 더블 클릭 이벤트 추가
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
