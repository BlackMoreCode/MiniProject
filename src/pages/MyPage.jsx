import { Container, Div } from "../components/homeComponent";
import { useNavigate } from "react-router-dom";

const MyPage = (/* 유저 아이디 받기?? */) => {

  const navigate = useNavigate();

  const onClickBack = () => {
    navigate("/home");
  }
  const onClickProfile = () => {
    navigate("/profile");
  }

  return(
    <Container>
      <Div className="phone-container">
        <Div className="menuBox">
          <button onClick={onClickBack} className="backBtn">뒤</button>
          <div className="linkBox">
            <button onClick={onClickProfile}>회원 정보 수정</button>
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