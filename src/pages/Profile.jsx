import { Container, Div, Form } from "../components/ProfileComponent";

const Profile = (/* 유저 아이디 받기?? */) => {


  return(
    <Container>
      <Div className="phone-container">
        <Div className="diary-header">
          <button>뒤</button>
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
        </Form>
      </Div>
    </Container>
  );
};
export default Profile;