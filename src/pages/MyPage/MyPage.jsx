// import { Container } from "../../components/homeComponent";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
// import { FontContext } from "../../contexts/FontContext";

import leftArrowIcon from "../../assets/icons/left-arrow.png";
import { Container, Div } from "./MyPageStyles";

import { IoPersonCircleOutline } from "react-icons/io5";
import { BsFileFont } from "react-icons/bs";
import { TbSunMoon } from "react-icons/tb";
import { PiImageLight, PiSignOut } from "react-icons/pi";
import { FaRegBell } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";


const MyPage = (/* 유저 아이디 받기?? */) => {
  const navigate = useNavigate();

  // const { selectedFont } = useContext(FontContext);

  return (
    <Container>
      <Div className="mypage-container">
        <Div className="menuBox">
          <div className="mypage-header" onClick={()=>navigate("/")}>
            <button onClick={()=>navigate("/")} className="backBtn">
              <IoIosArrowBack />
            </button>
            <p className="mypage-title">설정</p>
          </div>
          
          <div className="link-container">
            <div onClick={()=>navigate("/profile")} className="linkBox">
              <div className="link-icon">
                <IoPersonCircleOutline />
              </div>
              <button className="link-button">회원 정보 수정</button>  
            </div>
            <div onClick={()=>navigate("/font")} className="linkBox">
              <div className="link-icon">
                <BsFileFont />
              </div>
              <button className="link-button">폰트 변경</button>
            </div>
            <div className="linkBox">
              <div className="link-icon">
                <TbSunMoon />
              </div>
              <button className="link-button">테마 변경</button>
            </div>
            <div onClick={()=>navigate("/banner")} className="linkBox">
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
            <div className="linkBox">
              <div className="link-icon">
                <PiSignOut />
              </div>
              <button className="link-button link-button-last">회원 탈퇴</button>
            </div>
          </div>
        </Div>
      </Div>
    </Container>
  );
};
export default MyPage;

// 백엔드 정리되고 닷 ㅣ테스트
// import React, { useContext, useEffect, useState } from "react";
// import AxiosApi from "../../api/AxiosApi";
// import { UserContext } from "../../contexts/UserContext";

// const MyPage = () => {
//   const { userId } = useContext(UserContext);
//   const [userDetails, setUserDetails] = useState(null);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await AxiosApi.getUserDetails(userId);
//         setUserDetails(response);
//       } catch (error) {
//         console.error("Failed to fetch user details:", error);
//       }
//     };

//     if (userId) fetchUserDetails();
//   }, [userId]);

//   if (!userDetails) return <p>Loading user details...</p>;

//   return (
//     <div>
//       <h1>마이 페이지</h1>
//       <p>이메일: {userDetails.email}</p>
//       <p>닉네임: {userDetails.nickname}</p>
//       <p>회원가입한 날짜: {new Date(userDetails.registrationDate).toLocaleDateString()}</p>
//     </div>
//   );
// };

// export default MyPage;
