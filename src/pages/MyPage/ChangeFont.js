import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "../../styles/Font/fonts.css";
import styled from "styled-components";

const ChangeFont = () => {
  const navigate = useNavigate();
  const { selectedFont, setSelectedFont } = useContext(UserContext); // UserContext 사용
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

  return (
    <div className="change-font-container">
      <h1>폰트 변경</h1>
      <div className="font-list">
        {fontOptions.map((font) => (
          <button
            key={font.class}
            onClick={() => handleFontChange(font.class)}
            className={`${font.class} ${
              currentFont === font.class ? "selected" : ""
            }`}
          >
            {font.label}
          </button>
        ))}
      </div>
      <button onClick={() => navigate("/")}>폰트 변경</button> {/* 버튼 텍스트 변경 */}
    </div>
  );
};

export default ChangeFont;
