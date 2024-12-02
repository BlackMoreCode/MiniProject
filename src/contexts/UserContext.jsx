import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);

export const UserProfile = (props) => {
  const [userId, setUserId] = useState(null);
  const [userPassword, setUserPassword] = useState(null);

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
