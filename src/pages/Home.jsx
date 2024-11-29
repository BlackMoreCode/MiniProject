import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Div, Img1, AddButton } from "../components/homeComponent";
import theme1 from "../images/theme1.jpg";
import { MobileDeviceContainer } from "../components/MobileDeviceContainer";
import { IoPersonCircleOutline } from "react-icons/io5";

const Home = () => {
  
  const [diaries, setDiaries] = useState([]);
  const navigate = useNavigate();

  return (
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
          <button>2024-11</button>
        </Div>
      </Div>
      {/* Diary Section */}
      <Div className="diary-container">
        <Div className="diary-box">
          <p className="diary-date">03</p>
          {/* <button>수정하기</button> 수정 버튼 없이 일기 상세 페이지에서 수정하기 구현해도 될 듯 */}
          <p className="diary-title">Title1</p>
          <p className="diary-desc">Description1</p>
        </Div>
        {diaries.map((diary, index) => (
          <Div key={index} className="diary-box">
            <p className="diary-date">{diary.date}</p>
            <p className="diary-title">{diary.title}</p>
            <p className="diary-desc">{diary.desc}</p>
          </Div>
        ))}
      </Div>

      {/* Footer */}
      <Div className="phone-footer">
        <button onClick={() => navigate("/calendar")}>달력</button>
        <AddButton onClick={() => navigate("/diaryInsert")}>+</AddButton>
        <button onClick={() => navigate("/mypage")} className="mypageBtn">
          <IoPersonCircleOutline />
        </button>
      </Div>
    </Div>
  );
};

export default Home;
