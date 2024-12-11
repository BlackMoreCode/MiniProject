import styled from "styled-components";

// 공통
export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Div = styled.div`
  &.mypage-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
  }

  .backBtn {
    background-color: transparent;
    border: none;
    width: 30px;
    height: 30px;
    cursor: pointer;
    svg {
      width: 30px;
      height: 30px;
      path {
        fill: #777;
      }
    }
  }
  
  // MyPage.jsx 관련
  .mypage-header {
    display: flex;
    background-color: #eee;
    padding: 20px;
    padding-bottom: 5px;
  }
  .mypage-title {
    font-size: 20px;
    font-weight: 600;
    color: #777;
    cursor: pointer;
  }
  .link-container {
    margin-top: 40px;
    margin: 40px 20px 0 20px;
    box-sizing: border-box;
    color: #777;
    border-top: 1px solid #777;
  }
  .linkBox {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    border-bottom: 1px solid #777;
    cursor: pointer;
    &:hover {
      color: #333;
    }
    &:hover .link-button {
      color: #333;
    }
    .link-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 30px;
        height: 30px;
      }
    }
    .link-button {
      background-color: white;
      background-color: transparent;
      border: none;
      width: 100%;
      text-align: left;
      padding: 15px 20px;
      font-size: 16px;
      font-weight: 600;
      color: #777;
      cursor: pointer;
    }
    .link-button-last {
      border: none;
    }
  }
  

  // profile 관련
  &.phone-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .profile-header {
    display: flex;
    padding: 20px;
    padding-bottom: 5px;
    background-color: #eee;
  }

  .profile-form {
    margin: 40px 20px 0 20px;
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
    background-color: white;
    position: relative;
    overflow: hidden;
  }

  .font-header {
    display: flex;
    width: 100%;
    padding: 20px 20px 5px 20px;
    background-color: #eee;
    position: fixed;
    top: 0;
    z-index: 1;
  }

  .font-body {
    width: 100%;
    height: calc(100% - 55px);
    margin-top: 55px;
    display: flex;
    flex-direction: column;
    padding: 40px 20px 20px 20px;
    overflow: auto;
  }

  .font-box {
    background-color: rgb(244,244,246);
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0;
    &:hover {
      border: 5px solid #ccc;
      padding: 5px;
      p {
        scale: 1.02;
      }
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
  .theme-box {
    background-color: rgb(244,244,246);
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0;
    cursor: pointer;
    &:hover {
      border: 5px solid #ccc;
      padding: 5px;
      p {
        scale: 1.02;
      }
    }
  }

  .imageTitle {
    padding-bottom: 5px;
    color: #333;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
  }
  .imageBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 150px;
    img {
      width: 30%;
    }
  }

  // banner 관련
  &.banner-container {
    width: 100%;
    background-color: white;
    position: relative;
    overflow: hidden;
  }

  .banner-header {
    display: flex;
    width: 100%;
    padding: 20px 20px 5px 20px;
    background-color: #eee;
    position: fixed;
    top: 0;
    z-index: 1;
  }
  
  .banner-body {
    width: 100%;
    height: calc(100% - 55px);
    margin-top: 55px;
    display: flex;
    flex-direction: column;
    padding: 40px 20px 20px 20px;
    overflow: auto;
  }
  
  .banner-box {
    width: 100%;
    height: 150px;
    margin: 10px 0;
    border-radius: 10px;
    box-sizing: border-box;
    img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }
    &:hover {
      border: 5px solid #aaa;
      img {
        border-radius: 0;
        /* scale: 1.2; */
      }
    }
  }
`;

// ModeChange 관련
