import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import "../../styles/Font/fonts.css";
import styled from "styled-components";
import { Container, Div } from "./MyPageStyles";
import leftArrowIcon from "../../assets/icons/left-arrow.png";
import { IoIosArrowBack } from "react-icons/io";

const ChangeFont = () => {
  const navigate = useNavigate();
  const { selectedFont, setSelectedFont } = useContext(LoginContext); // UserContext 사용
  const [currentFont, setCurrentFont] = useState(selectedFont); // 로컬 상태 추가
  const { isDarkMode } = useContext(LoginContext); // Dark 모드

  const fontOptions = [
    { label: "Do Hyeon", class: "font-dohyeon" },
    { label: "Gowun Dodum", class: "font-gowundodum" },
    { label: "Hi Melody", class: "font-himelody" },
    { label: "Jua", class: "font-jua" },
    { label: "Nanum Gothic", class: "font-nanumgothic" },
  ];

  const handleFontChange = (fontClass) => {
    setSelectedFont(fontClass); // 폰트 상태 업데이트
    setCurrentFont(fontClass); // 로컬 상태 업데이트
    document.body.className = fontClass; // DOM 업데이트
  };

  // 폰트박스 요소 배열
  const fontClass = [
    'font-basic',
    'font-dohyun',
    'font-gowun-dodum',
    'font-hi-melody',
    'font-jua',
    'font-nanum-gothic',
  ];
  const fontTitle = [
    'Basic',
    'Do Hyeon',
    'Gowun Dodum',
    'Hi Melody',
    'Jua',
    'Nanum Gothic',
  ];

  const fontData = [
    { class: fontClass[0], title: fontTitle[0] },
    { class: fontClass[1], title: fontTitle[1] },
    { class: fontClass[2], title: fontTitle[2] },
    { class: fontClass[3], title: fontTitle[3] },
    { class: fontClass[4], title: fontTitle[4] },
    { class: fontClass[5], title: fontTitle[5] },
    { class: fontClass[5], title: fontTitle[5] },
    { class: fontClass[5], title: fontTitle[5] },
    { class: fontClass[5], title: fontTitle[5] },
    { class: fontClass[5], title: fontTitle[5] },
    { class: fontClass[5], title: fontTitle[5] },
  ];

  return (
    <Container>
      <Div className={isDarkMode ? "font-container-dark" : "font-container"}>
        <div className="font-header">
          <button onClick={()=>navigate("/mypage")} className="backBtn">
            <IoIosArrowBack />
          </button>
          <p onClick={()=>navigate("/mypage")} className="mypage-title">폰트</p>
        </div>

        <div className="font-body">
          {/* {fontOptions.map((font) => (
            <button
              key={font.class}
              onClick={() => handleFontChange(font.class)}
              className={`${font.class} ${
                currentFont === font.class ? "selected" : ""
              }`}
            >
              {font.label}
            </button>
          ))} */}

          {fontData.map((font, index) => (
            <div key={index} className={`font-box ${font.class}`}>
              <p>&lt;&lt; {font.title} &gt;&gt;</p>
              <p>내일은 내일의 태양이 뜬다.</p>
              <p>Manners, Maketh, Man.</p>
            </div>
          ))}
        </div>

        
        {/* <button onClick={() => navigate("/")}>폰트 변경</button>{" "} */}
        {/* 버튼 텍스트 변경 */}
      </Div>
    </Container>
    
  );
};

export default ChangeFont;
