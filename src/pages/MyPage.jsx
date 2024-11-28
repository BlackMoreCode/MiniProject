import { Container, Div } from "../components/homeComponent";

const MyPage = (/* 유저 아이디 받기?? */) => {


  return(
    <Container>
      <Div className="phone-container">
        <Div className="menuBox">
          <button className="backBtn">뒤</button>
          <div className="linkBox">
            <button>회원 정보 확인</button>
          </div>
          <div className="linkBox">
            <button>비밀번호 변경</button>
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