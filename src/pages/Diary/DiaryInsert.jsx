import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext"; // Correct import
import {
  Container,
  Div,
  Form,
  TagInput,
  TagList,
  TagItem,
  InputGeneral,
} from "./diaryComponent";
import ConfirmationModal from "./ConfirmationModal";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { dracula } from "@uiw/codemirror-theme-dracula";

const DiaryInsert = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addDiary, updateDiary, removeDiary } = useContext(UserContext); // Access removeDiary from context

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [index, setIndex] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (location.state) {
      const { diary, index } = location.state;
      setTitle(diary.title);
      setDescription(diary.description);
      setDate(diary.date || new Date().toISOString().split("T")[0]);
      setTags(diary.tags || []);
      setCodeSnippets(diary.codeSnippets || []);
      setIndex(index);
    }
  }, [location.state]);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !date) {
      setModalMessage("일기 제목, 내용, 날짜를 입력하세요!");
      setIsModalOpen(true);
      return;
    }

    const newDiary = { title, description, date, tags, codeSnippets };

    if (index !== null) {
      updateDiary(index, newDiary);
    } else {
      addDiary(newDiary);
    }

    navigate("/");
  };

  // Handle delete
  const handleDelete = () => {
    if (index !== null) {
      setModalMessage("정말로 일기를 삭제하시겠습니까?");
      setIsModalOpen(true);
    } else {
      setModalMessage("삭제할 일기가 없습니다.");
      setIsModalOpen(true);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const addCodeSnippet = () => {
    setCodeSnippets([...codeSnippets, { language: "javascript", code: "" }]);
  };

  const removeCodeSnippet = (snippetIndex) => {
    setCodeSnippets(codeSnippets.filter((_, index) => index !== snippetIndex));
  };

  const updateCode = (index, newCode) => {
    const updatedSnippets = [...codeSnippets];
    updatedSnippets[index].code = newCode;
    setCodeSnippets(updatedSnippets);
  };

  return (
    <Container>
      <Div className="phone-container">
        <Form onSubmit={handleSubmit}>
          <p>제목</p>
          <InputGeneral
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목 입력"
          />
          <p>날짜</p>
          <InputGeneral
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

          {/* 태그 섹션 */}
          <Div className="tag-section">
            <TagInput
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="태그를 입력하세요"
            />
            <button type="button" onClick={addTag}>
              태그 추가
            </button>
            <TagList>
              {tags.map((tag, index) => (
                <TagItem key={index}>
                  {tag}
                  <button onClick={() => removeTag(tag)}>x</button>
                </TagItem>
              ))}
            </TagList>
          </Div>

          {/* 코드스니펫 섹션 */}
          <Div className="code-section">
            <button type="button" onClick={addCodeSnippet}>
              코드 추가 +
            </button>
            {codeSnippets.map((snippet, index) => (
              <div key={index}>
                <select
                  value={snippet.language}
                  onChange={(e) => {
                    const updatedSnippets = [...codeSnippets];
                    updatedSnippets[index].language = e.target.value;
                    setCodeSnippets(updatedSnippets);
                  }}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
                <CodeMirror
                  value={snippet.code}
                  height="200px"
                  theme={dracula}
                  extensions={[
                    snippet.language === "javascript"
                      ? javascript()
                      : snippet.language === "python"
                      ? python()
                      : java(),
                  ]}
                  onChange={(value) => updateCode(index, value)}
                />
                <button
                  type="button"
                  onClick={() => removeCodeSnippet(index)}
                  style={{ marginTop: "10px" }}
                >
                  코드 스니펫 삭제
                </button>
              </div>
            ))}
          </Div>

          <div className="buttonBox">
            <button type="submit">저장</button>
            {index !== null && (
              <button
                type="button"
                onClick={handleDelete}
                style={{ color: "red" }}
              >
                삭제
              </button>
            )}
            <button type="button" onClick={() => navigate("/")}>
              취소
            </button>
          </div>
        </Form>
      </Div>

      <ConfirmationModal
        isOpen={isModalOpen}
        message={modalMessage}
        confirmText={index !== null ? "네" : "확인"}
        cancelText={index !== null ? "아니오" : undefined}
        onConfirm={() => {
          if (index !== null) {
            removeDiary(index); // 일기 삭제
            navigate("/"); // 삭제후 이동
          }
          setIsModalOpen(false); // 모달 닫기
        }}
        onCancel={() => setIsModalOpen(false)}
        singleButton={index === null}
      />
    </Container>
  );
};

export default DiaryInsert;
