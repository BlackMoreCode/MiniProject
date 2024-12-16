import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IntroContents } from "./IntroStyles";
import logoIcon from "../../assets/icons/logo.svg";
import { LoginContext } from "../../contexts/LoginContext";

const Intro = () => {
  const { loggedInMember } = useContext(LoginContext);
  const navigator = useNavigate();

  useEffect(() => {
    if (loggedInMember) navigator("/");
  }, [loggedInMember]);

  return (
    <IntroContents>
      <img src={logoIcon} alt="CODELOG 로고" />
      <button
        onClick={() => {
          navigator("/login");
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          navigator("/signup");
        }}
      >
        가입하기
      </button>
    </IntroContents>
  );
};

export default Intro;
