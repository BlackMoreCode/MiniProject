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
  const { logout, diaries, loggedInMember, fetchDiaries } =
    useContext(UserContext);
  const navigate = useNavigate();

  //로그인 상태가 아닐경우 로그인 페이지로 리다이렉트.
  // useEffect(() => {
  //   if (!loggedInMember) {
  //     navigate("/login"); // Redirect to login page
  //   }
  // }, []);

  // Fetch diaries when loggedInMember is updated
  useEffect(() => {
    if (loggedInMember) {
      console.log("Home Update by loggedInMember");
      fetchDiaries();
    } else if (loggedInMember === null) {
      console.log("go to intro page");
      navigate("/intro");
    }
  }, []);

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
              <button
                onClick={() => {
                  logout();
                  navigate("/intro");
                }}
              >
                로그아웃
              </button>
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
