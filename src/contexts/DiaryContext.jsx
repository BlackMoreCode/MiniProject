import { createContext, useContext, useState } from "react";
import { LoginContext } from "./LoginContext.jsx";
import AxiosApi from "../api/AxiosApi.js";

export const DiaryContext = createContext(null);

export const DiaryProvider = (props) => {
  const { loggedInMember } = useContext(LoginContext); // 로그인 컨텍스트에 접근해야한다.
  const [hasFetchedDiaries, setHasFetchedDiaries] = useState(false);
  const [diaries, setDiaries] = useState([]);

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

  return (
    <DiaryContext.Provider
      value={{
        diaries,
        fetchDiaries,
        addDiary,
        updateDiary,
        removeDiary,
      }}
    >
      {props.children}
    </DiaryContext.Provider>
  );
};
