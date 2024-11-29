import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Div, Form } from "../components/diaryComponent";
import leftArrowIcon from "../assets/icons/left-arrow.png";

const DiaryInsert = (/* 유저 아이디 받기?? */) => {
  const navigate = useNavigate();
  // 오늘 날짜(YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  // 날짜 클릭 이벤트
  const diaryDateRef = useRef(null);
  const openDatePicker = () => {
    if(diaryDateRef.current) {
      diaryDateRef.current.showPicker();
    }
  }

  return (
    <Div className="phone-container">
      <Div className="diary-header">
        <button onClick={()=>navigate("/")} className="backBtn">
          <img src={leftArrowIcon} alt="뒤로가기" />
        </button>
        <p>세호의 일기</p>
        <div></div>
      </Div>

      <Form action="" method="post" className="diary-container">
        <p className="diary-name">일기 제목</p>
        <input
          type="text" 
          name="diary-title" 
          className="diary-title" 
          placeholder="제목을 입력하세요." 
        />
        <p>작성한 날짜</p>
        <input 
          type="date" 
          name="diary-date" 
          className="diary-date" 
          defaultValue={today} 
          ref={diaryDateRef}
          onClick={openDatePicker}
        />
        <p>오늘의 일기</p>
        <textarea 
          name="diary-desc" 
          className="diary-desc" 
          placeholder="내용을 입력하세요">
        </textarea>
        <div className="diary-coding-header">
          <button>+</button>
          <p>코딩 일기</p>
        </div>
        <textarea name="coding-desc" className="coding-desc">
        </textarea>


        <div className="buttonBox">
          <button className="inputBtn">작성</button>
          <button className="cancelBtn">취소</button>
        </div>
      </Form>
    </Div>
  );
};
export default DiaryInsert;
