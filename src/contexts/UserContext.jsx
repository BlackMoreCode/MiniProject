import { createContext, useEffect, useState } from "react";
import { DEFAULT } from "../constant/diarySettingKeyword.js";
export const UserContext = createContext(null);

export const UserProfile = (props) => {
  const [userId, setUserId] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  // const [theme, setTheme] = useState(DEFAULT);
  // const [font, setFont] = useState(DEFAULT);
  // const [alertSound, setAlertSound] = useState(DEFAULT);

  // 코드 스니핏, 태그, 일기 관리하는 상태. 백엔드랑 합쳐지기 전 까지 남아있기
  const [diaries, setDiaries] = useState(() => {
    const savedDiaries = localStorage.getItem("diaries");
    return savedDiaries ? JSON.parse(savedDiaries) : []; // load from localStorage
  });

  // 로그인한 유저를 위한 헬퍼
  const loggedInMember =
    userId && userPassword ? { id: userId, password: userPassword } : null;

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
    const loadUserProfile = () => {
      setUserId(localStorage.getItem("userId"));
      setUserPassword(localStorage.getItem("userPassword"));
    };
    loadUserProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        userPassword,
        setUserPassword,
        loggedInMember,
        // theme,
        // setTheme,
        // font,
        // setFont,
        // alertSound,
        // setAlertSound,
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
