import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Font/fonts.css";
// context
import { LoginContext } from "../../contexts/LoginContext";
import { DiarySettingContext } from "../../contexts/DiarySettingContext";
// css
import { Container, Div } from "./MyPageStyles";
// icon
import { IoIosArrowBack } from "react-icons/io";

const ChangeFont = () => {
  const navigate = useNavigate();
  const { diarySetting } = useContext(DiarySettingContext);

  const fontClass = [
    "font-basic",
    "font-dohyeon",
    "font-gowun-dodum",
    "font-hi-melody",
    "font-jua",
    "font-nanum-gothic",
  ];
  const fontTitle = [
    "Basic",
    "Do Hyeon",
    "Gowun Dodum",
    "Hi Melody",
    "Jua",
    "Nanum Gothic",
  ];

  const fontData = fontClass.map((fontClass, index) => ({
    class: fontClass,
    title: fontTitle[index],
  }));

  const handleFontDoubleClick = (fontClass) => {
    document.body.className = fontClass; // DOM 업데이트
    alert(`${fontClass} 폰트가 적용되었습니다.`);
    navigate("/");
  };

  // 폰트 설정
  const [ userFont, setUserFont ] = useState("default");
  useEffect(() => {
    if(diarySetting.font === "Do Hyeon") {
      setUserFont("font-do-hyeon");
    } else if(diarySetting.font === "Gowun Dodum") {
      setUserFont("font-gowun-dodum");
    } else if(diarySetting.font === "Hi Melody") {
      setUserFont("font-hi-melody");
    } else if(diarySetting.font === "Jua") {
      setUserFont("font-jua");
    } else {
      setUserFont("font-default");
    }
  }, [diarySetting.font]);

  return (
    <Container>
      <Div 
        className={`${
          diarySetting.theme === "dark"
           ? "font-container-dark"
           : "font-container"} 
          ${userFont} 
        `}
      >
        <div className="font-header">
          <button onClick={() => navigate("/mypage")} className="backBtn">
            <IoIosArrowBack />
          </button>
          <p onClick={() => navigate("/mypage")} className="mypage-title">
            폰트
          </p>
        </div>

        <div className="font-body">
          {fontData.map((font, index) => (
            <div
              key={index}
              className={`font-box ${font.class}`}
              onDoubleClick={() => handleFontDoubleClick(font.class)} // 더블 클릭 이벤트 추가
            >
              <p>&lt;&lt; {font.title} &gt;&gt;</p>
              <p>내일은 내일의 태양이 뜬다.</p>
              <p>Manners, Maketh, Man.</p>
            </div>
          ))}
        </div>
      </Div>
    </Container>
  );
};

export default ChangeFont;
