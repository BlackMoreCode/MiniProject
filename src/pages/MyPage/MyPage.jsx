// import { Container } from "../../components/homeComponent";
import { useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
// import { FontContext } from "../../contexts/FontContext";

import { Container, Div } from "./MyPageStyles";
import { LoginContext } from "../../contexts/LoginContext";

import { IoPersonCircleOutline } from "react-icons/io5";
import { BsFileFont } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import { PiImageLight, PiSignOut } from "react-icons/pi";
import { FaRegBell } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import AxiosApi from "../../api/AxiosApi";

const MyPage = (/* 유저 아이디 받기?? */) => {
  const navigate = useNavigate();

  // const { selectedFont } = useContext(FontContext);

  // Dark 모드 전환
  const { loggedInMember, isDarkMode, setIsDarkMode } =
    useContext(LoginContext);

  const updateTheme = async (element) => {
    const updatedDiarySetting = {
      theme: element.checked ? "dark" : "default",
    };

    const isUpdated = await AxiosApi.updateDiarySetting(
      loggedInMember,
      updatedDiarySetting
    );

    if (isUpdated) {
      setIsDarkMode(!isDarkMode);
    } else {
      alert("테마 변경 실패");
    }
  };

  const handleDarkChange = async (e) => {
    updateTheme(e.target);
  };

  return (
    <Container>
      <Div
        className={isDarkMode ? "mypage-container-dark" : "mypage-container"}
      >
        <Div className="menuBox">
          <div className="mypage-header" onClick={() => navigate("/")}>
            <button onClick={() => navigate("/")} className="backBtn">
              <IoIosArrowBack />
            </button>
            <p className="mypage-title">설정</p>
          </div>

          <div className="link-container">
            <div onClick={() => navigate("/profile")} className="linkBox">
              <div className="link-icon">
                <IoPersonCircleOutline />
              </div>
              <button className="link-button">회원 정보 수정</button>
            </div>

            <div onClick={() => navigate("/font")} className="linkBox">
              <div className="link-icon">
                <BsFileFont />
              </div>
              <button className="link-button">폰트 변경</button>
            </div>

            <div className="linkBox box3">
              <div className="link-icon">
                {isDarkMode ? <IoMoonOutline /> : <FiSun />}
              </div>
              <button className="link-button">테마 변경</button>
              <label className="theme-toggle">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={handleDarkChange}
                />
                <span className="slider" />
              </label>
            </div>

            <div onClick={() => navigate("/banner")} className="linkBox">
              <div className="link-icon">
                <PiImageLight />
              </div>
              <button className="link-button">배너 이미지 변경</button>
            </div>

            <div className="linkBox">
              <div className="link-icon">
                <FaRegBell />
              </div>
              <button className="link-button">알림 사운드 변경</button>
            </div>

            <div onClick={() => navigate("/deleteMember")} className="linkBox">
              <div className="link-icon">
                <PiSignOut />
              </div>
              <button className="link-button link-button-last">
                회원 탈퇴
              </button>
            </div>
          </div>
        </Div>
      </Div>
    </Container>
  );
};
export default MyPage;
