import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { SignUpContents, SignUpHeader, SignUpMain } from "./SignUpStyles";
import { PrevPageButton } from "../../components/PrevPageButton";
import AxiosApi from "../../api/AxiosApi";
import { validateSignUpForm } from "../../util/validateUtils";

export const SignUp = () => {
  // input value 상태 변수
  const [formValues, setFormValues] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    email: "",
    nickname: "",
  });

  // 각 input 입력 값에 대한 피드백 메시지 상태 변수
  const [formMessages, setFormMessages] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    email: "",
    nickname: "",
  });

  const navigate = useNavigate();

  // 마지막 유저 입력으로부터 timeout을 설정,
  // timeout 이후 유효성 검증 요청하는 값
  const debounceTimeouts = useRef({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // 업데이트된 formValues 생성
    const newFormValues = {
      ...formValues,
      [name]: value,
    };

    setFormValues(newFormValues);

    // 기존 timeout 해제
    if (debounceTimeouts[name]) {
      clearTimeout(debounceTimeouts[name]);
    }

    // 새로운 timeout 설정
    debounceTimeouts[name] = setTimeout(() => {
      // formValues 상태 변수는 아직 사용자 입력 값으로 업데이트 되지 않았으므로 newFormValues를 전달
      validateSignUpForm(name, newFormValues, setFormMessages);
    }, 500);
  };

  const isFormValid = () => {
    const isFormMessagesEmpty = Object.values(formMessages).every(
      (message) => message === ""
    );
    const isFormValuesFilled = Object.values(formValues).every(
      (value) => value.trim() !== ""
    );

    return isFormMessagesEmpty && isFormValuesFilled;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      alert("입력 양식이 유효하지 않습니다.");
      return;
    }

    const isSignUpSuccess = await AxiosApi.signUp(
      formValues.id,
      formValues.password,
      formValues.email,
      formValues.nickname
    );

    if (isSignUpSuccess) {
      alert("회원 가입 성공");
      navigate("/intro");
    } else {
      alert("회원 가입 실패, 로그를 확인하세요.");
    }
  };

  return (
    <SignUpContents>
      <SignUpHeader>
        <PrevPageButton />
      </SignUpHeader>
      <SignUpMain>
        <h1>회원가입</h1>
        <form noValidate onSubmit={handleSubmit}>
          <div>
            <div>
              <input
                name="id"
                value={formValues.id}
                placeholder="아이디"
                type="text"
                maxLength={30}
                onChange={handleInputChange}
              />
              <p>{formMessages.id}</p>
            </div>
            <div>
              <input
                name="password"
                value={formValues.password}
                placeholder="비밀번호"
                type="password"
                minLength={8}
                maxLength={30}
                onChange={handleInputChange}
              />
              <p>{formMessages.password}</p>
            </div>
            <div>
              <input
                name="passwordConfirm"
                value={formValues.passwordConfirm}
                placeholder="비밀번호 확인"
                type="password"
                minLength={8}
                maxLength={30}
                onChange={handleInputChange}
              />
              <p>{formMessages.passwordConfirm}</p>
            </div>
            <div>
              <input
                name="email"
                value={formValues.email}
                placeholder="이메일"
                type="email"
                maxLength={100}
                onChange={handleInputChange}
              />
              <p>{formMessages.email}</p>
            </div>
            <div>
              <input
                name="nickname"
                value={formValues.nickname}
                placeholder="닉네임"
                type="text"
                maxLength={20}
                onChange={handleInputChange}
              />
              <p>{formMessages.nickname}</p>
            </div>
          </div>
          <button disabled={!isFormValid()} type="submit">
            등록
          </button>
        </form>
      </SignUpMain>
    </SignUpContents>
  );
};
