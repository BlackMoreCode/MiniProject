import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import "../../styles/Font/fonts.css";
import styled from "styled-components";
import { Container, Div } from "./MyPageStyles";
import leftArrowIcon from "../../assets/icons/left-arrow.png";

const ChangeFont = () => {
  const navigate = useNavigate();
  const { selectedFont, setSelectedFont } = useContext(LoginContext); // UserContext 사용
  const [currentFont, setCurrentFont] = useState(selectedFont); // 로컬 상태 추가

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

  const fontKor = [
    '기본',
    '도현',
    '고운 돋움',
    '하이멜로디',
    '주아',
    '나눔 고딕',
  ];
  
  const fontEng = [
    'basic',
    'do-hyeon',
    'gowun-dodum',
    'hi-melody',
    'jua',
    'nanum-gothic',
  ];

  const fontData = [
    { class: fontClass[0], title: fontTitle[0], kor: fontKor[0], eng: fontEng[0] },
    { class: fontClass[1], title: fontTitle[1], kor: fontKor[1], eng: fontEng[1] },
    { class: fontClass[2], title: fontTitle[2], kor: fontKor[2], eng: fontEng[2] },
    { class: fontClass[3], title: fontTitle[3], kor: fontKor[3], eng: fontEng[3] },
    { class: fontClass[4], title: fontTitle[4], kor: fontKor[4], eng: fontEng[4] },
    { class: fontClass[5], title: fontTitle[5], kor: fontKor[5], eng: fontEng[5] },
  ];

  return (
    <Container>
      <Div className="font-container">
        <div className="font-header">
          <button onClick={()=>navigate("/mypage")} className="backBtn">
            <img src={leftArrowIcon} alt="뒤로가기" />
          </button>
          <h1>Font</h1>
          <div className="header-blank"></div>
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
              <p>{font.kor} 폰트입니다. {font.eng} font.</p>
              <p>那就得看你舍不舍得。</p>
              <p>0 1 2 3 4 + - × ÷ = / ! ? ~ , . : “ ” ‘ ’</p>
              <p>♡ ☆ ※ & % @ $ ￦ ♬ * ( ) &lt; &gt; #</p>
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
