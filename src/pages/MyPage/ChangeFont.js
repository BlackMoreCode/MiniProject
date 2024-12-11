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
          <div className="font-box font-basic">
            <p>&lt;&lt; Basic &gt;&gt;</p>
            <p>기본 폰트입니다. basic font.</p>
            <p>那就得看你舍不舍得。</p>
            <p>0 1 2 3 4 + - × ÷ = / ! ? ~ , . : “ ” ‘ ’</p>
            <p>♡ ☆ ※ & % @ $ ￦ ♬ * ( ) &lt; &gt; #</p>
          </div>
          <div className="font-box font-dohyun">
            <p>&lt;&lt; Do Hyeon &gt;&gt;</p>
            <p>도현 폰트입니다. do-hyeon font.</p>
            <p>那就得看你舍不舍得。</p>
            <p>0 1 2 3 4 + - × ÷ = / ! ? ~ , . : “ ” ‘ ’</p>
            <p>♡ ☆ ※ & % @ $ ￦ ♬ * ( ) &lt; &gt; #</p>
          </div>
          <div className="font-box font-gowun-dodum">
            <p>&lt;&lt; Gowun Dodum &gt;&gt;</p>
            <p>고운 돋움 폰트입니다. gowun-dodum font.</p>
            <p>那就得看你舍不舍得。</p>
            <p>0 1 2 3 4 + - × ÷ = / ! ? ~ , . : “ ” ‘ ’</p>
            <p>♡ ☆ ※ & % @ $ ￦ ♬ * ( ) &lt; &gt; #</p>
          </div>
          <div className="font-box font-hi-melody">
            <p>&lt;&lt; Hi Melody &gt;&gt;</p>
            <p>하이멜로디 폰트입니다. hi-melody font.</p>
            <p>那就得看你舍不舍得。</p>
            <p>0 1 2 3 4 + - × ÷ = / ! ? ~ , . : “ ” ‘ ’</p>
            <p>♡ ☆ ※ & % @ $ ￦ ♬ * ( ) &lt; &gt; #</p>
          </div>
          <div className="font-box font-jua">
            <p>&lt;&lt; Jua &gt;&gt;</p>
            <p>주아 폰트입니다. jua font.</p>
            <p>那就得看你舍不舍得。</p>
            <p>0 1 2 3 4 + - × ÷ = / ! ? ~ , . : “ ” ‘ ’</p>
            <p>♡ ☆ ※ & % @ $ ￦ ♬ * ( ) &lt; &gt; #</p>
          </div>
          <div className="font-box font-nanum-gothic">
            <p>&lt;&lt; Nanum Gothic &gt;&gt;</p>
            <p>나눔 고딕 폰트입니다. nanum-gothic font.</p>
            <p>那就得看你舍不舍得。</p>
            <p>0 1 2 3 4 + - × ÷ = / ! ? ~ , . : “ ” ‘ ’</p>
            <p>♡ ☆ ※ & % @ $ ￦ ♬ * ( ) &lt; &gt; #</p>
          </div>
          <div className="font-box-blank">&nbsp;</div>
        </div>

        
        {/* <button onClick={() => navigate("/")}>폰트 변경</button>{" "} */}
        {/* 버튼 텍스트 변경 */}
      </Div>
    </Container>
    
  );
};

export default ChangeFont;
