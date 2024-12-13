import React, { useContext } from "react";
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
  const { selectedFont, setSelectedFont } = useContext(LoginContext); // UserContext 사용

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
    setSelectedFont(fontClass); // 폰트 상태 업데이트
    document.body.className = fontClass; // DOM 업데이트
    alert(`${fontClass} 폰트가 적용되었습니다.`);
    navigate("/");
  };

  return (
    <Container>
      <Div 
        className={
          diarySetting.theme === "dark"
           ? "font-container-dark"
           : "font-container"}
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
