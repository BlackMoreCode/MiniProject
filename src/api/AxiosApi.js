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
        loggedInMember,
        newDiary,
      });
      return response.data; // 성공 메세지 혹은 관련 데이터 반환
    } catch (error) {
      throw error.response ? error.response.data : error; // 에러시 백엔드 에러 보내기?
    }
  },

  //추후에 백엔드에서 일기 데이터를 받아서 호출할 API 프로토타입?
  getDiaries: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/diary/all`); // Backend should provide an endpoint for fetching all diaries
      return response.data;
    } catch (error) {
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
          data: { loggedInMember }, // 백엔드에서 멤버 데이터를 요구시 (실제로 그래야하지 않나?)
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to delete diary:", error);
      throw error.response ? error.response.data : error;
    }
  },
};

export default AxiosApi;
