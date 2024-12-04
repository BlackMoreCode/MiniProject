import { useEffect, useContext, useState, useRef } from "react";
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
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { LuSearch, LuPaintbrush } from "react-icons/lu";
import { BsSortNumericDown, BsSortNumericDownAlt } from "react-icons/bs";
import AxiosApi from "../api/AxiosApi";

const monthName = new Date().toLocaleString("default", { month: "long" });
const year = new Date().getFullYear();

const Home = () => {
  const { userId } = useContext(UserContext);
  const [diaries, setDiaries] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getDiaries = async (userId) => {
      try {
        const diaryRsp = await AxiosApi.diaries(userId);
        setDiaries(diaryRsp.data);
      } catch (e) {
        console.error("다이어리 불러오기 실패..", e);
        alert("다이어리 불러오기 실패..", e);
      }
    };
    getDiaries(userId);
  }, [userId]);

  

  // 검색창 열고 닫기
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchCloseVisible, setSearchCloseVisible] = useState(false);
  const searchVisibleOn = () => {
    setSearchVisible(true);
    setSearchCloseVisible(true);
  }
  useEffect(()=> {  // 커서 포커싱
    if (searchVisible) {
      inputRef.current.focus();
    }
  }, [searchVisible]);
  const searchVisibleOff = () => {
    setSearchVisible(false);
    setSearchCloseVisible(false);
    setSearchValue("");
  }

  // 검색
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const inputChange = (e) => {
    setSearchValue(e.target.value);
  }

  // 정렬
  const [isSort, setIsSort] = useState("asc");
  const handleSort = () => {
    setIsSort((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }

  // 날짜 선택
  const selectDate = () => {
    
  }

  // 일기 날짜 포맷
  const currentDate = new Date();
  const [diaryYear, setDiaryYear] = useState(currentDate.getFullYear());
  const [diaryMonth, getDiaryMonth] = useState(currentDate.getMonth() + 1);

  return (
    <Container>
      <Div className="phone-container">
        {/* 헤더바 */}
        <Div className="phone-header">
          <Img1 src={theme1} alt="theme1" />
          <Div className="phone-headerbar">
            <Div className="phone-headerLeft">
              <button className="phone-menuBtn">
                <GiHamburgerMenu />
              </button>
            </Div>
            <Div className="phone-headerRight">
              <button className="phone-themeBtn">
                <LuPaintbrush />
              </button>
              <div className="phone-searchBox"> 
                <input 
                  type="text" 
                  style={{ display: searchVisible ? "block" : "none"}} 
                  value={searchValue} 
                  onChange={inputChange} 
                  ref={inputRef} 
                />
                <button 
                  className="searchBtn" 
                  onClick={searchVisibleOn} 
                  style={{ display: searchVisible ? "none" : "block"}}
                >
                  <LuSearch />
                </button>
                <button 
                  className="closeBtn" 
                  onClick={searchVisibleOff}
                  style={{ display: searchCloseVisible ? "block" : "none"}}
                >
                  <AiOutlineClose />
                </button>
              </div>
              <button className="phone-sort" onClick={handleSort}>
                {isSort === "asc" ? <BsSortNumericDown /> : <BsSortNumericDownAlt />}
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
          {diaries.length === 0 ? (
            <p>추가된 일기가 아직 없습니다.</p>
          ) : (
            diaries
            .slice() // 원본 배열을 복사해 정렬
            .sort((a,b) => {
              const dayA = new Date(a.publishedAt).getDate();
              const dayB = new Date(b.publishedAt).getDate();
              
              if(isSort === "asc") {
                return dayA - dayB;
              } else if(isSort === "desc") {
                return dayB - dayA;
              }
              return 0;
            })
            .filter(diary => {
              const matchDate = 
                new Date(diary.publishedAt).getFullYear() === diaryYear 
                && new Date(diary.publishedAt).getMonth()+1 === diaryMonth;
              const matchSearch = 
                diary.title.toLowerCase().includes(searchValue.toLowerCase()) 
                || diary.content.toLowerCase().includes(searchValue.toLowerCase())
              return matchDate && matchSearch;
            })
            .map((diary, index) => (
              <Div
                key={index}
                className="diary-box"
                style={{ position: "relative", cursor: "pointer" }}
                onClick={
                  () => navigate("/diaryInsert", { state: { diary, index } }) // 일기 데이터랑 해당 인덱스 보내기...
                }
              >
                {/* {console.log(diaries)} */}
                <p className="diary-date">
                {(() => {
                  const date = new Date(diary.publishedAt);
                  return date.getDate().toString().padStart(2, '0');
                })()}
                </p>
                <p className="diary-title">{diary.title}</p>
                <p className="diary-desc">{diary.content}</p>
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
