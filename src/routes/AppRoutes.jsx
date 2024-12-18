import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "../pages/Calendar/Calendar";
import { DiarySettingProvider } from "../contexts/DiarySettingContext";
import Home from "../pages/Home";
import DiaryInsert from "../pages/Diary/DiaryInsert";
import DiaryUpdate from "../pages/Diary/DiaryUpdate";
import MyPage from "../pages/MyPage/MyPage";
import Profile from "../pages/MyPage/Profile";
import { NotFound } from "../pages/NotFound/NotFound";
import Intro from "../pages/Intro/Intro";
import { SignUp } from "../pages/SignUp/SignUp";
import { Login } from "../pages/Login/Login";
import ChangePw from "../pages/MyPage/ChangePw";
import ChangeFont from "../pages/MyPage/ChangeFont";
import ChangeImage from "../pages/MyPage/ChangeImage";
import DeleteMember from "../pages/MyPage/DeleteMember";

function AppRoutes() {
  return (
    <Router>
      <DiarySettingProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />

          <Route path="/diaryInsert" element={<DiaryInsert />} />
          <Route path="/diaryUpdate/:diaryNum" element={<DiaryUpdate />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/font" element={<ChangeFont />} />
          <Route path="/changepw" element={<ChangePw />} />
          <Route path="/banner" element={<ChangeImage />} />
          <Route path="/deleteMember" element={<DeleteMember />} />

          <Route path="/intro" element={<Intro />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </DiarySettingProvider>
    </Router>
  );
}

export default AppRoutes;
