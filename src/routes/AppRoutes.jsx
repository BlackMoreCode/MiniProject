import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "../pages/Calendar";
import Home from "../pages/Home";
import Diary from "../pages/Diary";
import DiaryInsert from "../pages/DiaryInsert";
import MyPage from "../pages/MyPage";
import Profile from "../pages/Profile";
import { NotFound } from "../pages/NotFound/NotFound";
import { Register } from "../pages/Register/Register";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />

        <Route path="/diary" element={<Diary />} />
        <Route path="/diaryInsert" element={<DiaryInsert />} />

        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
