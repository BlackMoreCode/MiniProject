import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, Div } from "../components/diaryComponent";

const Home = () => {
  // const [members, setMembers] = useState("");

  return(
    <Container>
      <Div className="phone-container">

        {/* 헤더바 */}
        <Div className="phone-header">
          {/* 왼쪽 메뉴 버튼 */}
          <button className="phone-menuBtn">
            =
          </button>

          {/* 테마 변경 버튼 */}
          <button className="phone-themeBtn">
            테마
          </button>
          <div className="phone-searchBox">
            <input />
            <button>검색</button>
          </div>
          <button className="phone-sort">정렬</button>
        </Div>

        {/* 날짜 + 테마 */}
        <Div className="phone=theme">
          {/* <img src="" alt="" /> */}
          <button>2024-11</button>
        </Div>

        {/* 일기 섹션 */}
        <Div className="diary-container">
          <div className="diary-box">
            <p>3</p>
            {/* <button>수정하기</button> 수정 버튼 없이 일기 상세 페이지에서 수정하기 구현해도 될 듯 */}
            <p>Title1</p>
            <p>Description1</p>
          </div>
          <div className="diary-box">
            <p>7</p>
            {/* <button>수정하기</button> 수정 버튼 없이 일기 상세 페이지에서 수정하기 구현해도 될 듯 */}
            <p>Title2</p>
            <p>Description2</p>
          </div>
          <div className="diary-box">
            <p>12</p>
            {/* <button>수정하기</button> 수정 버튼 없이 일기 상세 페이지에서 수정하기 구현해도 될 듯 */}
            <p>Title3</p>
            <p>Description3</p>
          </div>
        </Div>

        {/* 하단 메뉴 */}
        <Div className="phone-footer">
          <button>달력</button>
          <button>+</button>
          <button>MyPage</button>
        </Div>
      </Div>
    </Container>
  )
}
export default Home;