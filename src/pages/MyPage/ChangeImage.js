import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BannerImageContext } from "../../contexts/BannerImageContext";
import { Container, Div } from "./MyPageStyles";
import { IoIosArrowBack } from "react-icons/io";
import { LoginContext } from "../../contexts/LoginContext";
import AxiosApi from "../../api/AxiosApi";

import banner1 from "../../assets/bannerimages/banner1.jpg";
import banner2 from "../../assets/bannerimages/banner2.jpg";
import banner3 from "../../assets/bannerimages/banner3.jpg";
import banner4 from "../../assets/bannerimages/banner4.jpg";
import banner5 from "../../assets/bannerimages/banner5.jpg";

const CURRENT_MAIN_BANNER_IMAGE = [
  { src: banner1, alt: "banner 1" },
  { src: banner2, alt: "banner 2" },
  { src: banner3, alt: "banner 3" },
  { src: banner4, alt: "banner 4" },
  { src: banner5, alt: "banner 5" },
];

const ChangeImage = () => {
  const { setBannerImage } = useContext(BannerImageContext);
  // const [selectedImage, setSelectedImage] = useState(image5); // 기본 이미지로 초기화
  const { isDarkMode } = useContext(LoginContext); // Dark 모드
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  // const handleImageSelect = (src) => {
  //   setSelectedImage(src); // 선택된 이미지 상태 업데이트
  // };

  // const handleImageChange = () => {
  //   // 배너 이미지를 변경하는 로직 (예: 상태 업데이트, 서버로 저장 요청 등)
  //   setBannerImage(selectedImage);
  //   alert("이미지가 변경되었습니다");
  //   navigate("/"); // 메인 페이지로 이동
  // };
  const handleImageDoubleClick = async (src) => {
    try {
      const loggedInMember = 2; 
      const font = "default"; 
      const theme = "default"; 
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
        setMessage("이미지 변경에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Failed to update image:", error);
      setMessage("이미지가 변경에 실패하였습니다.");
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
          {CURRENT_MAIN_BANNER_IMAGE.map((image) => (
            <div
              key={image.src}
              className="banner-box"
              onDoubleClick={() => handleImageDoubleClick(image.src)} // 더블 클릭 이벤트 추가
            >
              <img src={image.src} alt={image.alt} className="banner-image" />
            </div>
          ))}
        </div>

        {/* {images.map((image) => (
          <div key={image.src} className="banner-box">
            <img
              src={image.src}
              alt={image.alt}
              className="banner-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = image5; // Use a fallback image
              }}
            />
          </div>
        ))} */}

      </Div>
    </Container>
    
  );
};

export default ChangeImage;
