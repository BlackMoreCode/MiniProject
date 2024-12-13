import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, Div } from "./MyPageStyles";
import { IoIosArrowBack } from "react-icons/io";

import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";

import image1 from "../../assets/bannerimages/banner1.jpg";

const ChangeTheme = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Div className="font-container">
        <div className="font-header">
          <button onClick={() => navigate("/mypage")} className="backBtn">
            <IoIosArrowBack />
          </button>
          <p onClick={() => navigate("/mypage")} className="mypage-title">
            테마
          </p>
        </div>

        <div className="font-body">
          <div className="theme-box">
            <div className="imageTitle">
              <FiSun />
              <p>Light</p>
            </div>
            <div className="imageBox">
              <img src={image1} alt="이미지" />
              <img src={image1} alt="이미지" />
              <img src={image1} alt="이미지" />
            </div>
          </div>

          <div className="theme-box">
            <div className="imageTitle">
              <IoMoonOutline />
              <p>Dark</p>
            </div>
            <div className="imageBox">
              <img src={image1} alt="이미지" />
              <img src={image1} alt="이미지" />
              <img src={image1} alt="이미지" />
            </div>
          </div>
        </div>
      </Div>
    </Container>
  );
};

export default ChangeTheme;
