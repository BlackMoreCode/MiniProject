import React, { useContext, useState, useEffect, useRef } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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

const DiaryUpdate = () => {
  const location = useLocation();
  const textarea = useRef(null);
  const { fetchDiaries } = useContext(DiaryContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [showCodeSnippets, setShowCodeSnippets] = useState(false);

  const [index, setIndex] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { diaryNum } = useParams();
  const navigate = useNavigate();
  const { loggedInMember } = useContext(LoginContext);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await AxiosApi.getDiary({
          loggedInMember,
          diaryNum,
        });

        console.log("Fetched diary data:", response);

        if (response) {
          setTitle(response.title || "");
          setDescription(response.content || "");
          setDate(
            response.writtenDate
              ? new Date(response.writtenDate).toISOString().split("T")[0]
              : ""
          );
          setTags(response.tags || []);

          // Sort codingDiaryEntries by sequence
          const sortedEntries = response.codingDiaryEntries.sort(
            (a, b) => a.sequence - b.sequence
          );

          // Map sorted entries to snippets and comments
          const groupedSnippets = [];
          let currentSnippet = null;

          sortedEntries.forEach((entry) => {
            if (entry.entryType === "snippet") {
              currentSnippet = {
                programmingLanguageName: entry.programmingLanguageName,
                content: entry.content,
                commentary: [],
                entryType: "snippet",
                sequence: entry.sequence,
              };
              groupedSnippets.push(currentSnippet);
            } else if (entry.entryType === "comment") {
              if (currentSnippet) {
                currentSnippet.commentary.push(entry.content);
              }
            }
          });

          setCodeSnippets(groupedSnippets);
        }
      } catch (error) {
        console.error("Error fetching diary:", error);
      }
    };

    if (diaryNum && loggedInMember) {
      fetchDiary();
    }
  }, [diaryNum, loggedInMember]);

  // 일기 수정 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title?.trim() || !description?.trim() || !date?.trim()) {
      setModalMessage("일기 제목, 내용, 날짜를 입력하세요!");
      setIsModalOpen(true);
      return;
    }

    let sequenceCounter = 1; // Ensure the sequence starts fresh for each update.

    const formatDate = (date) => {
      const d = new Date(date);
      const pad = (n) => (n < 10 ? "0" + n : n);
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
        d.getDate()
      )}T00:00:00`;
    };

    const updatedDiary = {
      title,
      content: description,
      tags,
      writtenDate: formatDate(date),
      codingDiaryEntries: codeSnippets.flatMap((snippet) => {
        const entries = [];

        // Add the snippet if it exists
        if (snippet.content && snippet.entryType === "snippet") {
          entries.push({
            entryType: "snippet",
            programmingLanguageName:
              snippet.programmingLanguageName || "javascript",
            content: snippet.content, // Preserve the snippet content
            sequence: sequenceCounter++, // Increment the sequence
          });
        }

        // Add associated comments
        if (Array.isArray(snippet.commentary)) {
          snippet.commentary.forEach((comment) => {
            entries.push({
              entryType: "comment",
              programmingLanguageName: null,
              content: comment, // Preserve the comment content
              sequence: sequenceCounter++, // Increment the sequence
            });
          });
        }

        return entries;
      }),
    };

    console.log("Updated Diary Payload:", updatedDiary);

    try {
      await AxiosApi.updateDiary({
        loggedInMember,
        diaryNum,
        updatedDiary,
      });

      navigate("/");
    } catch (error) {
      console.error("Failed to update diary:", error);
      setModalMessage("일기를 수정하는데 실패하였습니다.");
      setIsModalOpen(true);
    }
  };

  //일기 제거 함수
  const handleDelete = async () => {
    if (!diaryNum) {
      setModalMessage("삭제할 다이어리가 없습니다.");
      setIsModalOpen(true);
      return;
    }

    try {
      await AxiosApi.deleteDiary({
        loggedInMember,
        diaryNum,
      });

      await fetchDiaries();

      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Failed to delete diary:", error);
      setModalMessage("다이어리를 삭제하는데 실패했습니다.");
      setIsModalOpen(true);
    }
  };

  //태그 추가 함수
  const addTag = () => {
    const trimmedTag = tagInput.trim();

    if (!trimmedTag) {
      // Case 1: 빈 태그 허용 불가
      setModalMessage("태그를 입력하세요!"); // "Please enter a tag!"
      setIsModalOpen(true);
    } else if (tags.includes(trimmedTag)) {
      // Case 2: 중복 태그 막기
      setModalMessage("중복된 태그는 추가할 수 없습니다."); // "Duplicate tags cannot be added."
      setIsModalOpen(true);
    } else {
      // Case 3: 위의 2경우가 아닐경우
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const addCodeSnippet = () => {
    setCodeSnippets((prevSnippets) => [
      ...prevSnippets,
      {
        programmingLanguageName: "javascript", // Default language
        content: "", // New snippet starts empty
        commentary: [], // No comments initially
        entryType: "snippet", // Explicitly set the type
      },
    ]);
  };

  const updateCodeSnippet = (snippetIndex, newCode) => {
    setCodeSnippets((prevSnippets) =>
      prevSnippets.map((snippet, index) =>
        index === snippetIndex
          ? {
              ...snippet,
              content: newCode, // Update the content field for the snippet
            }
          : snippet
      )
    );
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
    setCodeSnippets((prevSnippets) =>
      prevSnippets.map((snippet, index) =>
        index === snippetIndex
          ? {
              ...snippet,
              commentary: snippet.commentary.map(
                (comment, i) => (i === commentaryIndex ? newComment : comment) // Update only the targeted commentary
              ),
            }
          : snippet
      )
    );
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

          <St.Div className="code-section">
            {codeSnippets.map((snippet, snippetIndex) => (
              <div key={snippetIndex}>
                {/* Language Dropdown */}
                <select
                  value={snippet.programmingLanguageName}
                  onChange={(e) => {
                    const updatedSnippets = [...codeSnippets];
                    updatedSnippets[snippetIndex].programmingLanguageName =
                      e.target.value;
                    setCodeSnippets(updatedSnippets);
                  }}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>

                {/* Code Editor */}
                <CodeMirror
                  value={snippet.content}
                  height="auto"
                  theme={dracula}
                  extensions={[
                    snippet.programmingLanguageName === "javascript"
                      ? javascript()
                      : snippet.programmingLanguageName === "python"
                      ? python()
                      : java(),
                  ]}
                  onChange={(value) => updateCodeSnippet(snippetIndex, value)}
                />

                <St.GeneralRmvBtn
                  type="button"
                  onClick={() => removeCodeSnippet(snippetIndex)}
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

            {/* Add Snippet Button */}
            <St.GeneralAddBtn type="button" onClick={addCodeSnippet}>
              코드 스니펫 추가
            </St.GeneralAddBtn>
          </St.Div>

          <div className="buttonBox">
            <St.ConfirmBtn type="submit" onClick={handleSubmit}>
              수정
            </St.ConfirmBtn>
            <St.RmvBtnS type="button" onClick={handleDelete}>
              삭제
            </St.RmvBtnS>
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

export default DiaryUpdate;
