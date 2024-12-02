import { createContext, useEffect, useState } from "react";
import { DEFAULT } from "../constant/diarySettingKeyword.js";
export const UserContext = createContext(null);

export const UserProfile = (props) => {
  const [userId, setUserId] = useState(null);
  const [userPw, setUserPw] = useState(null);
  const [theme, setTheme] = useState(DEFAULT);
  const [font, setFont] = useState(DEFAULT);
  const [alertSound, setAlertSound] = useState(DEFAULT);

  // 코드 스니핏, 태그, 일기 관리하는 상태
  const [diaries, setDiaries] = useState(() => {
    const savedDiaries = localStorage.getItem("diaries");
    return savedDiaries ? JSON.parse(savedDiaries) : []; // load from localStorage
  });

  // 태그와 코드스니펫과 함께 일기 추가
  const addDiary = (diary) => {
    setDiaries((prevDiaries) => {
      const updatedDiaries = [...prevDiaries, diary];
      localStorage.setItem("diaries", JSON.stringify(updatedDiaries)); // Save to localStorage
      return updatedDiaries;
    });
  };

  // 기존 일기 업데이트
  const updateDiary = (index, updatedDiary) => {
    setDiaries((prevDiaries) => {
      const updatedDiaries = [...prevDiaries];
      updatedDiaries[index] = updatedDiary; //특정 인덱스를 가진 일기 수정

      localStorage.setItem("diaries", JSON.stringify(updatedDiaries)); // 로컬 스토리지에 저장
      return updatedDiaries;
    });
  };

  // 일기 삭제
  const removeDiary = (index) => {
    setDiaries((prevDiaries) => {
      const updatedDiaries = prevDiaries.filter((_, i) => i !== index); //특정 인덱스의 일기 제거

      localStorage.setItem("diaries", JSON.stringify(updatedDiaries)); // 로컬 스토리지에 저장
      return updatedDiaries;
    });
  };

  useEffect(() => {
    setUserId(localStorage.getItem("userId") || null);
    setUserPw(localStorage.getItem("userPw") || null);

    // On initial load, if user info is available, load settings (theme, font, etc.)
    // 최초 로드시 userInfo 가 있다면
    if (userId && userPw) {
      const userTheme = DEFAULT;
      setTheme(userTheme);
    } else {
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
        diaries, // context에 일기 제공
        addDiary,
        updateDiary,
        removeDiary,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
