// import { Container, Div, Form } from "../../components/ProfileComponent";
// import { useNavigate } from "react-router-dom";

// const Profile = (/* 유저 아이디 받기?? */) => {
//   const navigate = useNavigate();

//   const onClickBackBtn = () => {
//     navigate("/mypage");
//   };

//   return (
//     <Container>
//       <Div className="phone-container">
//         <Div className="diary-header">
//           <button>뒤</button>
//           <p>회원 정보 수정</p>
//           <div></div>
//         </Div>

//         <Form action="#" method="post" className="profile-container">
//           <p>아이디</p>
//           <input
//             type="text"
//             name="profile-id"
//             className="profile-id"
//             value="아이디"
//           />
//           <p>비밀번호</p>
//           <input
//             type="password"
//             name="profile-pw"
//             className="profile-pw"
//             value="비밀번호"
//           />
//           <p>비밀번호 확인</p>
//           <input
//             type="password"
//             name="profile-pwCheck"
//             className="profile-pwCheck"
//             value="비밀번호"
//           />
//           <p>이메일</p>
//           <input
//             type="email"
//             name="profile-email"
//             className="profile-email"
//             value="이메일"
//           />
//           <p>닉네임</p>
//           <input
//             type="text"
//             name="profile-nickname"
//             className="profile-nickname"
//             value="닉네임"
//           />
//           <div className="buttonBox">
//             <button>수정</button>
//             <button onClick={onClickBackBtn}>취소</button>
//           </div>
//         </Form>
//       </Div>
//     </Container>
//   );
// };
// export default Profile;

import React, { useContext, useEffect, useState } from "react";
import AxiosApi from "../../api/AxiosApi";
import { UserContext } from "../../contexts/UserContext";

const Profile = () => {
  const { userId } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState(null);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  //백엔드로서부터 데이터 받기 위한 프로토타입.
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await AxiosApi.getUserDetails(userId);
        setUserDetails(response);
        setEmail(response.email);
        setNickname(response.nickname);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    if (userId) fetchUserDetails();
  }, [userId]);

  const handleUpdateProfile = async () => {
    try {
      await AxiosApi.updateProfile(userId, { email, nickname });
      setMessage("프로필이 성공적으로 수정되었습니다");
    } catch (error) {
      console.error("Failed to update profile:", error);
      setMessage("프로필 수정에 실패하였습니다.");
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <input
        type="email"
        placeholder="변경할 이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="변경할 닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={handleUpdateProfile}>프로필 수정</button>
      <p>{message}</p>
    </div>
  );
};

export default Profile;
