import axios from "axios";

const BACKEND_DOMAIN = "http://localhost:8111";

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
        console.log("알 수 없는 응답");
        throw new Error();
      }
    } catch (error) {
      console.log(error);
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
        console.log("알 수 없는 응답");
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default AxiosApi;
