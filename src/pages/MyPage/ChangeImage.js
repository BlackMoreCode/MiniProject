import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const images = [
  { src: "/assets/bannerimages/image1.jpg", alt: "Image 1" },
  { src: "/assets/bannerimages/image2.jpg", alt: "Image 2" },
  { src: "/assets/bannerimages/image3.jpg", alt: "Image 3" },
  { src: "/assets/bannerimages/image4.jpg", alt: "Image 4" },
  { src: "/assets/bannerimages/image5.jpg", alt: "Default Image" },
];

const ChangeImage = () => {
  const [selectedImage, setSelectedImage] = useState(images[4].src); // 기본 이미지로 초기화
  const navigate = useNavigate();

  const handleImageSelect = (src) => {
    setSelectedImage(src); // 선택된 이미지 상태 업데이트
  };

  const handleImageChange = () => {
    // 배너 이미지를 변경하는 로직 (예: 상태 업데이트, 서버로 저장 요청 등)
    document.body.style.backgroundImage = `url(${selectedImage})`;
    alert("배너 이미지가 변경되었습니다!");
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <div className="change-image-container">
      <h1>배너 이미지 변경</h1>
      <div className="image-list">
        {images.map((image) => (
          <div key={image.src} className="image-item">
            <img src={image.src} alt={image.alt} className="banner-image" />
            <input
              type="radio"
              name="banner-image"
              checked={selectedImage === image.src}
              onChange={() => handleImageSelect(image.src)}
            />
          </div>
        ))}
      </div>
      <button onClick={handleImageChange}>이미지 변경</button>
    </div>
  );
};

export default ChangeImage;
