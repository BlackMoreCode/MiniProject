import axios from "axios";
import { formatToSeoulLocal } from "../util/dateUtils";

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
      console.log("Saving diary to backend..."); // 제대로 들어간다는거 확인용
      const response = await axios.post(`${API_BASE_URL}/diary/save`, {
        loggedInMember, // 로그인된 멤버 데이터 보내기
        newDiary, // 일기 객체 (= Diary object; => title, content, tags, etc.)
      });
      console.log("Backend response:", response); //백엔드 응답
      return response.data;
    } catch (error) {
      console.error("Failed to save diary:", error);
      throw error.response ? error.response.data : error;
    }
  },

  //추후에 백엔드에서 일기 데이터를 받아서 호출할 API
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
  getDiary: async ({ loggedInMember, diaryNum }) => {
    console.log("getDiary called with:", { loggedInMember, diaryNum });
    try {
      const response = await axios.post(`${API_BASE_URL}/diary/get`, {
        loggedInMember,
        diaryNum,
      });
      console.log("Backend Response:", response.data);
      return response.data.diary;
    } catch (error) {
      console.error("Failed to fetch diary:", error);
      throw error.response ? error.response.data : error;
    }
  },

  // 기존 일기 수정
  updateDiary: async ({ loggedInMember, diaryNum, updatedDiary }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/diary/update`, {
        loggedInMember,
        diaryNum,
        updatedDiary,
      });
      console.log("Update Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to update diary:", error);
      throw error.response ? error.response.data : error;
    }
  },

  // 기존 일기 삭제
  deleteDiary: async ({ loggedInMember, diaryNum }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/diary/delete`, {
        loggedInMember,
        diaryNum,
      });
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

  // 회원 정보 수정
  updateProfile: async (id, email, nickname, password) => {
    try {
      const response = await axios.post(`${BACKEND_DOMAIN}/members/update`, {
        id,
        email,
        nickname,
        password,
      });
      if (response.status === 200 && response.data.success) {
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

  // 회원 정보 삭제
  deleteMember: async (id, password) => {
    try {
      const response = await axios.post(`${BACKEND_DOMAIN}/members/delete`, {
        id,
        password,
      });
      if (response.status === 200 && response.data.success) {
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

  getUserDetails: async (id) => {
    try {
      const response = await axios.post(`${BACKEND_DOMAIN}/members/get`, {
        id,
      });
      return response.data.memberInfo;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  getDiarySetting: async (loggedInMember) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/setting/get`,
        loggedInMember
      );
      return response.data.diarySetting;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  updateDiarySetting: async (loggedInMember, updatedDiarySetting) => {
    console.log("Sending to updateDiarySetting:", {
      loggedInMember,
      updatedDiarySetting,
    });
    try {
      const response = await axios.post(`${API_BASE_URL}/setting/update`, {
        loggedInMember,
        updatedDiarySetting,
      });

      // 응답에서 상태 확인
      console.log("API Response:", response.data);
      return response.data.isUpdated; // 성공 여부 반환
    } catch (error) {
      console.error("Error updating diary setting:", error);
      return false; // 실패 시 false 반환
    }
  },

  // 플래너 / 스케쥴 관련 API
  getMonthlySchedules: async ({ loggedInMember, year, month }) => {
    console.log("Requesting monthly schedules with:", {
      loggedInMember,
      year,
      month,
    });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/schedule/get-monthly-list`,
        {
          loggedInMember,
          date: { year, month },
        }
      );
      console.log("Received monthly schedules response:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error fetching monthly schedules:", error.response.data);
        throw error.response.data;
      } else {
        console.error("Error fetching monthly schedules:", error.message);
        throw new Error("Network or server error");
      }
    }
  },

  saveSchedule: async ({ loggedInMember, newSchedule }) => {
    // { loggedInMember, newSchedule }
    console.log("Saving schedule:", { loggedInMember, newSchedule }); // payload 검사용 로그
    try {
      const response = await axios.post(`${API_BASE_URL}/schedule/save`, {
        loggedInMember,
        newSchedule,
      });
      console.log("Save response:", response.data); // 백엔드 응답 로깅용
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error saving schedule:", error.response.data);
        throw error.response.data;
      } else {
        console.error("Error saving schedule:", error.message);
        throw new Error("Network or server error");
      }
    }
  },

  updateSchedule: async ({ loggedInMember, scheduleNum, updatedSchedule }) => {
    console.log("Updating schedule:", {
      loggedInMember,
      scheduleNum,
      updatedSchedule,
    });
    try {
      const response = await axios.post(`${API_BASE_URL}/schedule/update`, {
        loggedInMember,
        scheduleNum,
        updatedSchedule,
      });
      console.log("Update response:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error updating schedule:", error.response.data);
        throw error.response.data;
      } else {
        console.error("Error updating schedule:", error.message);
        throw new Error("Network or server error");
      }
    }
  },

  deleteSchedule: async ({ loggedInMember, scheduleNum }) => {
    try {
      console.log("Sending deleteSchedule request with:", {
        loggedInMember,
        scheduleNum,
      });
      const response = await axios.post(`${API_BASE_URL}/schedule/delete`, {
        loggedInMember,
        scheduleNum,
      });
      console.log("Received deleteSchedule response:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error deleting schedule:", error.response.data);
        throw error.response.data;
      } else {
        console.error("Error deleting schedule:", error.message);
        throw new Error("Network or server error");
      }
    }
  },
};

export default AxiosApi;
