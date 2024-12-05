import React, {useState} from "react";
import "../styles/Font/fonts.css";

const FontSelector = () => {
  const [selectedFont, setSelectedFont] = useState("font-dohyeon");

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  return(
    <>
      {/* 폰트를 선택하지 않으면 기본 폰트로 렌더링된다 */}
      <h1 className={selectedFont || "default-font"}>
        폰트 선택
      </h1>
      <p className={selectedFont || "default-font"}>
        선택한 폰트 적용
      </p>

      {/* 드롭다운: 기본값이 빈 상태로 표시 */}
      <select value={selectedFont} onChange={handleFontChange}>
        <option value="" disabled>
          폰트를 선택하세요
        </option>
        <option value="font-dohyeon">Do Hyeon</option>
        <option value="font-gowundodum">Gowun Dodum</option>
        <option value="font-himelody">Hi Melody</option>
        <option value="font-jua">Jua</option>
        <option value="font-nanumgothic">Nanum Gothic</option>
      </select>
    </>
  );
};

export default FontSelector;