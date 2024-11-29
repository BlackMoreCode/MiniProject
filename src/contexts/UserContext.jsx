import { createContext, useEffect, useState } from "react";
import { DEFAULT } from "../constant/diarySettingKeyword.js";
export const UserContext = createContext(null);

export const UserProfile = (props) => {
  const [userId, setUserId] = useState(null);
  const [userPw, setUserPw] = useState(null);
  const [theme, setTheme] = useState(DEFAULT);
  const [font, setFont] = useState(DEFAULT);
  const [alertSound, setAlertSound] = useState(DEFAULT);

  // localStorage 서 부터 일기 초기화
  const [diaries, setDiaries] = useState(() => {
    const savedDiaries = localStorage.getItem("diaries");
    return savedDiaries ? JSON.parse(savedDiaries) : []; // localStorage로부터 불러오거나, falsy 값이면 빈 배열서부터 시작.
  });

  const addDiary = (diary) => {
    setDiaries((prevDiaries) => {
      const updatedDiaries = [...prevDiaries, diary];
      localStorage.setItem("diaries", JSON.stringify(updatedDiaries)); // localStorage에 저장
      return updatedDiaries;
    });
  };

  const updateDiary = (index, updatedDiary) => {
    setDiaries((prevDiaries) => {
      const updatedDiaries = [...prevDiaries];
      updatedDiaries[index] = updatedDiary; // 특정 일기 업데이트
      console.log("Updated diaries:", updatedDiaries); // 디버깅 로그 : 업데이트 되었나?
      localStorage.setItem("diaries", JSON.stringify(updatedDiaries)); // localStorage에 유지
      return updatedDiaries;
    });
  };

  const removeDiary = (index) => {
    setDiaries((prevDiaries) => {
      console.log("Current diaries before removal:", prevDiaries); // Should show the current list of diaries
      console.log("Index to remove:", index); // Check if the correct index is passed
      const updatedDiaries = prevDiaries.filter((_, i) => i !== index);
      console.log("Diaries after removal:", updatedDiaries); // Check the updated diaries array
      localStorage.setItem("diaries", JSON.stringify(updatedDiaries));
      return updatedDiaries;
    });
  };

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
  }, [userId, userPw]);

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
        diaries,
        addDiary,
        updateDiary,
        removeDiary,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
