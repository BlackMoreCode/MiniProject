import { Container, Div, Form } from "../components/ProfileComponent";
import { useNavigate } from "react-router-dom";
import leftArrowIcon from "../assets/icons/left-arrow.png";

const Profile = (/* 유저 아이디 받기?? */) => {
  const navigate = useNavigate();

  return(
    <Div className="phone-container">
      <Div className="diary-header">
        <button onClick={()=>navigate("/mypage")} className="backBtn">
          <img src={leftArrowIcon} alt="뒤로가기" />
        </button>
        <p>회원 정보 수정</p>
        <div></div>
      </Div>

      <Form action="#" method="post" className="profile-container">
        <p>아이디</p>
        <input type="text" name="profile-id" className="profile-id" value="" />
        <p>비밀번호</p>
        <input type="password" name="profile-pw" className="profile-pw" value="" />
        <p>비밀번호 확인</p>
        <input type="password" name="profile-pwCheck" className="profile-pwCheck" value="" />
        <p>이메일</p>
        <input type="email" name="profile-email" className="profile-email" value="" />
        <p>닉네임</p>
        <input type="text" name="profile-nickname" className="profile-nickname" value="" />
        <div className="buttonBox">
          <button>수정</button>
          <button type="button" onClick={() => navigate("/mypage")}>취소</button>
        </div>
      </Form>
    </Div>
  );
};
export default Profile;