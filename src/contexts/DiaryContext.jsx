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
      console.log("Fetched diaries:", response.diaries);
      setDiaries(response.diaries);
      setHasFetchedDiaries(true);
    } catch (error) {
      console.error("Failed to fetch diaries:", error);
    }
  };

  const addDiary = (diary) => {
    setDiaries((prevDiaries) => [...prevDiaries, diary]);
  };

  const updateDiary = (index, updatedDiary) => {
    setDiaries((prevDiaries) => {
      const updatedDiaries = [...prevDiaries];
      updatedDiaries[index] = updatedDiary;
      return updatedDiaries;
    });
  };

  const removeDiary = (index) => {
    setDiaries((prevDiaries) => prevDiaries.filter((_, i) => i !== index));
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
