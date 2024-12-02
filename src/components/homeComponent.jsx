import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Div = styled.div`
  &.phone-container {
    width: 500px;
    height: 100%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
  }

  &.phone-header {
    border: 2px solid red;
    position: relative;
    width: 100%;
    height: 300px;
  }

  &.phone-headerbar {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }

  &.phone-headerRight {
    display: flex;
  }

  &.phone-header-theme {
    display: flex;
    border: 1px solid blue;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  &.phone-header-theme button {
    font-size: 3rem;
    border: none;
    background-color: transparent;
    padding: 0;
  }

  &.diary-container {
    background-color: rgb(225, 235, 255);
    overflow-y: auto;
  }

  &.diary-box {
    background-color: #fff;
    margin: 0 10px;
    border-radius: 10px;
    margin: 10px;
    .diary-date {
      font-size: 24px;
      font-weight: 700;
      margin: 0;
      padding: 10px;
    }
    .diary-title {
      font-size: 16px;
      font-weight: 500;
      margin: 0;
      padding: 0 10px;
    }
    .diary-desc {
      margin: 0;
      padding: 10px;
    }
  }

  &.phone-footer {
    display: flex;
    justify-content: space-around;
    padding: 10px;
  }

  &.menuBox {
    padding: 0 10%;
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
