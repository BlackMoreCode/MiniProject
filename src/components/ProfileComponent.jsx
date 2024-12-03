import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
`

export const Div = styled.div`
  &.phone-container {
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 30px;
    position: relative;
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
  position: relative;
  margin: 15px 0;
  .buttonBox {
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: fixed;
    bottom: 0;
    margin: 30px 0;
    padding-right: 60px;
  }
  .buttonBox button {
    width: 45%;
    height: 30px;
    border: none;
    border-radius: 10px;
    /* margin: 10px 0; */
    background-color: #ddd;
    &:hover {
      background-color: #eee;
    }
  }
`