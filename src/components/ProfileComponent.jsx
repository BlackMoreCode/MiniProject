import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`

export const Div = styled.div`
  &.phone-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 30px;
  }

  &.diary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .backBtn {
      width: 30px;
      height: 30px;
      background-color: transparent;
      border: 2px solid black;
      border-radius: 50%;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
  }

  &.diary-header p {
    width: 50%;
    background-color: #ddd;
    padding: 5px;
    text-align: center;
    border-radius: 10px;
  }

  &.diary-header button {
    border: none;
    width: 30px;
    height: 30px;
    background-color: #ddd;
    border-radius: 100%;
  }
`

export const Form = styled.form`
  padding: 10% 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .buttonBox {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .buttonBox button {
    width: 45%;
    height: 30px;
    border: none;
    border-radius: 10px;
    margin: 10px 0;
    background-color: #ddd;
    &:hover {
      background-color: #eee;
    }
  }
  p {
    font-size: 1rem;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    padding: 12px 0;
    margin-bottom: 12px;
    border: none;
    outline: none;
    border-bottom: 2px solid #ddd;
    font-size: 1rem;
  }
  input:focus {
    border-bottom: 2px solid #aaa;
  }
`