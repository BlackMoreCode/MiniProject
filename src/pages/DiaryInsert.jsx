import { useNavigate } from "react-router-dom";
import { Container, Div, Form } from "../components/diaryComponent";

const DiaryInsert = (/* 유저 아이디 받기?? */) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Div className="phone-container">
        <Div className="diary-header">
          <button onClick={() => navigate("/home")}>뒤</button>
          <p>세호의 일기</p>
          <div></div>
        </Div>

        <Form action="#" method="post" className="diary-container">
          <p className="diary-name">일기 제목</p>
          <input
            type="text"
            name="diary-title"
            className="diary-title"
            value="임시 제목"
          />
          <p>작성한 날짜</p>
          <input type="date" name="diary-date" className="diary-date" />
          <p>오늘의 일기</p>
          <textarea name="diary-desc" className="diary-desc"></textarea>
          <div className="diary-coding-header">
            <button>+</button>
            <p>코딩 일기</p>
          </div>
          <textarea name="coding-desc" className="coding-desc"></textarea>
          <div className="buttonBox">
            <button className="inputBtn">작성</button>
            <button className="cancelBtn">취소</button>
          </div>
        </Form>
      </Div>
    </Container>
  );
};
export default DiaryInsert;
