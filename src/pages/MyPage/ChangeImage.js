import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BannerImageContext } from "../../contexts/BannerImageContext";
import { Container, Div } from "./MyPageStyles";
import leftArrowIcon from "../../assets/icons/left-arrow.png";

import image1 from "../../assets/bannerimages/image1.jpg";
import image2 from "../../assets/bannerimages/image2.jpg";
import image3 from "../../assets/bannerimages/image3.jpg";
import image4 from "../../assets/bannerimages/image4.jpg";
import image5 from "../../assets/bannerimages/image5.jpg";

const images = [
  { src: image1, alt: "Image 1" },
  { src: image2, alt: "Image 2" },
  { src: image3, alt: "Image 3" },
  { src: image4, alt: "Image 4" },
  { src: image5, alt: "Image 5" },
];

const ChangeImage = () => {
  const { bannerImage, setBannerImage } = useContext(BannerImageContext);
  const [selectedImage, setSelectedImage] = useState(image5); // 기본 이미지로 초기화
  const navigate = useNavigate();

  const handleImageSelect = (src) => {
    setSelectedImage(src); // 선택된 이미지 상태 업데이트
  };

  const handleImageChange = () => {
    // 배너 이미지를 변경하는 로직 (예: 상태 업데이트, 서버로 저장 요청 등)
    setBannerImage(selectedImage);
    alert("이미지가 변경되었습니다");
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <Container>
      <Div className="banner-container">
        <div className="font-header">
          <button onClick={()=>navigate("/mypage")} className="backBtn">
            <img src={leftArrowIcon} alt="뒤로가기" />
          </button>
          <h1>Banner</h1>
          <div className="header-blank"></div>
        </div>

        <div className="banner-body">
          {images.map((image) => (
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


        {/* <button onClick={handleImageChange}>이미지 변경</button> */}
      </Div>
    </Container>
    
  );
};

export default ChangeImage;
