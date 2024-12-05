import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Div,
  Img1,
  AddButton,
  RedirectButton,
} from "../components/homeComponent";
import theme1 from "../assets/images/theme1.jpg";
import { UserContext } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPerson } from "@fortawesome/free-solid-svg-icons";

const monthName = new Date().toLocaleString("default", { month: "long" });
const year = new Date().getFullYear();

const Home = () => {
  const { diaries } = useContext(UserContext);
  const navigate = useNavigate();

  // 디버깅용. HOME에 일기가 업데이트 되었나...
  useEffect(() => {
    console.log("Updated diaries in Home:", diaries); // Log updated diaries
  }, [diaries]);

  return (
    <Container>
      <Div className="phone-container">
        {/* 헤더바 */}
        <Div className="phone-header">
          <Img1 src={theme1} alt="theme1" />

          <Div className="phone-headerbar">
            <Div className="phone-headerLeft">
              {/* 왼쪽 메뉴 버튼 */}
              <button className="phone-menuBtn">=</button>
            </Div>

            <Div className="phone-headerRight">
              {/* 테마 변경 버튼 */}
              <button className="phone-themeBtn">테마</button>
              <div className="phone-searchBox">
                <input />
                <button>검색</button>
              </div>
              <button className="phone-sort">정렬</button>
            </Div>
          </Div>

          <Div className="phone-header-theme">
            <button>
              {year} {monthName}
            </button>
          </Div>
        </Div>
        {/* Diary Section */}
        <Div className="diary-container">
          {diaries.length === 0 ? (
            <p>추가된 일기가 아직 없습니다.</p>
          ) : (
            diaries.map((diary, index) => (
              <Div
                key={index}
                className="diary-box"
                style={{ position: "relative", cursor: "pointer" }}
                // 전과 다르게 diaryNum 만 넘겨주자
                onClick={() =>
                  navigate("/diaryUpdate", {
                    state: { diaryNum: diary.diaryNum },
                  })
                }
              >
                <p className="diary-date">{diary.date}</p>
                <p className="diary-title">{diary.title}</p>
                <p className="diary-desc">{diary.description}</p>
              </Div>
            ))
          )}
        </Div>
        {/* Footer */}
        <Div className="phone-footer">
          <RedirectButton onClick={() => navigate("/calendar")}>
            <FontAwesomeIcon icon={faCalendar} />
          </RedirectButton>
          <AddButton onClick={() => navigate("/diaryInsert")}>+</AddButton>
          <RedirectButton onClick={() => navigate("/mypage")}>
            <FontAwesomeIcon icon={faPerson} />
          </RedirectButton>
        </Div>
      </Div>
    </Container>
  );
};

export default Home;
