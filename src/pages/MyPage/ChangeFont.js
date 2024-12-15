import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Font/fonts.css";
// context
import { LoginContext } from "../../contexts/LoginContext";
import { DiarySettingContext } from "../../contexts/DiarySettingContext";
// css
import { Container, Div } from "./MyPageStyles";
// icon
import { IoIosArrowBack } from "react-icons/io";
// Modal
import MessageModal from "../../components/MessageModal";

const ChangeFont = () => {
  const navigate = useNavigate();
  const { diarySetting, updateDiarySetting } = useContext(DiarySettingContext);

  const modalRef = useRef();
  const openModal = (title, description) => {
    modalRef.current?.enable(title, description);
  };

  const fontClass = [
    "font-default",
    "font-do-hyeon",
    "font-gowun-dodum",
    "font-hi-melody",
    "font-jua",
  ];
  const fontTitle = ["Default", "Do Hyeon", "Gowun Dodum", "Hi Melody", "Jua"];

  const fontData = fontClass.map((fontClass, index) => ({
    class: fontClass,
    title: fontTitle[index],
  }));

  // 폰트 가져오기
  const [userFont, setUserFont] = useState("default");
  useEffect(() => {
    if (diarySetting.font === "Do Hyeon") {
      setUserFont("font-do-hyeon");
    } else if (diarySetting.font === "Gowun Dodum") {
      setUserFont("font-gowun-dodum");
    } else if (diarySetting.font === "Hi Melody") {
      setUserFont("font-hi-melody");
    } else if (diarySetting.font === "Jua") {
      setUserFont("font-jua");
    } else {
      setUserFont("font-default");
    }
  }, [diarySetting.font]);

  // 폰트 변경
  const handleFontDoubleClick = (fontClass) => {
    let thisFont = "";
    if (fontClass === "font-default") {
      thisFont = "default";
    } else if (fontClass === "font-do-hyeon") {
      thisFont = "Do Hyeon";
    } else if (fontClass === "font-gowun-dodum") {
      thisFont = "Gowun Dodum";
    } else if (fontClass === "font-hi-melody") {
      thisFont = "Hi Melody";
    } else if (fontClass === "font-jua") {
      thisFont = "Jua";
    }
    changeFont(thisFont);
  };
  const changeFont = async (thisFont) => {
    const isUpdated = await updateDiarySetting(
      "font",
      (diarySetting.font = thisFont)
    );
    if (isUpdated) {
      openModal(
        "폰트 설정",
        `${thisFont === "default" ? "기본" : thisFont} 폰트로 설정되었습니다.`
      );
    } else {
      openModal(
        "폰트 설정",
        "서버 통신 과정에서 문제가 발생했습니다. 관리자에게 문의해주세요.🥲"
      );
    }
  };

  return (
    <Container>
      <Div
        className={`${
          diarySetting.theme === "dark"
            ? "font-container-dark"
            : "font-container"
        } 
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
              {((diarySetting.font === "default" && font.title === "Default") ||
                diarySetting.font === font.title) && <span>✔</span>}
              <p>&lt;&lt; {font.title} &gt;&gt;</p>
              <p>내일은 내일의 태양이 뜬다.</p>
              <p>Manners, Maketh, Man.</p>
            </div>
          ))}
        </div>
      </Div>
      <MessageModal ref={modalRef} />
    </Container>
  );
};

export default ChangeFont;
