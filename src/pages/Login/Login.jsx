import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginContents,
  LoginHeader,
  LoginMain,
  SignUpNav,
} from "./LoginStyles";
import signUpIcon from "../../assets/icons/signup-icon.png";
import AxiosApi from "../../api/AxiosApi";
import MessageModal from "../../components/MessageModal";
import { login, logout } from "../../util/loginUtils";
import { LoginContext } from "../../contexts/LoginContext";
import { PrevPageButton } from "../../components/PrevPageButton";

export const Login = () => {
  const context = useContext(LoginContext);
  const { userId, userPassword, setUserId, setUserPassword } = context;
  const navigate = useNavigate();

  if (userId && userPassword) navigate("/");

  const [formValues, setFormValues] = useState({
    id: "",
    password: "",
  });

  const modalRef = useRef();

  const openModal = (title, description) => {
    modalRef.current?.enable(title, description);
  };

  const closeModal = () => {
    modalRef.current?.disable();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isAuthenticated = await AxiosApi.login(
      formValues.id,
      formValues.password
    );

    if (!isAuthenticated) {
      openModal(
        "로그인 실패",
        "아이디 또는 비밀번호가 일치하지 않습니다. 다시 입력해 주세요."
      );
    } else {
      login(formValues.id, formValues.password);
      setUserId(formValues.id);
      setUserPassword(formValues.password);
      navigate("/");
    }
  };

  return (
    <LoginContents>
      <LoginHeader>
        <PrevPageButton />
      </LoginHeader>
      <LoginMain>
        <h1>로그인</h1>
        <form noValidate>
          <div>
            <div>
              <input
                value={formValues.id}
                name="id"
                placeholder="아이디"
                type="text"
                maxLength={30}
                onChange={(event) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    id: event.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <input
                value={formValues.password}
                name="password"
                placeholder="비밀번호"
                type="password"
                minLength={8}
                maxLength={30}
                onChange={(event) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    password: event.target.value,
                  }));
                }}
              />
            </div>
            <SignUpNav>
              <p>회원이 아니신가요?</p>
              <Link to="/signup">
                <img src={signUpIcon} alt="회원가입 아이콘" />
                회원가입
              </Link>
            </SignUpNav>
          </div>

          <button
            disabled={!formValues.id.trim() || !formValues.password.trim()}
            type="submit"
            onClick={handleSubmit}
          >
            로그인
          </button>
        </form>
      </LoginMain>
      <MessageModal ref={modalRef} />
    </LoginContents>
  );
};
