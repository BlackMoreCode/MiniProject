import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LoginContents,
  LoginHeader,
  LoginMain,
  SignUpNav,
} from "./LoginStyles";
import signUpIcon from "../../assets/icons/signup-icon.png";

export const Login = () => {
  const [formValues, setFormValues] = useState({
    id: "",
    password: "",
  });

  return (
    <LoginContents>
      <LoginHeader></LoginHeader>
      <LoginMain>
        <h1>로그인</h1>
        <form noValidate>
          <div>
            <div>
              <input
                name="id"
                value={formValues.id}
                placeholder="아이디"
                type="text"
                maxLength={30}
              />
            </div>
            <div>
              <input
                name="password"
                value={formValues.password}
                placeholder="비밀번호"
                type="password"
                minLength={8}
                maxLength={30}
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            로그인
          </button>
        </form>
        <SignUpNav>
          <p>회원이 아니신가요?</p>
          <Link to="/signup">
            <img src={signUpIcon} alt="회원가입 아이콘" />
            회원가입
          </Link>
        </SignUpNav>
      </LoginMain>
    </LoginContents>
  );
};
