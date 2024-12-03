import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

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
`;

export const Form = styled.form`
  padding: 10% 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
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
  .diary-desc {
    width: 100%;
    min-height: 100px;
    border: none;
    border-radius: 5px;
    background-color: #ddd;
    padding: 12px 0;
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
`;

// 태그 관련

export const TagInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export const TagItem = styled.div`
  background: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;

  button {
    background: none;
    color: white;
    border: none;
    margin-left: 5px;
    cursor: pointer;
  }
`;

//Modal 관련

export const ModalOverlay = styled.div`
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
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;
