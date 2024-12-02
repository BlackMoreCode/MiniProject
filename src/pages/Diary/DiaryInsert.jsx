import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { Container, Div, Form } from "../../components/diaryComponent";
import CoinfirmationModal from "./ConfirmationModal";

const DiaryInsert = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addDiary, updateDiary, removeDiary } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [index, setIndex] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "emptyField" 혹은 "delete" 으로 설정된다
  const [modalMessage, setModalMessage] = useState("");

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

    if (!title.trim() || !description.trim()) {
      setModalType("emptyField");
      setModalMessage("일기 제목과 내용을 입력하세요!");
      setIsModalOpen(true);
      return;
    }

    if (!date) {
      setModalMessage("날짜를 선택해주세요");
      setModalType("emptyField"); // emptyfield로 잡아서 "확인" 버튼으로 누르게 이행
      setIsModalOpen(true);
      return; // 추가 실행을 막기 위해서 리턴문 넣어준다.
    }

    const newDiary = { title, description, date };

    //이미 존재하는 일기라면 업데이트, 아니라면 추가해주게 해주는 if 문.
    if (index !== null) {
      updateDiary(index, newDiary);
    } else {
      addDiary(newDiary);
    }

    navigate("/");
  };

  const handleDelete = () => {
    setModalType("delete");
    setModalMessage("정말로 일기를 제거하겠습니까?");
    setIsModalOpen(true);
  };

  //이제 로직을 나눴으니 modalType이 "delete"로 설정되야 삭제 하는 것으로 이행.
  const handleModalConfirm = () => {
    if (modalType === "delete") {
      removeDiary(index);
      navigate("/");
    }
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Div className="phone-container">
        <Div className="diary-header">
          <button onClick={() => navigate("/")}>뒤</button>
          <p>일기 작성/수정</p>
        </Div>

        <Form onSubmit={handleSubmit}>
          <p>제목</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목 입력"
          />
          <p>날짜</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <p>내용</p>
          <textarea
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
              onClick={() => navigate("/")}
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

        {/* Confirmation Modal 에 props 내려주고,  일기 추가시 공란 체크와 일기 삭제 쪽에 따른 메세지 차별화 */}
        {/* emptyField 라면 싱글 버튼으로 되고, "네" 대신 "확인"으로 전환.*/}
        <CoinfirmationModal
          isOpen={isModalOpen}
          message={modalMessage}
          confirmText={modalType === "emptyField" ? "확인" : "네"}
          cancelText="아니오"
          singleButton={modalType === "emptyField"}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      </Div>
    </Container>
  );
};

export default DiaryInsert;
