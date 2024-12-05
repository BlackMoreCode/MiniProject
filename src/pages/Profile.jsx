import { Container, Div, Form } from "../components/ProfileComponent";
import { useNavigate } from "react-router-dom";
import { PrevPageButton } from "../components/PrevPageButton";

const Profile = (/* 유저 아이디 받기?? */) => {
  const navigate = useNavigate();

  return(
    <Container>
      <Div className="phone-container">
        <Div className="diary-header">
          <PrevPageButton />
          <p>회원 정보 수정</p>
          <div></div>
        </Div>

        <Form action="#" method="post" className="profile-container">
          <p>아이디</p>
          <input type="text" name="profile-id" className="profile-id" value="아이디" />
          <p>비밀번호</p>
          <input type="password" name="profile-pw" className="profile-pw" value="비밀번호" />
          <p>비밀번호 확인</p>
          <input type="password" name="profile-pwCheck" className="profile-pwCheck" value="비밀번호" />
          <p>이메일</p>
          <input type="email" name="profile-email" className="profile-email" value="이메일" />
          <p>닉네임</p>
          <input type="text" name="profile-nickname" className="profile-nickname" value="닉네임" />
          <div className="buttonBox">
            <button>수정</button>
            <button onClick={() => navigate("/mypage")}>취소</button>
          </div>
        </Form>
      </Div>
    </Container>
  );
};
export default Profile;