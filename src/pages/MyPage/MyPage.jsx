import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Container, Div } from "./MyPageStyles";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BsFileFont } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import { PiImageLight, PiSignOut } from "react-icons/pi";
import { FaRegBell } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { DiarySettingContext } from "../../contexts/DiarySettingContext";

const MyPage = (/* 유저 아이디 받기?? */) => {
  const { diarySetting, updateDiarySetting } = useContext(DiarySettingContext);
  
  const navigate = useNavigate();

  // 테마 업데이트
  const handleDarkChange = async (e) => {
    updateTheme(e.target);
  };
  const updateTheme = async (element) => {
    const isUpdated = await updateDiarySetting(
      "theme",
      element.checked ? "dark" : "default"
    );

    if (!isUpdated) {
      alert("테마 변경 실패");
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
      setUserFont("font-default");
    }
  }, [diarySetting.font]);

  return (
    <Container>
      <Div
        className={`
          ${diarySetting.theme === "dark"
            ? "mypage-container-dark"
            : "mypage-container"} 
            ${userFont}
        `}
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
                {diarySetting.theme === "dark" ? <IoMoonOutline /> : <FiSun />}
              </div>
              <button className="link-button">테마 변경</button>
              <label className="theme-toggle">
                <input
                  type="checkbox"
                  checked={diarySetting.theme === "dark"}
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
