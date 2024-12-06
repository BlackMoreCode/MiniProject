import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Div,
  Img1,
  AddButton,
  RedirectButton,
} from "../components/homeComponent";
import image5 from "../assets/bannerimages/image5.jpg";
import { UserContext } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPerson } from "@fortawesome/free-solid-svg-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { LuSearch, LuPaintbrush } from "react-icons/lu";
import { BsSortNumericDown, BsSortNumericDownAlt } from "react-icons/bs";
import AxiosApi from "../api/AxiosApi";

const monthName = new Date().toLocaleString("default", { month: "long" });
const year = new Date().getFullYear();

const Home = () => {
  const { logout, diaries, loggedInMember, fetchDiaries } =
    useContext(UserContext);

  // 리액트 문맥 값 (context value) 는 디자인상 불변성이 유지되어야하므로 ("immutable")
  // 컨텍스트에서 직접적으로 정렬을 실행하는 것은 이상적이지 못하다.
  // 그러므로 Home.jsx에서 diaries의 로컬 복사본을 생성한다.
  const [sortedDiaries, setSortedDiaries] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInMember) {
      console.log("Home Update by loggedInMember");
      fetchDiaries();
    } else if (loggedInMember === null) {
      console.log("go to intro page");
      navigate("/intro");
    }
  }, []);

  useEffect(() => {
    setSortedDiaries([...diaries]); // 받은 일기랑 정렬된 일기랑 동기화 처리
  }, [diaries]);

  // 검색창 열고 닫기
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchCloseVisible, setSearchCloseVisible] = useState(false);
  const searchVisibleOn = () => {
    setSearchVisible(true);
    setSearchCloseVisible(true);
  };
  useEffect(() => {
    // 커서 포커싱
    if (searchVisible) {
      inputRef.current.focus();
    }
  }, [searchVisible]);
  const searchVisibleOff = () => {
    setSearchVisible(false);
    setSearchCloseVisible(false);
    setSearchValue("");
  };

  // 검색
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const inputChange = (e) => {
    setSearchValue(e.target.value);
  };

  // 정렬
  const [isSort, setIsSort] = useState("asc");

  //기존 로직이 완료되지 않아서 추가.
  const handleSort = () => {
    setIsSort((prevState) => {
      const newSortOrder = prevState === "asc" ? "desc" : "asc";

      // Update sortedDiaries instead of original diaries
      setSortedDiaries((prevDiaries) =>
        [...prevDiaries].sort((a, b) => {
          const dateA = new Date(a.writtenDate);
          const dateB = new Date(b.writtenDate);

          if (newSortOrder === "asc") {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        })
      );

      return newSortOrder;
    });
  };

  // 날짜 선택 --> 미완성?
  const selectDate = () => {};

  // 일기 날짜 포맷
  const currentDate = new Date();
  const [diaryYear, setDiaryYear] = useState(currentDate.getFullYear());
  const [diaryMonth, getDiaryMonth] = useState(currentDate.getMonth() + 1);

  return (
    <Container>
      <Div className="phone-container">
        {/* 헤더바 */}
        <Div className="phone-header">
          <Img1 src={image5} alt="image5" />

          <Div className="phone-headerbar">
            <Div className="phone-headerLeft">
              {/* 왼쪽 메뉴 버튼 -- 구현 아직 안된듯? */}
              <button className="phone-menuBtn">
                <GiHamburgerMenu />
              </button>
              <button
                className="phone-menuBtn"
                onClick={() => {
                  logout();
                  navigate("/intro");
                }}
              >
                <FiLogOut />
              </button>
            </Div>

            <Div className="phone-headerRight">
              {/* 테마 변경 버튼 --> 아직 기능 구현 처리 안됨 */}
              <button className="phone-themeBtn">
                <LuPaintbrush />
              </button>

              <div className="phone-searchBox">
                <input
                  title="일기 검색"
                  type="text"
                  style={{ display: searchVisible ? "block" : "none" }}
                  value={searchValue}
                  onChange={inputChange}
                  ref={inputRef}
                />
                <button
                  className="searchBtn"
                  onClick={searchVisibleOn}
                  style={{ display: searchVisible ? "none" : "block" }}
                >
                  <LuSearch />
                </button>
                <button
                  className="closeBtn"
                  onClick={searchVisibleOff}
                  style={{ display: searchCloseVisible ? "block" : "none" }}
                >
                  <AiOutlineClose />
                </button>
              </div>
              <button className="phone-sort" onClick={handleSort}>
                {isSort === "asc" ? (
                  // 가져다 대면 어떤 정렬인지 텍스트로도 표기
                  <BsSortNumericDown title="오름차순 정렬" />
                ) : (
                  <BsSortNumericDownAlt title="내림차순 정렬" />
                )}
              </button>
            </Div>
          </Div>

          <Div className="phone-theme">
            <button onClick={selectDate}>
              {diaryYear} {diaryMonth}월
            </button>
          </Div>
        </Div>
        {/* Diary Section */}
        <Div className="diary-container">
          {sortedDiaries.length === 0 ? (
            <p>추가된 일기가 아직 없습니다.</p>
          ) : (
            sortedDiaries.map((diary, index) => (
              <Div
                key={index}
                className="diary-box"
                style={{ position: "relative", cursor: "pointer" }}
                onClick={() =>
                  navigate("/diaryUpdate", {
                    state: { diaryNum: diary.diaryNum },
                  })
                }
              >
                <p className="diary-date">
                  {(() => {
                    const date = new Date(diary.writtenDate); // 백엔드로서부터 받는 writtenDate 사용
                    return !isNaN(date.getTime())
                      ? `${date.getFullYear()}-${String(
                          date.getMonth() + 1
                        ).padStart(2, "0")}-${String(date.getDate()).padStart(
                          2,
                          "0"
                        )}`
                      : "Invalid Date";
                  })()}
                </p>
                <p className="diary-title">{diary.title || "제목 없음"}</p>
                <p className="diary-desc">{diary.content || "내용 없음"}</p>
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
