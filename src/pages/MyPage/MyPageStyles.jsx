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
  &.phone-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  
  // MyPage.jsx 관련
  &.menuBox {
    .linkBox button {
      width: 100%;
      height: 50px;
      margin: 15px 0;
      text-align: left;
      padding-left: 15px;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .backBtn {
    background-color: transparent;
    border: none;
  }

  // Profile 관련
  .profile-header {
    display: flex;
    justify-content: space-between;
  }

  .header-blank {
    width: 30px;
  }

  .profile-form {
    margin-top: 40px;
    height: 100%;
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
    margin-bottom: 20px;
  }

  .profile-input:focus {
    border-bottom: 2px solid #aaa;
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
  }

  .submitBtn:not(:disabled):hover,
  .submitBtn:not(:disabled):active {
    background-color: #0a6dce;
  }
`;



// ModeChange 관련
