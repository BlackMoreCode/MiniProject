import { createContext, useEffect, useState } from "react";
import { DEFAULT } from "../constant/diarySettingKeyword.js";
export const UserContext = createContext(null);

export const UserProfile = (props) => {
  const [userId, setUserId] = useState(null);
  const [userPw, setUserPw] = useState(null);
  const [theme, setTheme] = useState(DEFAULT);
  const [font, setFont] = useState(DEFAULT);
  const [alertSound, setAlertSound] = useState(DEFAULT);

  useEffect(() => {
    setUserId(localStorage.getItem("userId") || null);
    setUserPw(localStorage.getItem("userPw") || null);

    // 새로고침 또는 진입 시 localStorage에 userId, userPw가 있는 경우
    if (userId && userPw) {
      // 서버에 API 호출하여 유저 세팅 값 설정하는 함수 호출 (테마, 폰트, 배경 이미지 등)
      const userTheme = DEFAULT;
      setTheme(userTheme);
    } else {
      // 전부 기본 값으로 초기화
      setTheme(DEFAULT);
    }
  }, [userId, userPw, theme]);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        userPw,
        setUserPw,
        theme,
        setTheme,
        font,
        setFont,
        alertSound,
        setAlertSound,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
