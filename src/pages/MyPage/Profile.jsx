import React, { useContext, useEffect, useState } from "react";
import AxiosApi from "../../api/AxiosApi";

import { LoginContext } from "../../contexts/LoginContext";
import { Container, Div } from "./MyPageStyles";
import { PrevPageButton } from "../../components/PrevPageButton";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userId, userPassword, email, nickname } = useContext(LoginContext);
  const [userDetails, setUserDetails] = useState(null);
  const [inputEmail, setInputEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [inputNickname, setInputNickname] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPwMessage, setCurrentPwMessage] = useState("");
  const [currentPwCheck, setCurrentPwCheck] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordMessage, setNewPasswordMessage] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [newPasswordMessage2, setNewPasswordMessage2] = useState("");
  const [newPasswordCheck2, setNewPasswordCheck2] = useState("");
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  
  const navigate = useNavigate();

  // setInputEmail(email);
  // setInputNickname(nickname);

  // 이메일 체크
  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
    const emailRgx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(!emailRgx.test(e.target.value)) {
      setEmailMessage("올바른 이메일 형식이 아닙니다.");
      setEmailCheck(false);
    } else {
      setEmailCheck(true);
      if(email === inputEmail) {
        setEmailMessage("");
      } else {
        setEmailMessage("올바른 형식입니다.")
      emailUniqueCheck(e.target.value);
      }
    }
  }
  
  // 이메일 중복 확인
  const emailUniqueCheck = async (emailValue) => {
    if (!emailValue) {
      setEmailMessage("");
      return;
    }
    // 값이 있으므로 중복 확인 수행
    const isUnique = await AxiosApi.checkUnique("email", emailValue);
    if (isUnique === null) {
      setEmailMessage("이메일 중복 검증 실패");
    } else {
      if (isUnique) {
        setEmailMessage("사용 가능한 이메일 입니다.");
        setEmailCheck(true);
      } else {
        setEmailMessage("중복된 이메일 입니다.");
        setEmailCheck(false);
      }
    }
  }

  // 닉네임 체크
  const onChangeNickname = (e) => {
    setInputNickname(e.target.value);
    if(e.target.value.length <= 20) {
      setNicknameCheck(true);
      if (nickname === inputNickname) {
        setNicknameMessage("");
      } else {
        nicknameUniqueCheck(e.target.value);
      }
    } else {
      setNicknameMessage("닉네임은 20자 이하여야 합니다.");
      setNicknameCheck(false);
    }
  }

  // 닉네임 중복 확인
  const nicknameUniqueCheck = async (nicknameValue) => {
    if(!nicknameValue) {
      setNicknameMessage("");
      return;
    }
    // 값이 있으므로 중복 확인 수행
    const isUnique = await AxiosApi.checkUnique("nickname", nicknameValue);
    if (isUnique === null) {
      setNicknameMessage("닉네임 중복 검증 실패");
    } else {
      if (isUnique) {
        setNicknameMessage("사용 가능한 닉네임 입니다.");
        setNicknameCheck(true);
      } else {
        setNicknameMessage("중복된 닉네임 입니다.");
        setNicknameCheck(false);
      }
    }
  }

  // 현재 비밀번호 확인
  const onChangeCurrentPw = (e) => {
    const inputPw = e.target.value;
    setCurrentPassword(inputPw);
    if(inputPw === userPassword) {
      setCurrentPwMessage("비밀번호가 일치합니다.");
      setCurrentPwCheck(true);
    } else {
      setCurrentPwMessage("비밀번호가 일치하지 않습니다.");
      setCurrentPwCheck(false);
    }
  }

  // 새 비밀번호 유효성 체크
  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
    const pwRgx = /^[A-Za-z0-9!@#$%^&*()]+$/;
    if(e.target.value.length < 8) {
      setNewPasswordMessage("비밀번호는 8자 이상이어야 합니다.");
      setNewPasswordCheck(false);
    } else if(!pwRgx.test(e.target.value)) {
      setNewPasswordMessage("올바르지 않은 형식입니다.")
      setNewPasswordCheck(false);
    } else {
      setNewPasswordMessage("올바른 형식입니다.");
      setNewPasswordCheck(true);
    }
  }
  // 새 비밀번호 같은지 확인
  const onChangeNewPassword2 = (e) => {
    setNewPassword2(e.target.value);
    if(e.target.value === newPassword){
      setNewPasswordMessage2("비밀번호가 같습니다.");
      setNewPasswordCheck2(true);
    } else {
      setNewPasswordMessage2("비밀번호가 같지 않습니다.");
      setNewPasswordCheck2(false);
    }
  }

  //백엔드로서부터 데이터 받기 위한 프로토타입.
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await AxiosApi.getUserDetails(userId);
        setUserDetails(response);
        setInputEmail(response.email);
        setInputNickname(response.nickname);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    if (userId) fetchUserDetails();
  }, [userId]);

  // 수정 버튼 활성화
  useEffect(() => {
    if (emailCheck && nicknameCheck && currentPwCheck) {
      if(newPassword.length > 0 || newPassword2.length > 0){
        if(newPasswordCheck && newPasswordCheck2){
          setIsDisabled(false);
        } else {
          setIsDisabled(true);
        }
      } else {
        setIsDisabled(false);
      }
    } else {
      setIsDisabled(true);
    }
  }, [emailCheck, nicknameCheck, currentPwCheck, newPassword.length, newPassword2.length, newPasswordCheck, newPasswordCheck2]);

  // 회원 정보 수정 기능
  const handleUpdateProfile = async () => {
    try {
      const dynamicPassword = userPassword;
      if(newPassword.length > 0 || newPassword2.length > 0){
        if(newPasswordCheck && newPasswordCheck2){
          dynamicPassword = newPassword;
        }
      }
      await AxiosApi.updateProfile(userId, inputEmail, inputNickname, dynamicPassword);
      // setMessage("프로필이 성공적으로 수정되었습니다");
    } catch (error) {
      console.error("Failed to update profile:", error);
      // setMessage("프로필 수정에 실패하였습니다.");
    }
  };


  const ChangePw = () => {
    const handleChangePassword = async () => {
      try {
        const response = await AxiosApi.updatePassword(
          userId,
          currentPassword,
          newPassword
        );
        setMessage("비밀번호가 성공적으로 수정되었습니다.");
      } catch (error) {
        console.error("Failed to update password:", error);
        setMessage("비밀번호 수정에 실패하였습니다.");
      }
    };
  };

  return (
    <Container>
      <Div className="phone-container">
        <div className="profile-header">
          <button onClick={()=>navigate("/")} className="backBtn">
            <PrevPageButton />
          </button>
          <h1>Profile</h1>
          <div className="header-blank"></div>
        </div>
        
        <form className="profile-form">
          <input
            type="text"
            value={userId} 
            className="profile-inputRqd" 
            required
          />
          <div className="inputBox">
            <input
              type="email"
              placeholder="변경할 이메일"
              value={inputEmail}
              onChange={onChangeEmail} 
              className="profile-input"
            />
            {inputEmail.length > 0 && (
              <p className={`message${emailCheck ? "On" : "Off"}`}>{emailMessage}</p>
            )}
          </div>
          <div className="inputBox">
            <input
              type="text"
              placeholder="변경할 닉네임"
              value={inputNickname}
              onChange={onChangeNickname} 
              className="profile-input"
            />
            {inputNickname.length > 0 && (
              <p className={`message${nicknameCheck ? "On" : "Off"}`}>{nicknameMessage}</p>
            )}
          </div>
          <div className="inputBox">
            <input
              type="password"
              placeholder="현재 비밀번호를 입력하세요."
              value={currentPassword}
              onChange={onChangeCurrentPw} 
              className="profile-input"
            />
            {currentPassword.length > 0 && (
              <p className={`message${currentPwCheck ? "On" : "Off"}`}>{currentPwMessage}</p>
            )}
          </div>
          <div className="inputBox">
            <input
              type="password"
              placeholder="새로운 비밀번호를 입력하세요."
              value={newPassword}
              onChange={onChangeNewPassword} 
              className="profile-input"
            />
            {newPassword.length > 0 && (
              <p className={`message${newPasswordCheck ? "On" : "Off"}`}>{newPasswordMessage}</p>
            )}
          </div>
          <div className="inputBox">
            <input
              type="password"
              placeholder="비밀번호 확인."
              value={newPassword2}
              onChange={onChangeNewPassword2} 
              className="profile-input"
            />
            {newPassword2.length > 0 && (
              <p className={`message${newPasswordCheck2 ? "On" : "Off"}`}>{newPasswordMessage2}</p>
            )}
          </div>
          
          <button onClick={handleUpdateProfile} className="submitBtn" disabled={isDisabled}>프로필 수정</button>
        </form>
      </Div>
    </Container>
  );
};

export default Profile;
