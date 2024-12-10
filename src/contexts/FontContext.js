import React, { createContext, useState } from "react";

// FontContext 생성
export const FontContext = createContext();

// FontProvider 컴포넌트 정의
export const FontProvider = ({ children }) => {
  // 선택된 폰트 상태 관리
  const [selectedFont, setSelectedFont] = useState("font-dohyeon");

  return (
    <FontContext.Provider value={{ selectedFont, setSelectedFont }}>
      <div className={selectedFont}>{children}</div>
    </FontContext.Provider>
  );
};
