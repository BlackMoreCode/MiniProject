import React, { useContext, useEffect, useRef, useState } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
// context
import { LoginContext } from "../../contexts/LoginContext";
import { DiarySettingContext } from "../../contexts/DiarySettingContext";
// css
import { Container, Div } from "./MyPageStyles";
// icon
import { IoIosArrowBack } from "react-icons/io";
// Modal
import MessageModal from "../../components/MessageModal";

const DeleteMember = () => {
  const { userId, userPassword } = useContext(LoginContext);
  const [inputId, setInputId] = useState("");
  const [idMessage, setIdMessage] = useState("");
  const [idCheck, setIdCheck] = useState(false);

  const [currentEmail, setCurrentEmail] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);

  const [inputPassword, setInputPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(false);

  const [inputPassword2, setInputPassword2] = useState("");
  const [passwordMessage2, setPasswordMessage2] = useState("");
  const [passwordCheck2, setPasswordCheck2] = useState("");

  const { logout } = useContext(LoginContext);

  const { diarySetting } = useContext(DiarySettingContext);

  const inputRef = useRef([]);

  const modalRef = useRef();
  const openModal = (title, description) => {
    modalRef.current?.enable(title, description);
  };

  const navigate = useNavigate();

  //백엔드로서부터 데이터 받기 위한 프로토타입.
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userInfo = await AxiosApi.getUserDetails(userId);
        setCurrentEmail(userInfo.email);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
    if (userId) fetchUserDetails();
  }, [userId]);

  // 폰트 설정
  const [userFont, setUserFont] = useState("default");
  useEffect(() => {
    if (diarySetting.font === "Do Hyeon") {
      setUserFont("font-do-hyeon");
    } else if (diarySetting.font === "Gowun Dodum") {
      setUserFont("font-gowun-dodum");
    } else if (diarySetting.font === "Hi Melody") {
      setUserFont("font-hi-melody");
    } else if (diarySetting.font === "Jua") {
      setUserFont("font-jua");
    } else {
      setUserFont("font-default");
    }
  }, [diarySetting.font]);

  // 페이지 열 때 커서 포커싱
  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  // 아이디 체크
  const onChangeId = (e) => {
    const input = e.target.value;
    setInputId(input);

    if (input === userId) {
      setIdMessage("아이디가 같습니다.");
      setIdCheck(true);
      inputRef.current[1].focus();
    } else {
      setIdMessage("아이디가 같지 않습니다.");
      setIdCheck(false);
    }
  };
  useEffect(
    (idCheck, emailCheck, passwordCheck) => {
      if (inputRef.current[1]) {
        inputRef.current[1].focus();
      }
      if (inputRef.current[2]) {
        inputRef.current[2].focus();
      }
      if (inputRef.current[3]) {
        inputRef.current[3].focus();
      }
    },
    [idCheck, emailCheck, passwordCheck]
  );

  // 이메일 체크
  const onChangeEmail = (e) => {
    const input = e.target.value;
    setInputEmail(input);

    if (currentEmail === input) {
      setEmailMessage("이메일이 같습니다.");
      setEmailCheck(true);
      inputRef.current[2].focus();
    } else {
      setEmailMessage("이메일이 같지 않습니다.");
      setEmailCheck(false);
    }
  };

  // 현재 비밀번호 확인
  const onChangePassword = (e) => {
    const input = e.target.value;
    setInputPassword(input);
    if (input === userPassword) {
      setPasswordMessage("비밀번호가 일치합니다.");
      setPasswordCheck(true);
      inputRef.current[3].focus();
    } else {
      setPasswordMessage("비밀번호가 일치하지 않습니다.");
      setPasswordCheck(false);
    }
  };

  // 비밀번호 확인 체크
  const onChangePassword2 = (e) => {
    const input = e.target.value;
    setInputPassword2(input);

    if (input === userPassword) {
      setPasswordMessage2("비밀번호가 일치합니다.");
      setPasswordCheck2(true);
    } else {
      setPasswordMessage("비밀번호가 일치하지 않습니다.");
      setPasswordCheck2(false);
    }
  };

  // 회원 정보 삭제 기능
  const handleDeleteMember = async (e) => {
    // e.preventDefault(); // 기본 동작 방지
    try {
      await AxiosApi.deleteMember(inputId, inputPassword);
      modalRef.current?.setOnClose(() => {
        logout();
        navigate("/intro");
      });

      openModal("회원 탈퇴", "코드로그 회원 탈퇴가 완료되었습니다.");
    } catch (error) {
      console.error("Failed to update profile:", error);
      openModal(
        "회원 탈퇴",
        "서버 통신 과정에서 문제가 발생했습니다. 관리자에게 문의해주세요.🥲"
      );
    }
  };

  return (
    <Container>
      <Div
        className={`${
          diarySetting.theme === "dark"
            ? "phone-container-dark"
            : "phone-container"
        } 
          ${userFont} 
        `}
      >
        <div className="profile-header">
          <button onClick={() => navigate("/mypage")} className="backBtn">
            <IoIosArrowBack />
          </button>
          <p onClick={() => navigate("/mypage")} className="mypage-title">
            회원 삭제
          </p>
        </div>

        <form className="profile-form">
          <div className="inputBox">
            <input
              type="text"
              placeholder="아이디를 입력해주세요."
              value={inputId}
              ref={(el) => (inputRef.current[0] = el)}
              onChange={onChangeId}
              className="profile-inputRqd"
              readOnly={idCheck}
              required
            />
            {inputId.length > 0 && (
              <p className={`message${idCheck ? "On" : "Off"}`}>{idMessage}</p>
            )}
          </div>

          <div className={idCheck ? "inputBox" : "inputBox-invisible"}>
            <input
              type="email"
              placeholder="이메일을 입력해주세요."
              value={inputEmail}
              ref={(el) => (inputRef.current[1] = el)}
              onChange={onChangeEmail}
              className="profile-input"
              readOnly={emailCheck}
              required
            />
            {inputEmail.length > 0 && (
              <p className={`message${emailCheck ? "On" : "Off"}`}>
                {emailMessage}
              </p>
            )}
          </div>

          <div className={emailCheck ? "inputBox" : "inputBox-invisible"}>
            <input
              type="password"
              placeholder="현재 비밀번호를 입력해주세요."
              value={inputPassword}
              ref={(el) => (inputRef.current[2] = el)}
              onChange={onChangePassword}
              className="profile-input"
              readOnly={passwordCheck}
              required
            />
            {inputPassword.length > 0 && (
              <p className={`message${passwordCheck ? "On" : "Off"}`}>
                {passwordMessage}
              </p>
            )}
          </div>

          <div className={passwordCheck ? "inputBox" : "inputBox-invisible"}>
            <input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              value={inputPassword2}
              ref={(el) => (inputRef.current[3] = el)}
              onChange={onChangePassword2}
              className="profile-input"
              readOnly={passwordCheck2}
              required
            />
            {inputPassword2.length > 0 && (
              <p className={`message${passwordCheck2 ? "On" : "Off"}`}>
                {passwordMessage2}
              </p>
            )}
          </div>

          <button
            type="button"
            className="submitBtn"
            disabled={!passwordCheck2}
            onClick={handleDeleteMember}
          >
            {passwordCheck2 ? "회원 탈퇴" : "비활성화"}
          </button>
        </form>
      </Div>
      <MessageModal ref={modalRef} />
    </Container>
  );
};

export default DeleteMember;
