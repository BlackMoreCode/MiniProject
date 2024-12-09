import React, { useContext, useState, useRef } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext"; // Correct import
import * as St from "./diaryComponent";
import ConfirmationModal from "./ConfirmationModal";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { dracula } from "@uiw/codemirror-theme-dracula";

const DiaryInsert = () => {
  const navigate = useNavigate();
  const textarea = useRef(null);
  const { loggedInMember, addDiary } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [showCodeSnippets, setShowCodeSnippets] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title?.trim() || !description?.trim() || !date?.trim()) {
      setModalMessage("일기 제목, 내용, 날짜를 입력하세요!");
      setIsModalOpen(true);
      return;
    }

    //일기에 시간을 원하는 시간으로 넣기위해서 처리중
    const formatDate = (date) => {
      const d = new Date(date); // Use the selected date directly
      const pad = (n) => (n < 10 ? "0" + n : n);
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
        d.getDate()
      )}T00:00:00`; // 시간을 일단 00:00:00 로 하드코딩 처리.
    };

    const newDiary = {
      title,
      content: description,
      tags,
      writtenDate: formatDate(date),
      codingDiaryEntries: codeSnippets.map((snippet, index) => ({
        programmingLanguageName: snippet.language || null,
        entryType: snippet.language ? "snippet" : "comment", // Entry type
        content: snippet.code || "",
        commentary: snippet.commentary || [], // Include commentary here
        sequence: index + 1,
      })),
    };

    try {
      await AxiosApi.saveDiary(loggedInMember, newDiary);
      addDiary(newDiary);
      navigate("/");
    } catch (error) {
      console.error("Failed to save diary:", error);
      setModalMessage("일기를 저장하는데 실패하였습니다.");
      setIsModalOpen(true);
    }
  };

  const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

  const handleChange = (e) => {
    setDescription(e.target.value);
    if (textarea.current) {
      textarea.current.style.height = "auto";
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();

    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    } else {
      setModalMessage("중복된 태그를 추가할 수 없습니다.");
      setIsModalOpen(true);
    }
  };

  const addCodeSnippet = () => {
    setCodeSnippets([
      ...codeSnippets,
      { language: "javascript", code: "", commentary: [] },
    ]);
  };

  const addCodeCommentary = (snippetIndex) => {
    const updatedSnippets = [...codeSnippets];
    updatedSnippets[snippetIndex].commentary.push("");
    setCodeSnippets(updatedSnippets);
  };

  const removeCodeSnippet = (snippetIndex) => {
    setCodeSnippets(codeSnippets.filter((_, index) => index !== snippetIndex));
  };

  const updateCodeCommentary = (snippetIndex, commentaryIndex, newComment) => {
    const updatedSnippets = [...codeSnippets];
    updatedSnippets[snippetIndex].commentary[commentaryIndex] = newComment;
    setCodeSnippets(updatedSnippets);
  };

  const removeCodeCommentary = (snippetIndex, commentaryIndex) => {
    const updatedSnippets = [...codeSnippets];
    updatedSnippets[snippetIndex].commentary.splice(commentaryIndex, 1);
    setCodeSnippets(updatedSnippets);
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
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="내용 입력"
          />

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
                  <button
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                  >
                    x
                  </button>
                </St.TagItem>
              ))}
            </St.TagList>
          </St.Div>

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
                  <select
                    value={snippet.language || ""}
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
                    value={snippet.code || ""}
                    height="auto"
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

                  {snippet.commentary.map((comment, commentaryIndex) => (
                    <div key={commentaryIndex}>
                      <St.TextArea
                        value={comment}
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
                      >
                        코멘트 삭제
                      </St.GeneralRmvBtn>
                    </div>
                  ))}
                  <St.GeneralAddBtn
                    type="button"
                    onClick={() => addCodeCommentary(snippetIndex)}
                  >
                    코드 코멘트 추가
                  </St.GeneralAddBtn>
                </div>
              ))}
              <St.GeneralAddBtn type="button" onClick={addCodeSnippet}>
                코드 스니펫 추가
              </St.GeneralAddBtn>
            </St.Div>
          )}

          <div className="buttonBox">
            <St.ConfirmBtn type="submit" onClick={handleSubmit}>
              저장
            </St.ConfirmBtn>
            <St.EtcBtn type="button" onClick={() => navigate("/")}>
              취소
            </St.EtcBtn>
          </div>
        </St.Form>
      </St.Div>

      <ConfirmationModal
        isOpen={isModalOpen}
        message={modalMessage}
        confirmText="확인"
        onConfirm={() => setIsModalOpen(false)}
        singleButton
      />
    </St.Container>
  );
};

export default DiaryInsert;
