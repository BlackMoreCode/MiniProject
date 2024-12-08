import axios from "axios";

const BACKEND_DOMAIN = "http://localhost:8111";
const API_BASE_URL = "http://localhost:8111/api";

export const AxiosApi = {
  signUp: async (id, password, email, nickname) => {
    try {
      const response = await axios.post(`${BACKEND_DOMAIN}/auth/signup`, {
        id,
        password,
        email,
        nickname,
      });
      if (response.data.success) {
        return true;
      } else {
        // success가 false이면 백엔드 응답 구조 상 원래 항상 catch로 가야하기 때문에
        // 이 라인에 도달하는 경우는 알 수 없는 응답으로 처리했습니다.
        throw new Error("알 수 없는 응답");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  checkUnique: async (field, value) => {
    try {
      const response = await axios.get(
        `${BACKEND_DOMAIN}/auth/signup/check-unique?field=${field}&value=${value}`
      );
      if (response.data.success) {
        return response.data.isUnique;
      } else {
        // success가 false이면 백엔드 응답 구조 상 원래 항상 catch로 가야하기 때문에
        // 이 라인에 도달하는 경우는 알 수 없는 응답으로 처리했습니다.
        throw new Error("알 수 없는 응답");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  login: async (id, password) => {
    try {
      const response = await axios.post(`${BACKEND_DOMAIN}/auth/login`, {
        id,
        password,
      });
      if (response.data.success) {
        return response.data.isAuthenticated;
      } else {
        // success가 false이면 백엔드 응답 구조 상 원래 항상 catch로 가야하기 때문에
        // 이 라인에 도달하는 경우는 알 수 없는 응답으로 처리했습니다.
        throw new Error("알 수 없는 응답");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  saveDiary: async (loggedInMember, newDiary) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/diary/save`, {
        loggedInMember, // 로그인된 멤버 데이터 보내기
        newDiary, // 일기 객체 (= Diary object; => title, content, tags, etc.)
      });
      return response.data;
    } catch (error) {
      console.error("Failed to save diary:", error);
      throw error.response ? error.response.data : error;
    }
  },

  //추후에 백엔드에서 일기 데이터를 받아서 호출할 API 프로토타입? 현재 불필요한가?
  getDiaries: async ({ loggedInMember, year, month }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/diary/get-monthly-list`,
        {
          loggedInMember,
          date: {
            year,
            month,
          },
        }
      ); // Backend should provide an endpoint for fetching all diaries
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // 일기 업데이트할때 하나만 불러오기?
  getDiary: async (loggedInMember, diaryNum) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/diary/get`, {
        loggedInMember,
        diaryNum,
      });
      return response.data.diary;
    } catch (error) {
      console.error("Failed to fetch diary:", error);
      throw error.response ? error.response.data : error;
    }
  },

  // 기존 일기 수정
  updateDiary: async (diaryNum, loggedInMember, updatedDiary) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/diary/update`, {
        diaryNum,
        loggedInMember,
        ...updatedDiary,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to update diary:", error);
      throw error.response ? error.response.data : error;
    }
  },

  // 기존 일기 삭제
  deleteDiary: async (loggedInMember, diaryNum) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/diary/delete/${diaryNum}`,
        {
          data: { loggedInMember }, // loggedinMember 포함
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to delete diary:", error);
      throw error.response ? error.response.data : error;
    }
  },

  // 회원 다이어리 리스트
  diaries: async (userId) => {
    return await axios.get(BACKEND_DOMAIN + `/home/${userId}`);
  },
};

export default AxiosApi;
