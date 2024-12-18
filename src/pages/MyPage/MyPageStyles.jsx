import styled from "styled-components";

// 공통
export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Div = styled.div`
  // 공통
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
  // 폰트
  &.font-default {
    .mypage-title,
    .link-button,
    input {
      font-family: "Nanum Gothic", sans-serif;
    }
  }
  &.font-do-hyeon {
    .mypage-title,
    .link-button,
    input {
      font-family: "Do Hyeon", sans-serif;
    }
  }
  &.font-gowun-dodum {
    .mypage-title,
    .link-button,
    input {
      font-family: "Gowun Dodum", sans-serif;
    }
  }
  &.font-hi-melody {
    .mypage-title,
    .link-button,
    input {
      font-family: "Hi Melody", sans-serif;
    }
  }
  &.font-jua {
    .mypage-title,
    .link-button,
    input {
      font-family: "Jua", sans-serif;
    }
  }
  // MyPage.jsx 관련
  &.mypage-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
  }
  &.mypage-container-dark {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: black;
    .mypage-header {
      background-color: #808080;
      .backBtn {
        svg {
          path {
            fill: #eee;
          }
        }
      }
      .mypage-title {
        color: #eee;
      }
    }
    .link-container {
      color: #aaa;
    }
    .linkBox:nth-child(1) {
      border-top: 1px solid #aaa;
    }
    .linkBox {
      border-bottom: 1px solid #aaa;
      .link-button {
        color: #aaa;
      }
      &:hover {
        color: #eee;
      }
      &:hover .link-button {
        color: #eee;
      }
    }
  }

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
    display: flex;
    align-items: center;
  }
  .link-container {
    padding: 40px 20px 0 20px;
    box-sizing: border-box;
    color: #777;
  }
  .linkBox:nth-child(1) {
    border-top: 1px solid #777;
  }
  .linkBox {
    display: flex;
    justify-content: center;
    align-items: center;
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
    .theme-toggle {
      position: relative;
      display: inline-block;
      width: 80px;
      height: 30px;
      input {
        opacity: 0;
        width: 0;
        height: 0;
      }
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 30px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 22px;
      width: 22px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
    }
    input:checked + .slider {
      background-color: #aaa;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #aaa;
    }
    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  }
  .box3 {
    cursor: default;
    .link-button {
      cursor: default;
    }
  }

  // profile 관련
  &.phone-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  &.phone-container-dark {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: black;
    .profile-header {
      background-color: #808080;
      .backBtn {
        svg {
          path {
            fill: #eee;
          }
        }
      }
      .mypage-title {
        color: #eee;
      }
    }
    input {
      background-color: black;
      color: #eee;
      border-bottom: 2px solid #aaa;
    }
    .profile-input:focus {
      border-bottom: 2px solid #eee;
    }
    .messageOn {
      color: #eee;
    }
    .submitBtn {
      color: #333;
      background-color: #eee;
      &:hover {
        background-color: #aaa;
      }
      &:disabled {
        background-color: #aaa;
      }
    }
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
    display: block;
  }

  .inputBox-invisible {
    position: relative;
    display: none;
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
    background-color: #aaa;
    border: 0;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    position: absolute;
    left: 0;
    bottom: 20px;
    &:hover {
      background-color: #777;
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
  &.font-container-dark {
    width: 100%;
    background-color: white;
    position: relative;
    overflow: hidden;
    background-color: black;
    .font-header {
      background-color: #808080;
      .backBtn {
        svg {
          path {
            fill: #eee;
          }
        }
      }
      .mypage-title {
        color: #eee;
      }
    }
    .font-box {
      position: relative;
      background-color: #444;
      color: #aaa;
      &:hover {
        border: 5px solid #ccc;
        color: #eee;
        p {
          scale: 1.02;
        }
      }
      span {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 1;

        padding: 5px 8px;

        background-color: grey;
        border: 1px solid white;
        border-radius: 6px;

        color: white;
        font-size: 0.75rem;
        font-weight: bold;
      }
    }
    // 스크롤바 보류
    /* ::-webkit-scrollbar-track {
      background-color: #444;
    } */
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
    position: relative;
    background-color: rgb(244, 244, 246);
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0;
    &:hover {
      border: 5px solid #aaa;
      padding: 5px;
      p {
        scale: 1.02;
      }
    }
    &.font-default {
      font-family: "Nanum Gothic", sans-serif;
    }
    &.font-do-hyeon {
      font-family: "Do Hyeon", sans-serif;
    }
    &.font-gowun-dodum {
      font-family: "Gowun Dodum", sans-serif;
    }
    &.font-hi-melody {
      font-family: "Hi Melody", sans-serif;
    }
    &.font-jua {
      font-family: "Jua", sans-serif;
    }
    span {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 1;

      padding: 5px 8px;

      background-color: grey;
      border: 1px solid white;
      border-radius: 6px;

      color: white;
      font-size: 0.75rem;
      font-weight: bold;
    }
  }

  // theme 관련
  .theme-box {
    background-color: rgb(244, 244, 246);
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
  &.banner-container-dark {
    width: 100%;
    background-color: black;
    position: relative;
    overflow: hidden;
    .banner-header {
      background-color: #808080;
      .backBtn {
        svg {
          path {
            fill: #eee;
          }
        }
      }
      .mypage-title {
        color: #eee;
      }
    }
    .banner-box {
      position: relative;
      border: 5px solid #808080;
      img {
        border-radius: 0;
        /* scale: 1.2; */
      }
      &:hover {
        border: 7px solid #eee;
      }
      span {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 1;

        padding: 5px 8px;

        background-color: grey;
        border: 1px solid white;
        border-radius: 6px;

        color: white;
        font-size: 0.75rem;
        font-weight: bold;
      }
    }
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
    position: relative;
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
    span {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 1;

      padding: 5px 8px;

      background-color: grey;
      border: 1px solid white;
      border-radius: 6px;

      color: white;
      font-size: 0.75rem;
      font-weight: bold;
    }
  }
`;
