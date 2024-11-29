import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { RegisterPage, Header } from "./RegisterPageStyles";
import { PrevPageButton } from "../../components/PrevPageButton";
import axios from "axios";

export const Register = () => {
  // input 요소의 value 상태 변수 등록
  const [idInputValue, setIdInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [nicknameInputValue, setNicknameInputValue] = useState("");

  // DOM 요소 참조
  const idInput = useRef(null);
  const passwordInput = useRef(null);
  const emailInput = useRef(null);
  const nicknameInput = useRef(null);
  const idInputMessage = useRef(null);
  const passwordInputMessage = useRef(null);
  const emailInputMessage = useRef(null);
  const nicknameInputMessage = useRef(null);

  const navigate = useNavigate();

  const updateConfilctMessage = (inputKind) => {
    switch (inputKind) {
      case "id":
        idInputMessage.current.textContent = "이미 사용 중인 아이디입니다.";
        break;
      case "email":
        emailInputMessage.current.textContent = "이미 사용 중인 이메일입니다.";
        break;
      case "nickname":
        nicknameInputMessage.current.textContent =
          "이미 사용 중인 닉네임입니다.";
        break;
      default:
        return;
    }
  };

  const handleLoginButtonClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8111/auth/register", {
        id: `${idInput.current.value}`,
        password: `${passwordInput.current.value}`,
        email: `${emailInput.current.value}`,
        nickname: `${nicknameInput.current.value}`,
      });
      if (response.status === 200 && response.data.isSuccess) navigate("/");
      else {
        alert("알 수 없는 응답");
        console.log("알 수 없는 응답");
      }
    } catch (e) {
      let msg = "회원 가입 실패";
      switch (e.status) {
        case 400:
          alert(msg);
          break;
        case 409:
          updateConfilctMessage(e.response.data.duplicateKey);
          break;
        default:
          alert(msg);
      }
    }
  };

  return (
    <RegisterPage>
      <Header>
        <PrevPageButton />
      </Header>
      <h1>회원가입</h1>
      <form noValidate>
        <div>
          <div>
            <input
              ref={idInput}
              placeholder="아이디"
              type="text"
              maxLength={30}
            />
            <p ref={idInputMessage}></p>
          </div>
          <div>
            <input
              ref={passwordInput}
              placeholder="비밀번호 (8~30자)"
              type="password"
              minLength={8}
              maxLength={30}
            />
            <p ref={passwordInputMessage}></p>
          </div>
          <div>
            <input
              ref={emailInput}
              placeholder="이메일"
              type="email"
              maxLength={100}
            />
            <p ref={emailInputMessage}></p>
          </div>
          <div>
            <input
              ref={nicknameInput}
              placeholder="닉네임"
              type="text"
              maxLength={20}
            />
            <p ref={nicknameInputMessage}></p>
          </div>
        </div>

        <button onClick={handleLoginButtonClick}>등록</button>
      </form>
    </RegisterPage>
  );
};
