import { Container, Div } from "../../components/homeComponent";
import { useNavigate } from "react-router-dom";

const MyPage = (/* 유저 아이디 받기?? */) => {
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate("/");
  };
  const onClickProfile = () => {
    navigate("/profile");
  };
  const onClickChangePw = () => {
    navigate("/changepw");
  };

  return (
    <Container>
      <Div className="phone-container">
        <Div className="menuBox">
          <button onClick={onClickBack} className="backBtn">
            뒤
          </button>
          <div className="linkBox">
            <button onClick={onClickProfile}>회원 정보 수정</button>
          </div>
          <div className="linkBox">
            <button onClick={onClickChangePw}>비밀번호 변경</button>
          </div>
          <div className="linkBox">
            <button>폰트 변경</button>
          </div>
          <div className="linkBox">
            <button>테마 변경</button>
          </div>
          <div className="linkBox">
            <button>배너 이미지 변경</button>
          </div>
          <div className="linkBox">
            <button>알림 사운드 변경</button>
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
