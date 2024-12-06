import styled from "styled-components";

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

  .phone-menuBtn {
    align-items: center;
    background-color: white;
    border: none;
    border-radius: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    padding: 5px;
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
    }
    path {
      fill: black;
    }
    &:hover {
      scale: 1.2;
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
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      border-radius: 100%;
      background-color: white;
      padding: 2.5px 4px 2.5px 1px;
      cursor: pointer;
      svg {
        width: 25px;
        height: 25px;
        path:nth-child(1) {
          fill: rgb(220, 110, 50);
        }
        path:nth-child(2) {
          fill: yellow;
        }
      }
      &:hover {
        scale: 1.2;
      }
    }
    .phone-searchBox {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      /* border: 1px solid black; */
      padding: 0 3px;
      border-radius: 15px;
      box-sizing: border-box;
      input {
        width: 100px;
        height: 100%;
        border: none;
        outline: none;
        background-color: transparent;
        /* color: white; */
        font-size: 1em;
        margin-left: 10px;
      }
      .searchBtn {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: transparent;
        cursor: pointer;
        svg {
          width: 70%;
          height: 70%;
        }
        &:hover {
          scale: 1.2;
        }
      }
      .closeBtn {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* color: white; */
        font-size: 1rem;
        padding-left: 5px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        svg {
          display: flex;
          width: 21px;
          height: 21px;
        }
        &:hover {
          scale: 1.2;
        }
      }
    }
    .phone-sort {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      border-radius: 50%;
      background-color: white;
      padding: 2.5px;
      cursor: pointer;
      svg {
        width: 25px;
        height: 25px;
      }
      &:hover {
        scale: 1.2;
      }
    }
  }

  &.phone-theme {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  &.phone-theme button {
    font-size: 3rem;
    border: none;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    &:hover {
      color: #555;
    }
  }

  &.diary-container {
    background-color: rgb(225, 235, 255);
    overflow-y: auto;
    height: 100%;
  }

  &.diary-box {
    background-color: #fff;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    &:hover {
      padding: 5px;
      border: 5px solid skyblue;
    }
    .diary-date {
      font-size: 24px;
      font-weight: 700;
      margin: 0;
      border-radius: 10px;
    }
    .diary-title {
      font-size: 20px;
      font-weight: 500;
      margin: 0;
    }
    .diary-desc {
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 1; /* 최대 3줄로 제한 */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: calc(1.5em * 3); /* 3줄까지만 높이 제한 */
    }
  }

  &.phone-footer {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    background-color: rgb(225, 235, 255);
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const AddButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 30px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
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
