import React, { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext"; // Correct import
import * as St from "./diaryComponent";
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
  const [showCodeSnippets, setShowCodeSnippets] = useState(false); // 코드 스니펫을 들어낼지 말지 결정하는 상태

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
      setCodeSnippets(
        (diary.codeSnippets || []).map((snippet) => ({
          ...snippet,
          commentary: snippet.commentary || [], // 코멘터리가 배열이여야 한다..
        }))
      );
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
    const trimmedTag = tagInput.trim(); // 스페이싱을 이용한 같은 단어지만 다른 태그가 입력되는 것을 방지.

    // 빈 입력과 중복 확인
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]); // valid test 통과하면 태그 추가
      setTagInput(""); // 태그 추가 이후에는 입력 필드 지우기
    } else if (tags.includes(trimmedTag)) {
      setModalMessage("중복된 태그를 입력하였습니다");
      setIsModalOpen(true);
      return;
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
    <St.Container>
      <St.Div className="phone-container">
        <St.Form onSubmit={handleSubmit}>
          <p>제목</p>
          <St.InputGeneral
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목 입력"
          />
          <p>날짜</p>
          <St.InputGeneral
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <label htmlFor="description">내용:</label>
          <St.TextArea
            id="description"
            ref={textarea}
            value={description}
            onChange={handleChange}
            rows={4} // 최초의 높이는 4줄로 설정
            placeholder="내용 입력"
          />

          {/* 태그 섹션 */}
          <St.Div className="tag-section">
            <St.TagInput
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="태그를 입력하세요"
            />
            <St.GeneralAddBtn type="button" onClick={addTag}>
              태그 추가
            </St.GeneralAddBtn>
            <St.TagList>
              {tags.map((tag, index) => (
                <St.TagItem key={index}>
                  {tag}
                  <button onClick={() => removeTag(tag)}>x</button>
                </St.TagItem>
              ))}
            </St.TagList>
          </St.Div>

          {/* 코드스니펫 + 코멘터리 섹션 */}

          {/* Code Snippets Toggle Button */}
          <St.GeneralAddBtn
            type="button"
            onClick={() => setShowCodeSnippets((prev) => !prev)}
          >
            {showCodeSnippets ? "코드 일기 닫기" : "코드 일기 열기"}
          </St.GeneralAddBtn>

          {showCodeSnippets && (
            <St.Div className="code-section">
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
                  <St.GeneralRmvBtn
                    type="button"
                    onClick={() => removeCodeSnippet(snippetIndex)}
                  >
                    코드 스니펫 삭제
                  </St.GeneralRmvBtn>

                  {/* 코드 코멘트 추가 버튼 */}
                  <St.GeneralAddBtn
                    type="button"
                    onClick={() => addCodeCommentary(snippetIndex)}
                  >
                    코드 코멘트 추가
                  </St.GeneralAddBtn>

                  {/* 코드 코멘터리 렌더링 */}
                  {snippet.commentary.map((comment, commentaryIndex) => (
                    <div key={commentaryIndex} style={{ marginTop: "10px" }}>
                      <St.TextArea
                        ref={textarea}
                        value={comment}
                        rows={4} // 최초의 높이는 4줄로 설정
                        placeholder="내용 입력"
                        onChange={(e) =>
                          updateCodeCommentary(
                            snippetIndex,
                            commentaryIndex,
                            e.target.value
                          )
                        }
                      />
                      <St.GeneralRmvBtn
                        type="button"
                        onClick={() =>
                          removeCodeCommentary(snippetIndex, commentaryIndex)
                        }
                        style={{ marginTop: "5px" }}
                      >
                        코멘트 삭제
                      </St.GeneralRmvBtn>
                    </div>
                  ))}
                </div>
              ))}

              {/* Dynamically placed "코드 스니펫 추가" button */}
              <St.GeneralAddBtn type="button" onClick={addCodeSnippet}>
                코드 스니펫 추가
              </St.GeneralAddBtn>
            </St.Div>
          )}

          <div className="buttonBox">
            <St.ConfirmBtn type="submit" onClick={handleSubmit}>
              저장
            </St.ConfirmBtn>
            {index !== null && (
              <St.RmvBtnS type="button" onClick={handleDelete}>
                삭제
              </St.RmvBtnS>
            )}
            <St.EtcBtn type="button" onClick={() => navigate("/")}>
              취소
            </St.EtcBtn>
          </div>
        </St.Form>
      </St.Div>

      <ConfirmationModal
        isOpen={isModalOpen}
        message={modalMessage}
        confirmText={
          index !== (null && modalMessage === "중복된 태그를 입력하였습니다")
            ? "네"
            : "확인"
        }
        cancelText={
          index !== (null && modalMessage === "중복된 태그를 입력하였습니다")
            ? "아니오"
            : undefined
        }
        onConfirm={() => {
          if (modalMessage === "중복된 태그를 입력하였습니다") {
            setIsModalOpen(false);
          } else if (index !== null) {
            removeDiary(index);
            navigate("/");
          }
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
        singleButton={
          index === null || modalMessage === "중복된 태그를 입력하였습니다"
        }
      />
    </St.Container>
  );
};

export default DiaryInsert;
