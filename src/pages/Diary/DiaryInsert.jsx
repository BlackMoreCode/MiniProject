import React, { useContext, useState, useEffect, useRef } from "react";
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
  TextArea,
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
  const textarea = useRef(null); // useRef 사용해서 동적으로 textarea의 height 조절하는데 쓸 계획
  const { addDiary, updateDiary, removeDiary } = useContext(UserContext); // Access removeDiary from context

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState([]);
  // 태그
  const [tagInput, setTagInput] = useState("");
  // 코드스니펫
  const [codeSnippets, setCodeSnippets] = useState([]);
  // 코드메모 (코멘터리)
  const [codeCommentary, setCodeCommentary] = useState([]);
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

  // 코드 스니펫이 있어야 코멘터리를 만들 수 있게 설정, 즉 여기에 코멘터리를 추가하는게 맞다.
  const addCodeSnippet = () => {
    setCodeSnippets([
      ...codeSnippets,
      { language: "javascript", code: "", commentary: [] },
    ]);
  };

  const removeCodeSnippet = (snippetIndex) => {
    setCodeSnippets(codeSnippets.filter((_, index) => index !== snippetIndex));
  };

  const updateCode = (index, newCode) => {
    const updatedSnippets = [...codeSnippets];
    updatedSnippets[index].code = newCode;
    setCodeSnippets(updatedSnippets);
  };

  // 코멘터리 추가 로직
  const addCodeCommentary = (snippetIndex) => {
    const updatedSnippets = [...codeSnippets];
    updatedSnippets[snippetIndex].commentary.push(""); // Add an empty comment
    setCodeSnippets(updatedSnippets);
  };

  //코멘터리 제거 로직
  const removeCodeCommentary = (snippetIndex, commentaryIndex) => {
    const updatedSnippets = [...codeSnippets];
    updatedSnippets[snippetIndex].commentary.splice(commentaryIndex, 1); // Remove the commentary
    setCodeSnippets(updatedSnippets);
  };

  // 코멘터리 수정 관련 로직
  const updateCodeCommentary = (snippetIndex, commentaryIndex, newComment) => {
    const updatedSnippets = [...codeSnippets];
    updatedSnippets[snippetIndex].commentary[commentaryIndex] = newComment;
    setCodeSnippets(updatedSnippets);
  };

  // textarea 높이 리사이증 로직
  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = "auto"; // Reset height
      textarea.current.style.height = `${textarea.current.scrollHeight}px`; // Adjust height
    }
  };

  const handleChange = (e) => {
    //기존 다이어리 입력 부분인 setDescription(e.target.value)를 handlechange 함수가 가져올 것이다.
    setDescription(e.target.value);
    handleResizeHeight();
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
          <label htmlFor="description">내용:</label>
          <TextArea
            id="description"
            ref={textarea}
            value={description}
            onChange={handleChange}
            rows={4} // 최초의 높이는 4줄로 설정
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

          {/* 코드스니펫 + 코멘터리 섹션 */}
          <Div className="code-section">
            <button type="button" onClick={addCodeSnippet}>
              코드 추가 +
            </button>
            {codeSnippets.map((snippet, snippetIndex) => (
              <div key={snippetIndex}>
                {/* 코드 스니펫 */}
                <select
                  value={snippet.language}
                  onChange={(e) => {
                    const updatedSnippets = [...codeSnippets];
                    updatedSnippets[snippetIndex].language = e.target.value;
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
                  onChange={(value) => {
                    const updatedSnippets = [...codeSnippets];
                    updatedSnippets[snippetIndex].code = value;
                    setCodeSnippets(updatedSnippets);
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeCodeSnippet(snippetIndex)}
                >
                  코드 스니펫 삭제
                </button>

                {/* 코드 코멘트 추가 버튼 */}
                <button
                  type="button"
                  onClick={() => addCodeCommentary(snippetIndex)}
                >
                  코드 코멘트 추가
                </button>

                {/* 코드 코멘터리 렌더링 */}
                {snippet.commentary.map((comment, commentaryIndex) => (
                  <div key={commentaryIndex} style={{ marginTop: "10px" }}>
                    <textarea
                      value={comment}
                      placeholder="코멘트를 입력하세요"
                      style={{
                        width: "100%",
                        padding: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "16px",
                      }}
                      onChange={(e) =>
                        updateCodeCommentary(
                          snippetIndex,
                          commentaryIndex,
                          e.target.value
                        )
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeCodeCommentary(snippetIndex, commentaryIndex)
                      }
                      style={{ marginTop: "5px" }}
                    >
                      코멘트 삭제
                    </button>
                  </div>
                ))}
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
