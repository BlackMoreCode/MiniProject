import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = (props) => {
  const [userId, setUserId] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [selectedFont, setSelectedFont] = useState("Nanum Gothic");

  const loggedInMember =
    userId && userPassword ? { id: userId, password: userPassword } : null;

  useEffect(() => {
    const loadUserProfile = () => {
      setUserId(localStorage.getItem("userId"));
      setUserPassword(localStorage.getItem("userPassword"));
    };
    loadUserProfile();
  }, []);

  const login = (id, password) => {
    setUserId(id);
    setUserPassword(password);
    localStorage.setItem("userId", id);
    localStorage.setItem("userPassword", password);
    console.log("Logged in");
  };

  const logout = () => {
    setUserId(null);
    setUserPassword(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("userPassword");
    console.log("Logged out");
  };

  return (
    <LoginContext.Provider
      value={{
        userId,
        setUserId,
        userPassword,
        setUserPassword,
        loggedInMember,
        login,
        logout,
        selectedFont,
        setSelectedFont,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
