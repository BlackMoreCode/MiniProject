import styled from "styled-components";

// 라이트 모드 기본 색상 : 하얀색 /  #ffffff
//  박스 등등의 색상 : 옅은 회색 / RGB color (244, 244, 246) = #f0f0ff
// 모달의 색상 : 짙은 회색 /  rgb(0 0 0 / 0.5) #808080
// 다크 버튼 백그라운드 색상: rgb(41 42 45 / var(--tw-bg-opacity))
// 다크 버튼 내부 텍스트 색상: rgb(244 244 246 / var(--tw-text-opacity))
// 마일드 그레이 버튼 백그라운드 색상 : rgb(244 244 246 / var(--tw-bg-opacity))
// 마일드 그레이 버튼 내부 색상 : rgb(102 102 110 / var(--tw-text-opacity))

// :root {
//   --light-background: #ffffff;
//   --box-color: #f0f0ff;
//   --modal-color: rgba(0, 0, 0, 0.5);
//   --dark-button-bg: rgb(41, 42, 45);
//   --dark-button-text: rgb(244, 244, 246);
//   --mild-gray-bg: rgb(244, 244, 246);
//   --mild-gray-text: rgb(102, 102, 110);
// }

export const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Div = styled.div`
  &.phone-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  // font
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

  // dark 모드
  &.phone-container-dark {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .phone-backBtn {
      background-color: #aaa;
      color: black;
      &:hover {
        background-color: #eee;
        transition: ease-in-out 0.3s;
      }
    }
    .phone-headerRight {
      .phone-themeBtn {
        background-color: #aaa;
        color: black;
        &:hover {
          background-color: #eee;
          transition: ease-in-out 0.3s;
        }
      }
      .phone-searchBox {
        background-color: #aaa;
        color: black;
        .searchBtn,
        .closeBtn,
        input {
          color: black;
        }
      }
    }
    .date-sort-container {
      background-color: black;
      color: #eee;
      .date-calendar {
        background-color: #aaa;
        color: black;
        &:hover {
          background-color: #eee;
          transition: ease-in-out 0.3s;
        }
      }
      .phone-sort {
        background-color: #aaa;
        color: black;
        &:hover {
          background-color: #eee;
          transition: ease-in-out 0.3s;
        }
      }
    }
    .diary-container {
      background-color: black;
      .diary-box {
        background-color: #444;
        &:hover {
          padding: 5px;
          border: 5px solid #ccc;
        }
        p {
          color: #aaa;
        }
        &:hover p {
          color: #eee;
        }
      }
    }
    .phone-footer {
      background-color: black;
      button {
        background-color: #aaa;
        color: black;
        &:hover {
          background-color: #eee;
          transition: ease-in-out 0.3s;
        }
      }
    }
  } // dark 모드 끝

  &.phone-header {
    position: relative;
    width: 100%;
    height: 300px;
  }

  &.phone-headerbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }

  .phone-backBtn {
    align-items: center;
    background-color: #494a50;
    border: none;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    padding: 5px;
    color: white;
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
    }
    &:hover {
      background-color: #292a2d;
      transition: ease-in-out 0.3s;
    }
  }

  &.phone-headerLeft {
    display: flex;
    gap: 10px;
  }

  &.phone-headerRight {
    display: flex;
    gap: 10px;
    position: absolute;
    right: 10px;
    .phone-themeBtn {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      border-radius: 50%;
      background-color: #494a50;
      color: white;
      cursor: pointer;
      svg {
        width: 21px;
        height: 21px;
      }
      &:hover {
        background-color: #292a2d;
        transition: ease-in-out 0.3s;
      }
    }
    
    .phone-searchBox {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #494a50;
      padding: 0 3px;
      border-radius: 15px;
      input {
        color: rgb(244, 244, 246);
        width: 100px;
        height: 100%;
        border: none;
        outline: none;
        background-color: transparent;
        font-size: 1em;
        margin-left: 10px;
      }
      .searchBtn {
        color: rgb(244, 244, 246);
        width: 30px;
        height: 30px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        padding: 4px;
        svg {
          width: 22px;
          height: 22px;
        }
        &:hover {
          scale: 1.1;
        }
      }
      .closeBtn {
        color: rgb(244, 244, 246);
        width: 30px;
        height: 30px;
        font-size: 16px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        svg {
          width: 26px;
          height: 26px;
          padding-top: 2px;
        }
        &:hover {
          scale: 1.1;
        }
      }
    }
  }

  &.date-sort-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    /* background-color: rgb(244, 244, 246); // 일기 색이랑 같음 */
    background-color: rgb(255, 255, 255); // 일기 컨테이너 색이랑 같음
    .phone-sort {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2.5px;
      background-color: #494a50;
      color: rgb(244, 244, 246);
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      font-size: 16px;
      &:hover {
        background-color: #292a2d;
        transition: ease-in-out 0.3s;
      }
      cursor: pointer;
      svg {
        width: 25px;
        height: 25px;
      }
    }
  }

  &.phone-theme {
    display: flex;
    align-items: center;
    gap: 10px;
    .date-calendar {
      display: flex;
      justify-content: center;
      align-items: baseline;
      padding: 2.5px 0;
      background-color: #494a50;
      color: rgb(244, 244, 246);
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      font-size: 16px;
      &:hover {
        background-color: #292a2d;
        /* scale: 1.2; */
        transition: ease-in-out 0.3s;
      }
      cursor: pointer;
      svg {
        width: 25px;
        height: 25px;
      }
    }
    .hover-scale {
      transition: transform 0.2s ease-in-out;
      display: inline-block;
      cursor: pointer;
    }
  }

  &.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  &.modal-container.open {
    opacity: 1;
    visibility: visible;
  }

  &.modal-container.close {
    opacity: 0;
    visibility: hidden;
  }

  &.modal-content {
    background: white;
    padding: 12px;
    padding-top: 28px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    position: relative;
  }

  &.modal-container.open .modal-content {
    transform: scale(1);
  }

  .modal-close {
    position: absolute;
    top: 0px;
    right: 12px;
    background: none;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2.5px;
    background-color: #494a50;
    color: rgb(244, 244, 246);
    border: none;
    width: 28px;
    height: 28px;
    font-size: 16px;
    &:hover {
      background-color: #292a2d;
      transition: ease-in-out 0.3s;
    }
    cursor: pointer;
  }

  &.diary-container {
    background-color: #ffffff;
    overflow-y: scroll;
    height: 100%;
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */
  }

  &.diary-container::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }

  &.diary-box {
    display: flex;
    flex-direction: row; /* Align date and content horizontally */
    background-color: #f4f4f6;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    align-items: flex-start; /* Align items at the top */
    gap: 10px; /* Space between date and content */

    &:hover {
      padding: 5px;
      border: 5px solid #aaa;
      /* background-color: #c9c9c9; */
      /* color: white; */
      /* transition: ease-in-out 0.3s; */
    }

    .diary-date {
      font-size: 20px;
      font-weight: 700;
      margin: 0;
      width: 110px; /* Set a fixed width for alignment */
      flex-shrink: 0; /* Prevent shrinking */
      text-align: left; /* Align text to the left */
    }

    .diary-content {
      display: flex;
      flex-direction: column; /* Stack title and description */
      flex: 1; /* Take the remaining space */
      gap: 5px; /* Space between title and description */
      margin-left: 10px; /* Add some margin for better alignment */
    }

    .diary-title {
      font-size: 16px;
      font-weight: 700;
      margin: 0;
    }

    .diary-desc {
      font-size: 16px;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: calc(1.5em * 3);
    }
  }

  &.phone-footer {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    background-color: #ffffff;
  }

  &.menuBox {
    padding: 30px;
    .linkBox button {
      width: 100%;
      height: 50px;
      margin: 15px 0;
      text-align: left;
      padding-left: 15px;
      font-size: 16px;
      font-weight: 500;
    }
    .backBtn {
      margin: 15px 0;
    }
  }
`;

export const Img1 = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

export const RedirectButton = styled.button`
  background-color: #494a50;
  border: 3px solid black;
  color: rgb(244, 244, 246);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #292a2d;
    transition: ease-in-out 0.3s;
  }
`;

export const AddButton = styled.button`
  background-color: #494a50;
  color: rgb(244, 244, 246);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 30px;
  cursor: pointer;

  &:hover {
    background-color: #292a2d;
    transition: ease-in-out 0.3s;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;
