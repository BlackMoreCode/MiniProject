import { Container, Div } from "../components/homeComponent";
import { useNavigate } from "react-router-dom";
import leftArrowIcon from "../assets/icons/left-arrow.png";

const MyPage = (/* 유저 아이디 받기?? */) => {

  const navigate = useNavigate();

  const onClickProfile = () => {
    navigate("/profile");
  }

  return(
    <Div className="phone-container">
      <Div className="menuBox">
        <button onClick={()=>navigate("/")} className="backBtn">
          <img src={leftArrowIcon} alt="뒤로가기" />
        </button>
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
  );
};
export default MyPage;