import React, { useContext, useState, useRef, useCallback } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import { DiaryContext } from "../../contexts/DiaryContext";
import * as St from "./diaryComponent";
import ConfirmationModal from "./ConfirmationModal";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { dracula } from "@uiw/codemirror-theme-dracula";

let sequenceCounter = 1;

const DiaryInsert = () => {
  const navigate = useNavigate();
  const textarea = useRef(null);
  const { loggedInMember } = useContext(LoginContext);
  const { addDiary } = useContext(DiaryContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [showCodeSnippets, setShowCodeSnippets] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // useCallback을 사용해서 핸들러 보조; 불필요한 생성/렌더링 막기
  // state(상태) 의 과남용 방지, 가독성 증가
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!title?.trim() || !description?.trim() || !date?.trim()) {
        setModalMessage("일기 제목, 내용, 날짜를 입력하세요!");
        setIsModalOpen(true);
        return;
      }

      const formatDate = (date) => {
        const d = new Date(date);
        const pad = (n) => (n < 10 ? "0" + n : n);
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
          d.getDate()
        )}T00:00:00`;
      };

      const newDiary = {
        title,
        content: description,
        tags,
        writtenDate: formatDate(date),
        // codingDiaryEntries: codeSnippets.map((snippet, index) => ({
        //   programmingLanguageName: snippet.language || null,
        //   entryType: snippet.language ? "snippet" : "comment",
        //   content: snippet.code || "",
        //   commentary: snippet.commentary?.length ? snippet.commentary : [""],
        //   sequence: index + 1,
        // })),
        codingDiaryEntries: codeSnippets.flatMap((snippet, snippetIndex) => {
          const entries = [];

          // Add the snippet entry
          if (snippet.code) {
            entries.push({
              entryType: "snippet", // 스니펫 타입
              programmingLanguageName: snippet.language || "javascript",
              content: snippet.code, // 스니펫의 코드
              sequence: snippetIndex * 2 + 1, // 순서 계산
            });
          }

          // Add commentary entries
          if (Array.isArray(snippet.commentary)) {
            snippet.commentary.forEach((comment, commentIndex) => {
              entries.push({
                entryType: "comment", // 코멘트 타입
                programmingLanguageName: null, // 코멘트에는 언어 없음
                content: comment, // 코멘트 내용
                sequence: snippetIndex * 2 + 2 + commentIndex, // 순서 계산
              });
            });
          }

          return entries;
        }),
      };

      //try 구문 이전에 기입되는 자료를 보기위해서 로그 작성.
      console.log("New Diary Payload (Insert):", newDiary);

      try {
        await AxiosApi.saveDiary(loggedInMember, newDiary);
        addDiary(newDiary);
        navigate("/");
      } catch (error) {
        console.error("Failed to save diary:", error);
        setModalMessage("일기를 저장하는데 실패하였습니다.");
        setIsModalOpen(true);
      } finally {
        sequenceCounter = 1;
      }
    },
    [
      title,
      description,
      date,
      tags,
      codeSnippets,
      loggedInMember,
      addDiary,
      navigate,
    ]
  );

  const addTag = useCallback(() => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags((prevTags) => [...prevTags, trimmedTag]);
      setTagInput("");
    } else {
      setModalMessage("중복된 태그를 추가할 수 없습니다.");
      setIsModalOpen(true);
    }
  }, [tagInput, tags]);

  const addCodeSnippet = useCallback(() => {
    setCodeSnippets((prevSnippets) => [
      ...prevSnippets,
      {
        programmingLanguageName: "javascript", // Default to JavaScript
        code: "",
        commentary: ["Default commentary"],
      },
    ]);
  }, []);

  const updateCodeSnippet = useCallback((snippetIndex, key, value) => {
    setCodeSnippets((prevSnippets) =>
      prevSnippets.map((snippet, index) =>
        index === snippetIndex ? { ...snippet, [key]: value } : snippet
      )
    );
  }, []);

  const updateCodeSnippetInput = (snippetIndex, newCode) => {
    setCodeSnippets((prevSnippets) =>
      prevSnippets.map((snippet, index) =>
        index === snippetIndex
          ? { ...snippet, code: newCode } // 해당 스니펫의 코드를 업데이트
          : snippet
      )
    );
  };

  const addCodeCommentary = useCallback((snippetIndex) => {
    setCodeSnippets((prevSnippets) =>
      prevSnippets.map((snippet, index) =>
        index === snippetIndex
          ? {
              ...snippet,
              commentary: [...snippet.commentary, ""],
            }
          : snippet
      )
    );
  }, []);

  const updateCodeCommentary = useCallback(
    (snippetIndex, commentaryIndex, newComment) => {
      setCodeSnippets((prevSnippets) =>
        prevSnippets.map((snippet, index) =>
          index === snippetIndex
            ? {
                ...snippet,
                commentary: snippet.commentary.map((comment, i) =>
                  i === commentaryIndex ? newComment : comment
                ),
              }
            : snippet
        )
      );
    },
    []
  );

  const removeCodeCommentary = useCallback((snippetIndex, commentaryIndex) => {
    setCodeSnippets((prevSnippets) =>
      prevSnippets.map((snippet, index) =>
        index === snippetIndex
          ? {
              ...snippet,
              commentary: snippet.commentary.filter(
                (_, i) => i !== commentaryIndex
              ),
            }
          : snippet
      )
    );
  }, []);

  return (
    <St.Container>
      <St.Div className="phone-container">
        <St.Form onSubmit={handleSubmit}>
          {/* Title and Date */}
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

          {/* Description */}
          <label htmlFor="description">내용:</label>
          <St.TextArea
            id="description"
            ref={textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="내용 입력"
          />

          {/* Tags */}
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
                    onClick={() =>
                      setTags((prev) => prev.filter((t) => t !== tag))
                    }
                  >
                    x
                  </button>
                </St.TagItem>
              ))}
            </St.TagList>
          </St.Div>

          {/* Code Snippets */}
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
                  {/* Code Snippet Section */}
                  <select
                    value={snippet.language || ""}
                    onChange={(e) =>
                      updateCodeSnippet(
                        snippetIndex,
                        "language",
                        e.target.value
                      )
                    }
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
                    onChange={(value) =>
                      updateCodeSnippetInput(snippetIndex, value)
                    }
                  />
                  <St.GeneralRmvBtn
                    type="button"
                    onClick={() =>
                      setCodeSnippets((prevSnippets) =>
                        prevSnippets.filter((_, i) => i !== snippetIndex)
                      )
                    }
                  >
                    코드 스니펫 삭제
                  </St.GeneralRmvBtn>

                  {/* Commentary Section */}
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
