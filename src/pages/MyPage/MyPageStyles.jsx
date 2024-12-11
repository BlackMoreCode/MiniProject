import styled from "styled-components";

// 공통
export const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Div = styled.div`
  &.mypage-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: rgb(225, 235, 255);
  }
  
  // MyPage.jsx 관련
  &.menuBox {
    .linkBox button {
      background-color: white;
      border: none;
      border-radius: 10px;
      width: 100%;
      /* height: 50px; */
      margin: 15px 0;
      text-align: left;
      padding: 15px;
      font-size: 20px;
      font-weight: 500;
      &:hover {
        padding: 10px;
        border: 5px solid skyblue;
      }
    }
  }

  .backBtn {
    background-color: white;
    border: none;
  }

  // profile 관련
  &.phone-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .backBtn {
    width: 30px;
    height: 30px;
    border: 2px solid black;
    border-radius: 50%;
    cursor: pointer;
    img {
      width: 100%;
    }
  }

  .header-blank {
    width: 30px;
  }

  .profile-form {
    margin-top: 40px;
    height: 100%;
  }

  .inputBox {
    position: relative;
  }

  .profile-inputRqd,
  .profile-input {
    box-sizing: border-box;
    width: 100%;
    padding: 12px 0;
    border: none;
    outline: none;
    border-bottom: 2px solid #ddd;
    font-size: 1rem;
    margin-bottom: 21px;
  }

  .profile-input:focus {
    border-bottom: 2px solid #aaa;
  }

  .messageOn {
    width: 100%;
    position: absolute;
    bottom: 0;
    font-size: 12px;
    text-align: right;
    color: green;
  }
  .messageOff {
    width: 100%;
    position: absolute;
    bottom: 0;
    font-size: 12px;
    text-align: right;
    color: red;
  }
  
  .submitBtn {
    width: 90%;
    padding: 15px 0;
    margin: 0 20px;
    background-color: #007bff;
    border: 0;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    position: absolute;
    left: 0;
    bottom: 20px;
    &:hover,
    &:active {
      background-color: #0a6dce;
    }
    &:disabled {
      background-color: #ccc;
    }
  }

  // font 관련
  &.font-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: rgb(225, 235, 255);
    overflow: auto;
  }

  .font-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .font-body {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }

  .font-box {
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0;
    &:hover {
      border: 5px solid skyblue;
      padding: 5px;
      p {
        scale: 1.02;
      }
    }
  }
  .banner-box {
    width: 100%;
    height: 200px;
    overflow: hidden;
    margin: 10px 0;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      border: 5px solid skyblue;
    }
  }

  .font-dohyun {
    font-family: "Do Hyeon", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  .font-gowun-dodum {
    font-family: "Gowun Dodum", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  .font-hi-melody {
    font-family: "Hi Melody", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  .font-jua {
    font-family: "Jua", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  .font-nanum-gothic {
    font-family: "Nanum Gothic", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  // theme 관련


  // banner 관련
  &.banner-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: rgb(225, 235, 255);
    overflow: auto;
  }

  .font-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .banner-body {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }

  .banner-box {
    width: 100%;
    height: 200px;
    overflow: hidden;
    margin: 10px 0;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      border: 5px solid skyblue;
    }
  }
`;

// ModeChange 관련
