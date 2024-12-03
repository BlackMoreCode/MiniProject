import { useEffect, useContext, useState } from "react";
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
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { LuSearch, LuPaintbrush } from "react-icons/lu";
import { BsSortDownAlt } from "react-icons/bs";

const monthName = new Date().toLocaleString("default", { month: "long" });
const year = new Date().getFullYear();

const Home = () => {
  const { diaries } = useContext(UserContext);
  const navigate = useNavigate();

  // 디버깅용. HOME에 일기가 업데이트 되었나...
  useEffect(() => {
    console.log("Updated diaries in Home:", diaries); // Log updated diaries
  }, [diaries]);

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchCloseVisible, setSearchCloseVisible] = useState(false);

  const searchVisibleOn = () => {
    setSearchVisible(true);
    setSearchCloseVisible(true);
  }
  const searchVisibleOff = () => {
    setSearchVisible(false);
    setSearchCloseVisible(false);
  }

  return (
    <Container>
      <Div className="phone-container">
        {/* 헤더바 */}
        <Div className="phone-header">
          <Img1 src={theme1} alt="theme1" />

          <Div className="phone-headerbar">
            <Div className="phone-headerLeft">
              {/* 왼쪽 메뉴 버튼 */}
              <button className="phone-menuBtn">
                <RxHamburgerMenu />
              </button>
            </Div>

            <Div className="phone-headerRight">
              <button className="phone-themeBtn">
                <LuPaintbrush />
              </button>
              <div className="phone-searchBox"> 
                <button 
                  className="closeBtn" 
                  onClick={searchVisibleOff}
                  style={{ display: searchCloseVisible ? "block" : "none"}}
                >
                  <AiOutlineClose />
                </button>
                <input style={{ display: searchVisible ? "block" : "none"}} />
                <button 
                  className="searchBtn" 
                  onClick={searchVisibleOn}
                >
                  <LuSearch />
                </button>
              </div>
              <button className="phone-sort">
                <BsSortDownAlt />
              </button>
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
                onClick={
                  () => navigate("/diaryInsert", { state: { diary, index } }) // 일기 데이터랑 해당 인덱스 보내기...
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
