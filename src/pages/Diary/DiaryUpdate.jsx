import React, { useContext, useState, useEffect, useRef } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext, removeDiary } from "../../contexts/UserContext";
import * as St from "./diaryComponent";
import ConfirmationModal from "./ConfirmationModal";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { dracula } from "@uiw/codemirror-theme-dracula";

const DiaryUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const textarea = useRef(null);
  const { loggedInMember } = useContext(UserContext);

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

  useEffect(() => {
    if (location.state) {
      const { diary, index } = location.state;

      setTitle(diary.title || "");
      setDescription(diary.description || "");
      setDate(diary.date || new Date().toISOString().split("T")[0]);
      setTags(diary.tags || []);
      setCodeSnippets(
        (diary.codeSnippets || []).map((snippet) => ({
          ...snippet,
          commentary: snippet.commentary || [],
        }))
      );
      setIndex(index);
    }
  }, [location.state]);

  // useEffect fetch diary 추가하고 변경? (axioApi의 getDiary 부분?)
  // useEffect(() => {
  //   const fetchDiary = async () => {
  //     try {
  //       const response = await AxiosApi.getDiaryById(id); // Fetch diary by ID
  //       const fetchedDiary = response.data;
  //       setTitle(fetchedDiary.title || "");
  //       setDescription(fetchedDiary.content || "");
  //       setDate(fetchedDiary.writtenDate || new Date().toISOString());
  //       setTags(fetchedDiary.tags || []);
  //       setCodeSnippets(fetchedDiary.codingDiaryEntries || []);
  //     } catch (error) {
  //       console.error("Failed to fetch diary:", error);
  //     }
  //   };

  //   if (location.state?.id) {
  //     fetchDiary();
  //   }
  // }, [location.state]);

  const handleSubmit = async (e) => {
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
      )}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };

    const updatedDiary = {
      title,
      content: description,
      tags,
      writtenDate: formatDate(new Date()),
      codingDiaryEntries: codeSnippets.map((snippet, index) => ({
        programmingLanguageName: snippet.language || null,
        content: snippet.code || snippet.commentary,
        sequence: index + 1,
      })),
    };

    try {
      await AxiosApi.updateDiary(index, loggedInMember, updatedDiary); // Replace with the correct Axios API function
      navigate("/");
    } catch (error) {
      console.error("Failed to update diary:", error);
      setModalMessage("일기를 수정하는데 실패하였습니다.");
      setIsModalOpen(true);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (index !== null) {
      setModalMessage("정말로 일기를 삭제하시겠습니까?");
      setIsModalOpen(true);
    } else {
      setModalMessage("삭제할 일기가 없습니다.");
      setIsModalOpen(true);
    }
  };

  const confirmDeletion = async () => {
    try {
      await AxiosApi.deleteDiary(loggedInMember, index); // Assuming you have a delete API
      removeDiary(index); // Remove from context or local state
      navigate("/"); // Redirect to home after successful deletion
    } catch (error) {
      console.error("Failed to delete diary:", error);
      setModalMessage("일기를 삭제하는 데 실패했습니다.");
      setIsModalOpen(true);
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();

    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    } else if (tags.includes(trimmedTag)) {
      setModalMessage("중복된 태그를 입력하였습니다");
      setIsModalOpen(true);
    }
  };

  const addCodeSnippet = () => {
    setCodeSnippets([
      ...codeSnippets,
      { language: "javascript", code: "", commentary: [] },
    ]);
  };

  const removeCodeSnippet = (snippetIndex) => {
    setCodeSnippets(codeSnippets.filter((_, index) => index !== snippetIndex));
  };

  const addCodeCommentary = (snippetIndex) => {
    const updatedSnippets = [...codeSnippets];
    updatedSnippets[snippetIndex].commentary.push("");
    setCodeSnippets(updatedSnippets);
  };

  const removeCodeCommentary = (snippetIndex, commentaryIndex) => {
    const updatedSnippets = [...codeSnippets];
    updatedSnippets[snippetIndex].commentary.splice(commentaryIndex, 1);
    setCodeSnippets(updatedSnippets);
  };

  const updateCodeCommentary = (snippetIndex, commentaryIndex, newComment) => {
    const updatedSnippets = [...codeSnippets];
    updatedSnippets[snippetIndex].commentary[commentaryIndex] = newComment;
    setCodeSnippets(updatedSnippets);
  };

  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = "auto";
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
  };

  const handleChange = (e) => {
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
                  <button onClick={() => removeTag(tag)}>x</button>
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

                  <St.GeneralAddBtn
                    type="button"
                    onClick={() => addCodeCommentary(snippetIndex)}
                  >
                    코드 코멘트 추가
                  </St.GeneralAddBtn>

                  {snippet.commentary.map((comment, commentaryIndex) => (
                    <div key={commentaryIndex} style={{ marginTop: "10px" }}>
                      <St.TextArea
                        ref={textarea}
                        value={comment}
                        rows={4}
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
              <St.GeneralAddBtn type="button" onClick={addCodeSnippet}>
                코드 스니펫 추가
              </St.GeneralAddBtn>
            </St.Div>
          )}

          <div className="buttonBox">
            <St.ConfirmBtn type="submit" onClick={handleSubmit}>
              수정
            </St.ConfirmBtn>
            {/* 현재 data fetching api 가 제대로 붙어있지 않으므로 index가 null일거고, 그러면 삭제버튼은 렌더링 안된다 */}
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
          modalMessage === "중복된 태그를 입력하였습니다" ||
          modalMessage === "일기 제목, 내용, 날짜를 입력하세요!"
            ? "확인"
            : "네"
        }
        cancelText={
          modalMessage === "중복된 태그를 입력하였습니다" ||
          modalMessage === "일기 제목, 내용, 날짜를 입력하세요!"
            ? undefined
            : "아니오"
        }
        onConfirm={() => {
          if (modalMessage === "중복된 태그를 입력하였습니다") {
            setIsModalOpen(false); // 중복 태그 관련이면 그냥 모달 닫기
          } else if (modalMessage === "일기 제목, 내용, 날짜를 입력하세요!") {
            setIsModalOpen(false); // 필수 기입 내역 안했다면 그냥 모달 닫기
          } else if (modalMessage === "정말로 일기를 삭제하시겠습니까?") {
            confirmDeletion(); // 일기 삭제를 위해서는 confirmDeletion() 함수 호출
          }
        }}
        onCancel={() => setIsModalOpen(false)} // 취소하면 무조건 모달 닫기
        singleButton={
          modalMessage === "중복된 태그를 입력하였습니다" ||
          modalMessage === "일기 제목, 내용, 날짜를 입력하세요!"
        }
      />
    </St.Container>
  );
};

export default DiaryUpdate;
