import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { Container, Div, Form } from "../../components/diaryComponent";
import CoinfirmationModal from "../ConfirmationModal";

const DiaryInsert = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addDiary, updateDiary, removeDiary } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [index, setIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 확인
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false); // 공백 경고
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    if (location.state) {
      const { diary, index } = location.state;
      setTitle(diary.title);
      setDescription(diary.description);
      setDate(diary.date || new Date().toISOString().split("T")[0]);
      setIndex(index);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setWarningMessage("일기 제목을 입력하세요!");
      setIsWarningModalOpen(true);
      return;
    }

    if (!description.trim()) {
      setWarningMessage("일기 내용을 입력하세요!");
      setIsWarningModalOpen(true);
      return;
    }

    const newDiary = { title, description, date };

    if (index !== null) {
      updateDiary(index, newDiary);
    } else {
      addDiary(newDiary);
    }

    navigate("/mainpage");
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true); // 삭제 확인 모달 열기
  };

  const confirmDelete = () => {
    removeDiary(index); // 일기 삭제
    setIsDeleteModalOpen(false); // 모달 닫기
    navigate("/mainpage");
  };

  return (
    <Container>
      <Div className="phone-container">
        <Div className="diary-header">
          <button onClick={() => navigate("/mainpage")}>뒤</button>
          <p>일기 작성/수정</p>
        </Div>

        <Form onSubmit={handleSubmit}>
          <p>제목</p>
          <input
            type="text"
            name="diary-title"
            className="diary-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목 입력"
          />
          <p>날짜</p>
          <input
            type="date"
            name="diary-date"
            className="diary-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <p>내용</p>
          <textarea
            name="diary-desc"
            className="diary-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="내용 입력"
          />
          <div className="buttonBox">
            <button type="submit" className="saveBtn">
              저장
            </button>
            <button
              type="button"
              className="cancelBtn"
              onClick={() => navigate("/mainpage")}
            >
              취소
            </button>
            {index !== null && (
              <button
                type="button"
                className="deleteBtn"
                onClick={handleDelete}
              >
                삭제
              </button>
            )}
          </div>
        </Form>

        {/* 삭제 확인용 모달 */}
        <CoinfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          message="정말로 일기를 제거하겠습니까?"
        />

        {/* Warning Modal */}
        <CoinfirmationModal
          isOpen={isWarningModalOpen}
          onClose={() => setIsWarningModalOpen(false)}
          message={warningMessage}
        />
      </Div>
    </Container>
  );
};

export default DiaryInsert;
