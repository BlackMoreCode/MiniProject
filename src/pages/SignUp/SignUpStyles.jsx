import styled from "styled-components";

export const SignUpContents = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;

  padding: 20px;
`;

export const SignUpHeader = styled.header`
  width: 100%;
  height: 30px;
`;

export const SignUpMain = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-top: 40px;

  form {
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;

    margin-top: 40px;
  }

  form > div > div {
    position: relative;
    margin-bottom: 40px;
  }

  form > div > div > p {
    position: absolute;
    right: 0;
    top: 44px;

    font-size: 0.8rem;
    color: red;
  }

  input {
    box-sizing: border-box;

    width: 100%;

    padding: 12px 0;

    border: none;
    outline: none;
    border-bottom: 2px solid #ddd;

    font-size: 1rem;
  }

  input:focus {
    border-bottom: 2px solid #aaa;
  }

  button {
    width: 100%;

    padding: 15px 0;

    background-color: #007bff;

    border: 0;
    border-radius: 10px;

    color: white;
    font-weight: bold;
  }

  button:hover,
  button:active {
    background-color: #0a6dce;
  }

  button:active {
    transform: scale(0.99);
  }
`;
