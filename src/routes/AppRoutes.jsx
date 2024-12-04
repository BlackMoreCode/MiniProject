import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "../pages/Calendar/Calendar";
import Home from "../pages/Home";
import DiaryInsert from "../pages/Diary/DiaryInsert";
import DiaryUpdate from "../pages/Diary/DiaryInsert";
import MyPage from "../pages/MyPage";
import Profile from "../pages/Profile";
import { NotFound } from "../pages/NotFound/NotFound";
import Intro from "../pages/Intro/Intro";
import { SignUp } from "../pages/SignUp/SignUp";
import { Login } from "../pages/Login/Login";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />

        <Route path="/diaryInsert" element={<DiaryInsert />} />
        <Route path="/diaryUpdate" element={<DiaryUpdate />} />

        <Route path="*" element={<NotFound />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/intro" element={<Intro />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
