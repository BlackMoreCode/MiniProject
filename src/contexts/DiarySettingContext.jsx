import React, { createContext, useState, useEffect, useContext } from "react";
import AxiosApi from "../api/AxiosApi";
import { LoginContext } from "./LoginContext";

export const DiarySettingContext = createContext();

export const DiarySettingProvider = ({ children }) => {
  const { loggedInMember } = useContext(LoginContext);
  const [diarySetting, setDiarySetting] = useState(DEFAULT_SETTING);

  useEffect(() => {
    const fetchDiarySetting = async () => {
      const fetchedDiarySetting = await AxiosApi.getDiarySetting(
        loggedInMember
      );
      setDiarySetting(fetchedDiarySetting);
    };

    if (loggedInMember) {
      fetchDiarySetting();
    } else {
      setDiarySetting(DEFAULT_SETTING);
    }
  }, [loggedInMember]);

  const updateDiarySetting = async (propertyName, propertyValue) => {
    const updatedDiarySetting = {
      [propertyName]: propertyValue,
    };
    const isUpdated = await AxiosApi.updateDiarySetting(
      loggedInMember,
      updatedDiarySetting
    );
    if (isUpdated) {
      setDiarySetting((prevState) => ({
        ...prevState,
        [propertyName]: propertyValue,
      }));
      return true;
    } else {
      return false;
    }
  };

  return (
    <DiarySettingContext.Provider value={{ diarySetting, updateDiarySetting }}>
      {children}
    </DiarySettingContext.Provider>
  );
};

const DEFAULT_SETTING = {
  font: "default",
  theme: "default",
  mainBannerImage: "default",
  alertSound: "default",
};
