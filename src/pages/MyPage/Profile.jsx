import React, { useContext, useEffect, useState } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";

// context
import { LoginContext } from "../../contexts/LoginContext";
import { DiarySettingContext } from "../../contexts/DiarySettingContext";
// css
import { Container, Div } from "./MyPageStyles";
// icon
import { IoIosArrowBack } from "react-icons/io";


const Profile = () => {
  const { userId, userPassword, setUserPassword } = useContext(LoginContext);
  const [userDetails, setUserDetails] = useState(null);
  const [email, setEmail] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailCheck, setEmailCheck] = useState(true);
  const [nickname, setNickname] = useState("");
  const [inputNickname, setInputNickname] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [nicknameCheck, setNicknameCheck] = useState(true);
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPwMessage, setCurrentPwMessage] = useState("");
  const [currentPwCheck, setCurrentPwCheck] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordMessage, setNewPasswordMessage] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [newPasswordMessage2, setNewPasswordMessage2] = useState("");
  const [newPasswordCheck2, setNewPasswordCheck2] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { diarySetting } = useContext(DiarySettingContext);

  const navigate = useNavigate();

  // setInputEmail(email);
  // setInputNickname(nickname);

  // 이메일 체크
  const onChangeEmail = (e) => {
    const value = e.target.value;
    setInputEmail(value);

    const emailRgx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(!emailRgx.test(value)) {
      setEmailMessage("올바른 이메일 형식이 아닙니다.");
      setEmailCheck(false);
    } else {
      setEmailCheck(true);
      if(email === value) {
        setEmailMessage("");
      } else {
        setEmailMessage("올바른 형식입니다.")
        emailUniqueCheck(value);
      }
    }
  };

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
      setEmailCheck(false);
    } else {
      if (isUnique) {
        setEmailMessage("사용 가능한 이메일 입니다.");
        setEmailCheck(true);
      } else {
        setEmailMessage("중복된 이메일 입니다.");
        setEmailCheck(false);
      }
    }
  };

  // 닉네임 체크
  const onChangeNickname = (e) => {
    const value = e.target.value;
    setInputNickname(value);
    if(value.length <= 20) {
      setNicknameCheck(true);
      if (nickname === value) {
        setNicknameMessage("");
      } else {
        nicknameUniqueCheck(value);
      }
    } else {
      setNicknameMessage("닉네임은 20자 이하여야 합니다.");
      setNicknameCheck(false);
    }
  };

  // 닉네임 중복 확인
  const nicknameUniqueCheck = async (nicknameValue) => {
    if (!nicknameValue) {
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
  };

  // 현재 비밀번호 확인
  const onChangeCurrentPw = (e) => {
    const inputPw = e.target.value;
    setCurrentPassword(inputPw);
    if(inputPw === password) {
      setCurrentPwMessage("비밀번호가 일치합니다.");
      setCurrentPwCheck(true);
    } else {
      setCurrentPwMessage("비밀번호가 일치하지 않습니다.");
      setCurrentPwCheck(false);
    }
  };

  // 새 비밀번호 유효성 체크
  const onChangeNewPassword = (e) => {
    const input = e.target.value;
    setNewPassword(input);
    const pwRgx = /^[A-Za-z0-9!@#$%^&*()]+$/;
    if (input.length < 8) {
      setNewPasswordMessage("비밀번호는 8자 이상이어야 합니다.");
      setNewPasswordCheck(false);
    } else if (!pwRgx.test(input)) {
      setNewPasswordMessage("올바르지 않은 형식입니다.");
      setNewPasswordCheck(false);
    } else if (input === userPassword) {
      setNewPasswordMessage("현재 비밀번호와 같습니다.");
      setNewPasswordCheck(false);
    } else {
      setNewPasswordMessage("올바른 형식입니다.");
      setNewPasswordCheck(true);
    }
  };
  // 새 비밀번호 같은지 확인
  const onChangeNewPassword2 = (e) => {
    const input = e.target.value;
    setNewPassword2(input);
    if (input === userPassword) {
      setNewPasswordMessage2("현재 비밀번호와 같습니다.");
      setNewPasswordCheck2(false);
    } else if (input === newPassword) {
      setNewPasswordMessage2("비밀번호가 같습니다.");
      setNewPasswordCheck2(true);
    } else {
      setNewPasswordMessage2("비밀번호가 같지 않습니다.");
      setNewPasswordCheck2(false);
    }
  };

  //백엔드로서부터 데이터 받기 위한 프로토타입.
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userInfo = await AxiosApi.getUserDetails(userId);
        setEmail(userInfo.email);
        setInputEmail(userInfo.email);
        setNickname(userInfo.nickname);
        setInputNickname(userInfo.nickname);
        setPassword(localStorage.getItem("userPassword"));
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
  const handleUpdateProfile = async (e) => {
    e.preventDefault(); // 기본 동작 방지
    try {
      const dynamicPassword = 
        newPassword.length > 0 || newPassword2.length > 0 
        ? newPassword 
        : currentPassword;

      await AxiosApi.updateProfile(userId, inputEmail, inputNickname, dynamicPassword);

      // localStorage 업데이트
      localStorage.setItem("userPassword", dynamicPassword);
      // 비밀번호 업데이트
      setPassword(dynamicPassword);

      alert("프로필이 성공적으로 업데이트되었습니다!");
      navigate("/mypage");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 폰트 설정
  const [ userFont, setUserFont ] = useState("default");
  useEffect(() => {
    if(diarySetting.font === "Do Hyeon") {
      setUserFont("font-do-hyeon");
    } else if(diarySetting.font === "Gowun Dodum") {
      setUserFont("font-gowun-dodum");
    } else if(diarySetting.font === "Hi Melody") {
      setUserFont("font-hi-melody");
    } else if(diarySetting.font === "Jua") {
      setUserFont("font-jua");
    } else {
      setUserFont("");
    }
  }, [diarySetting.font]);

  return (
    <Container>
      <Div 
        className={`${
          diarySetting.theme === "dark"
            ? "phone-container-dark"
            : "phone-container"} 
          ${userFont} 
        `}
      >
        <div className="profile-header">
          <button onClick={()=>navigate("/mypage")} className="backBtn">
            <IoIosArrowBack />
          </button>
          <p onClick={()=>navigate("/mypage")} className="mypage-title">회원 정보</p>
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
              placeholder="현재 비밀번호를 입력하세요. (필수!)"
              value={currentPassword}
              onChange={onChangeCurrentPw}
              className="profile-input"
            />
            {currentPassword.length > 0 && (
              <p className={`message${currentPwCheck ? "On" : "Off"}`}>
                {currentPwMessage}
              </p>
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
              <p className={`message${newPasswordCheck ? "On" : "Off"}`}>
                {newPasswordMessage}
              </p>
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
              <p className={`message${newPasswordCheck2 ? "On" : "Off"}`}>
                {newPasswordMessage2}
              </p>
            )}
          </div>
          
          <button className="submitBtn" onClick={handleUpdateProfile} disabled={isDisabled}>
            {isDisabled ? "비활성화" : "프로필 수정"}
          </button>
        </form>
      </Div>
    </Container>
  );
};

export default Profile;
