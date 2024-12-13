import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";

//CSS
import {
  Container,
  Div,
  Img1,
  AddButton,
  RedirectButton,
} from "../components/homeComponent";

//Context
import { LoginContext } from "../contexts/LoginContext";
import { DiaryContext } from "../contexts/DiaryContext";
import { DiarySettingContext } from "../contexts/DiarySettingContext";

//Font and Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineClose } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { LuSearch, LuPaintbrush } from "react-icons/lu";
import { BsSortNumericDown, BsSortNumericDownAlt } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Light & Dark icon
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";

// Calendar
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// 배너 이미지 매핑
import { bannerSrcPathDict } from "../util/bannerImageUtils";

const Home = () => {
  const { logout, loggedInMember } = useContext(LoginContext);
  const { diaries, fetchDiariesForMonth } = useContext(DiaryContext);
  const { diarySetting, updateDiarySetting } = useContext(DiarySettingContext);

  const [sortedDiaries, setSortedDiaries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSort, setIsSort] = useState("asc");

  const [diaryYear, setDiaryYear] = useState(new Date().getFullYear());
  const [diaryMonth, setDiaryMonth] = useState(new Date().getMonth() + 1);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [allDiaries, setAllDiaries] = useState([]);

  const navigate = useNavigate();

  // 컴포넌트 마운트 / 로그인 시 검색을 위해 모든 일기를 fetch
  useEffect(() => {
    if (loggedInMember) {
      fetchAllDiaries();
    }
  }, [loggedInMember]);

  useEffect(() => {
    if (loggedInMember) {
      fetchDiariesForMonth(diaryYear, diaryMonth, loggedInMember);
    }
  }, [loggedInMember, diaryYear, diaryMonth, fetchDiariesForMonth]);

  const fetchAllDiaries = async () => {
    try {
      const response = await AxiosApi.getDiaries({ loggedInMember });
      setAllDiaries(response.diaries || []);
    } catch (error) {
      console.error("Failed to fetch all diaries:", error);
    }
  };

  // 검색용 useEffect
  useEffect(() => {
    if (searchValue.trim() === "") {
      setSearchResults([]);
      return;
    }

    if (allDiaries.length === 0) {
      fetchAllDiaries();
    } else {
      const results = allDiaries.filter((diary) =>
        diary.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchValue, allDiaries]);

  // 검색 필터 적용
  useEffect(() => {
    if (searchValue.trim() === "") {
      setSearchResults([]);
    } else {
      const results = sortedDiaries.filter((diary) =>
        diary.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchValue, sortedDiaries]);

  const inputRef = useRef(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchCloseVisible, setSearchCloseVisible] = useState(false);

  const searchVisibleOn = () => {
    setSearchVisible(true);
    setSearchCloseVisible(true);
  };

  const searchVisibleOff = () => {
    setSearchVisible(false);
    setSearchCloseVisible(false);
    setSearchValue("");
    setSearchResults([]);
  };

  const inputChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchVisible) {
      inputRef.current.focus();
    }
  }, [searchVisible]);

  useEffect(() => {
    if (!diaries || diaries.length === 0) {
      setSortedDiaries([]);
      return;
    }
    const filteredDiaries = diaries.filter((diary) => {
      const diaryDate = new Date(diary.writtenDate);
      return (
        diaryDate.getFullYear() === diaryYear &&
        diaryDate.getMonth() + 1 === diaryMonth
      );
    });
    setSortedDiaries(filteredDiaries);
  }, [diaries, diaryYear, diaryMonth]);

  const handleDateChange = (date) => {
    const selectedYear = date.getFullYear();
    const selectedMonth = date.getMonth() + 1;

    setDiaryYear(selectedYear);
    setDiaryMonth(selectedMonth);
    setShowCalendarModal(false);
  };

  // 일기 정렬
  const handleSort = () => {
    setIsSort((prevState) => {
      const newSortOrder = prevState === "asc" ? "desc" : "asc";
      
      setSortedDiaries((prevDiaries) =>
        [...prevDiaries].sort((a, b) => {
          const dateA = new Date(a.writtenDate);
          const dateB = new Date(b.writtenDate);
          return newSortOrder === "asc" ? dateA - dateB : dateB - dateA;
        })
      );

      return newSortOrder;
    });
  };

  const changeMonth = (offset) => {
    let newMonth = diaryMonth + offset;
    let newYear = diaryYear;

    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }

    setDiaryYear(newYear);
    setDiaryMonth(newMonth);
  };

  // theme 변경
  const updateTheme = async () => {
    const isUpdated = await updateDiarySetting(
      "theme",
      diarySetting.theme === "dark" ? "default" : "dark"
    );

    if (!isUpdated) {
      alert("테마 변경 실패");
    }
  };

  return (
    <Container>
      <Div className="phone-container">
        <Div className="phone-header">
          <Img1
            src={bannerSrcPathDict[diarySetting.mainBannerImage]}
            alt="BannerImage"
          />
          <Div className="phone-headerbar">
            <Div className="phone-headerLeft">
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
              <button 
                className={
                  diarySetting.theme === "dark"
                   ? "phone-themeBtn-dark"
                   : "phone-themeBtn"
                } 
                onClick={updateTheme}
              >
                {diarySetting.theme === "dark" ? <IoMoonOutline /> : <FiSun />}
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
            </Div>
          </Div>
        </Div>

        {showCalendarModal && (
          <Div className="modal-container">
            <Div className="modal-content">
              <button
                className="modal-close"
                onClick={() => setShowCalendarModal(false)}
              >
                ✖
              </button>
              <Calendar
                onChange={handleDateChange}
                value={new Date(diaryYear, diaryMonth - 1)}
                maxDetail="year"
              />
            </Div>
          </Div>
        )}

        <Div className="date-sort-container">
          <Div className="phone-theme">
            <button className="date-calendar" onClick={() => changeMonth(-1)}>
              <IoIosArrowBack />
            </button>
            <span
              onClick={() => setShowCalendarModal(true)}
              className="hover-scale"
            >
              {diaryYear} {diaryMonth}월 📅
            </span>

            <button className="date-calendar" onClick={() => changeMonth(1)}>
              <IoIosArrowForward />
            </button>
          </Div>
          <button className="phone-sort" onClick={handleSort}>
            {isSort === "asc" ? (
              <BsSortNumericDown title="오름차순 정렬" />
            ) : (
              <BsSortNumericDownAlt title="내림차순 정렬" />
            )}
          </button>
        </Div>

        <Div className="diary-container">
          {searchValue && searchResults.length === 0 ? (
            <p>검색 결과가 없습니다.</p>
          ) : searchValue ? (
            searchResults.map((diary, index) => (
              <Div
                key={index}
                className="diary-box"
                style={{ position: "relative", cursor: "pointer" }}
                onClick={() => navigate(`/diaryUpdate/${diary.diaryNum}`)}
              >
                <p className="diary-date">
                  {` ${new Date(diary.writtenDate).getDate()}일`}
                  {new Date(diary.writtenDate).toLocaleDateString("ko-kr", {
                    weekday: "long",
                  })}
                </p>
                <Div className="diary-content">
                  <p className="diary-title">{diary.title || "제목 없음"}</p>
                  <p className="diary-desc">{diary.content || "내용 없음"}</p>
                </Div>
              </Div>
            ))
          ) : sortedDiaries.length === 0 ? (
            <p>추가된 일기가 아직 없습니다.</p>
          ) : (
            sortedDiaries.map((diary, index) => (
              <Div
                key={index}
                className="diary-box"
                style={{ position: "relative", cursor: "pointer" }}
                onClick={() => navigate(`/diaryUpdate/${diary.diaryNum}`)}
              >
                <p className="diary-date">
                  {new Date(diary.writtenDate).toLocaleDateString("ko-kr", {
                    weekday: "long",
                  })}
                  {` ${new Date(diary.writtenDate).getDate()}일`}
                </p>
                <Div className="diary-content">
                  <p className="diary-title">{diary.title || "제목 없음"}</p>
                  <p className="diary-desc">{diary.content || "내용 없음"}</p>
                </Div>
              </Div>
            ))
          )}
        </Div>

        <Div className="phone-footer">
          <RedirectButton onClick={() => navigate("/calendar")}>
            <FontAwesomeIcon icon={faCalendar} />
          </RedirectButton>
          <AddButton onClick={() => navigate("/diaryInsert")}>+</AddButton>
          <RedirectButton onClick={() => navigate("/mypage")}>
            <FontAwesomeIcon icon={faUser} />
          </RedirectButton>
        </Div>
      </Div>
    </Container>
  );
};

export default Home;
