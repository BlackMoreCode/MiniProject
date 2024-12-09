import { createContext, useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi.js";
import { DEFAULT } from "../constant/diarySettingKeyword.js";
export const UserContext = createContext(null);

export const UserProfile = (props) => {
  const [userId, setUserId] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [hasFetchedDiaries, setHasFetchedDiaries] = useState(false);

  // 윗 부분 수정?
  const [diaries, setDiaries] = useState([]);

  // 폰트 관련 상태 추가
  const [selectedFont, setSelectedFont] = useState("font-dohyeon");

  // 로그인한 유저를 위한 헬퍼
  const loggedInMember =
    userId && userPassword ? { id: userId, password: userPassword } : null;

  /**
   * 로그인 유저들의 일기를 fetch
   * 이 함수는 로그인 혹은 재 로그인시 호출
   */
  const fetchDiaries = async () => {
    if (!loggedInMember || hasFetchedDiaries) return;

    try {
      const year = new Date().getFullYear().toString();
      const month = (new Date().getMonth() + 1).toString();
      const response = await AxiosApi.getDiaries({
        loggedInMember,
        year,
        month,
      });
      console.log("Fetched diaries:", response); // 콘솔 로그 찍어서 어떤식으로 받는지 확인
      console.log("Fetched diaries:", response.diaries); // response.diaries도 찍어둔다.
      setDiaries(response.diaries); // Update context state
    } catch (error) {
      console.error("Failed to fetch diaries from backend:", error);
    }
  };

  // 태그와 코드스니펫과 함께 일기 추가
  const addDiary = (diary) => {
    setDiaries((prevDiaries) => {
      if (prevDiaries === null) prevDiaries = []; // 맨 처음 추가면 당연히 그 전 일기가 없을테니, 밑에 라인에서 에러나는거 방지용
      const updatedDiaries = [...prevDiaries, diary];
      return updatedDiaries;
    });
  };

  // 기존 일기 업데이트
  const updateDiary = (index, updatedDiary) => {
    setDiaries((prevDiaries) => {
      const updatedDiaries = [...prevDiaries];
      updatedDiaries[index] = updatedDiary; //특정 인덱스를 가진 일기 수정
      return updatedDiaries;
    });
  };

  // 일기 삭제
  const removeDiary = (index) => {
    setDiaries((prevDiaries) => {
      const updatedDiaries = prevDiaries.filter((_, i) => i !== index); //특정 인덱스의 일기 제거
      return updatedDiaries;
    });
  };

  // 앱초기화에 로컬스토리로서부터 유저 프로필 불러오기 (credentials)
  useEffect(() => {
    const loadUserProfile = () => {
      setUserId(localStorage.getItem("userId"));
      setUserPassword(localStorage.getItem("userPassword"));
    };
    loadUserProfile();
  }, []);

  const login = async (id, password) => {
    setUserId(id);
    setUserPassword(password);
    localStorage.setItem("userId", id);
    localStorage.setItem("userPassword", password);
    console.log("const login");
    await fetchDiaries(); // Fetch diaries after login
  };

  /**
   * Logout: Clear user context state and localStorage
   */
  const logout = () => {
    console.log("logged out");
    setUserId(null);
    setUserPassword(null);
    // setDiaries([]); // Clear diaries on logout
    localStorage.removeItem("userId");
    localStorage.removeItem("userPassword");
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        userPassword,
        setUserPassword,
        loggedInMember,
        diaries, // context에 일기 제공
        addDiary,
        updateDiary,
        removeDiary,
        fetchDiaries,
        login,
        logout,
        selectedFont, // 추가된 폰트 상태
        setSelectedFont,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
