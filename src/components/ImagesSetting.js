import React, { useState } from "react";
import styled from "styled-components";

// 이미지 데이터
const images = [
  { id: 1, src: "/bannerimages/banner1.jpg", alt: "Banner 1" },
  { id: 2, src: "/bannerimages/banner2.jpg", alt: "Banner 2" },
  { id: 3, src: "/bannerimages/banner3.jpg", alt: "Banner 3" },
  { id: 4, src: "/bannerimages/banner4.jpg", alt: "Banner 4" },
  { id: 5, src: "/bannerimages/banner5.jpg", alt: "Default Banner" },
];

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Image = styled.img`
  width: 200px;
  height: 100px;
  cursor: pointer;
  border: 1px solid gray;
  border-radius: 5px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  ${(props) =>
    props.selected &&
    `
    border: 3px solid blue;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  `}

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const BannerSelection = () => {
  const [selectImage, setSelectImage] = useState(5); 

  const handleImageSelect = (id) => {
    setSelectImage(id);
  };

  return (
    <Container>
      <Title>메인 배너 선택</Title>
      <ImagesContainer>
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.src}
            alt={image.alt}
            selected={selectImage === image.id}
            onClick={() => handleImageSelect(image.id)}
          />
        ))}
      </ImagesContainer>
    </Container>
  );
};

export default BannerSelection;