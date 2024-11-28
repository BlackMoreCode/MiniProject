import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`

export const Div = styled.div`
  &.phone-container {
    width: 500px;
    height: 100%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    padding: 30px;
  }

  &.diary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  border: 1px solid black;
  padding: 0 10%;
  .diary-title {
    width: 100%;
    border: none;
    border-radius: 5px;
    background-color: #ddd;
    padding: 5px;
    font-size: 1em;
    box-sizing: border-box;
  }
  .diary-date {
    width: 100%;
    border: none;
    border-radius: 5px;
    background-color: #ddd;
    padding: 5px;
    font-size: 1.1em;
    box-sizing: border-box;
  }
  .diary-desc {
    width: 100%;
    min-height: 100px;
    border: none;
    border-radius: 5px;
    background-color: #ddd;
    padding: 5px;
    box-sizing: border-box;
    resize: none;
    overflow: auto;
    scrollbar-width: none;
  }
  .diary-coding-header {
    display: flex;
    align-items: center;
  }
  .diary-coding-header button {
    width: 30px;
    height: 30px;
    background-color: transparent;
    border-radius: 10px;
    border: 1px solid rgb(50, 150, 255);
    color: rgb(50, 150, 255);
    &:hover {
      background-color: #eee;
    }
  }
  .diary-coding-header p {
    padding: 0 10px;
  }
  .coding-desc {
    width: 100%;
    min-height: 100px;
    border: none;
    border-radius: 5px;
    background-color: #ddd;
    padding: 5px;
    box-sizing: border-box;
    resize: none;
    overflow: auto;
    scrollbar-width: none;
  }
  .buttonBox {
    display: flex;
    justify-content: space-between;
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
`