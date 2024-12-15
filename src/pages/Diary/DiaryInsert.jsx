import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import { DiaryContext } from "../../contexts/DiaryContext";
import { DiarySettingContext } from "../../contexts/DiarySettingContext";
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
  const { diarySetting } = useContext(DiarySettingContext);

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

      // In DiaryInsert.jsx, modify the payload logic to include sequential sequence numbers
      let sequenceCounter = 1;

      const newDiary = {
        title,
        content: description,
        tags,
        writtenDate: formatDate(date),
        codingDiaryEntries: codeSnippets.flatMap((snippet) => {
          const entries = [];

          if (snippet.code) {
            entries.push({
              entryType: "snippet",
              programmingLanguageName:
                snippet.programmingLanguageName || "javascript",
              content: snippet.code,
              sequence: sequenceCounter++, // Increment sequenceCounter
            });
          }

          if (Array.isArray(snippet.commentary)) {
            snippet.commentary.forEach((comment) => {
              entries.push({
                entryType: "comment",
                programmingLanguageName: null,
                content: comment,
                sequence: sequenceCounter++, // Increment sequenceCounter
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

    if (!trimmedTag) {
      // Case 1: 태그 입력이 비었을 경우
      setModalMessage("태그를 입력하세요!");
      setIsModalOpen(true);
    } else if (tags.includes(trimmedTag)) {
      // Case 2: 중복된 태그
      setModalMessage("중복된 태그는 추가할 수 없습니다.");
      setIsModalOpen(true);
    } else {
      // Case 3: 적합한 태그
      setTags((prevTags) => [...prevTags, trimmedTag]);
      setTagInput("");
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
              commentary: [...(snippet.commentary || []), ""], // Always add a new empty comment
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

  // 폰트 가져오기
  const [userFont, setUserFont] = useState("default");
  useEffect(() => {
    if (diarySetting.font === "Do Hyeon") {
      setUserFont("font-do-hyeon");
    } else if (diarySetting.font === "Gowun Dodum") {
      setUserFont("font-gowun-dodum");
    } else if (diarySetting.font === "Hi Melody") {
      setUserFont("font-hi-melody");
    } else if (diarySetting.font === "Jua") {
      setUserFont("font-jua");
    } else {
      setUserFont("font-default");
    }
  }, [diarySetting.font]);

  return (
    <>
      <div
        style={{
          height: "100%",
          overflowY: "auto",
          background: diarySetting.theme === "dark" ? "black" : "",
        }}
      >
        <St.Container>
          <St.Div
            className={`${
              diarySetting.theme === "dark"
                ? "phone-container-dark"
                : "phone-container"
            } 
              ${userFont} 
            `}
            onSubmit={handleSubmit}
          >
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
              <St.GeneralConfirmation
                type="button"
                onClick={addTag}
                isDark={diarySetting.theme === "dark"}
              >
                태그 추가
              </St.GeneralConfirmation>
              <St.TagList>
                {tags.map((tag, index) => (
                  <St.TagItem
                    key={index}
                    isDark={diarySetting.theme === "dark"}
                  >
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
            <St.GeneralConfirmation
              type="button"
              onClick={() => setShowCodeSnippets((prev) => !prev)}
              isDark={diarySetting.theme === "dark"}
            >
              {showCodeSnippets ? "코드 일기 닫기" : "코드 일기 열기"}
            </St.GeneralConfirmation>

            {showCodeSnippets && (
              <St.Div className="code-section">
                {codeSnippets.map((snippet, snippetIndex) => (
                  <div key={snippetIndex}>
                    {/* Code Snippet Section */}
                    <select
                      value={snippet.programmingLanguageName || "javascript"}
                      onChange={(e) =>
                        updateCodeSnippet(
                          snippetIndex,
                          "programmingLanguageName",
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
                      minHeight="calc(5 * 1.25em)"
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
                    <St.GeneralConfirmation
                      type="button"
                      onClick={() =>
                        setCodeSnippets((prevSnippets) =>
                          prevSnippets.filter((_, i) => i !== snippetIndex)
                        )
                      }
                      isDark={diarySetting.theme === "dark"}
                    >
                      코드 스니펫 삭제
                    </St.GeneralConfirmation>

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
                        <St.GeneralConfirmation
                          type="button"
                          onClick={() =>
                            removeCodeCommentary(snippetIndex, commentaryIndex)
                          }
                          isDark={diarySetting.theme === "dark"}
                        >
                          코멘트 삭제
                        </St.GeneralConfirmation>
                      </div>
                    ))}
                    <St.GeneralConfirmation
                      type="button"
                      onClick={() => addCodeCommentary(snippetIndex)}
                      isDark={diarySetting.theme === "dark"}
                    >
                      코드 코멘트 추가
                    </St.GeneralConfirmation>
                  </div>
                ))}
                <St.GeneralConfirmation
                  type="button"
                  onClick={addCodeSnippet}
                  isDark={diarySetting.theme === "dark"}
                >
                  코드 스니펫 추가
                </St.GeneralConfirmation>
              </St.Div>
            )}

            <div className="buttonBox">
              <St.ConfirmBtn type="submit" onClick={handleSubmit}>
                저장
              </St.ConfirmBtn>
              <St.ConfirmBtn type="button" onClick={() => navigate("/")}>
                취소
              </St.ConfirmBtn>
            </div>
          </St.Div>
        </St.Container>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        message={modalMessage}
        confirmText="확인"
        onConfirm={() => setIsModalOpen(false)}
        singleButton
      />
    </>
  );
};

export default DiaryInsert;
