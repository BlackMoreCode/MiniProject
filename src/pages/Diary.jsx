import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Div, Form } from "../components/diaryComponent";

const Diary = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const handleSave = (e) => {
    // 기존 동작 막기
    e.preventDefault();
    // 일기 저장
    const diaryEntry = {
      title,
      desc,
      date: new Date().toISOString().split("T")[0], // Add current date
    };
    // 홈 컴포넌트나 상태 관리자에게 보내기 (Context, etc)
    console.log("Saved Diary:", diaryEntry);

    navigate("/"); // 끝내고 나면 홈으로 이동.
  };

  return (
    <Container>
      <Div className="phone-container">
        <Div className="diary-header">
          <button onClick={() => navigate("/")}>뒤</button>
          <p>세호의 일기</p>
          <div></div>
        </Div>

        <Form onSubmit={handleSave} className="diary-container">
          <p className="diary-name">일기 제목</p>
          <input
            type="text"
            name="diary-title"
            className="diary-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
          <p>작성한 날짜</p>
          <input
            type="date"
            name="diary-date"
            className="diary-date"
            defaultValue={new Date().toISOString().split("T")[0]}
          />
          <p>오늘의 일기</p>
          <textarea
            name="diary-desc"
            className="diary-desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="내용을 입력하세요"
          />
          <div className="buttonBox">
            <button type="submit" className="saveBtn">
              저장
            </button>
            <button
              type="button"
              className="dltBtn"
              onClick={() => navigate("/")}
            >
              삭제
            </button>
          </div>
        </Form>
      </Div>
    </Container>
  );
};

export default Diary;
