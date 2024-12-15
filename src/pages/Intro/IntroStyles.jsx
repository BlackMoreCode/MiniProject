import styled from "styled-components";

export const IntroContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 100%;
  padding: 20px;

  font-size: 18px;

  * {
    font-family: "Nanum Gothic", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  img {
    width: 55%;
    margin-bottom: 120px;

    transform: translateY(125%);
  }

  button {
    width: 90%;

    padding: 12px 0;

    border: none;
    border-radius: 10px;

    background-color: #e8e8e8;

    color: #505050;
    font-size: 0.75rem;
    font-weight: bold;

    cursor: pointer;
  }

  button:focus,
  button:hover,
  button:active {
    background-color: #d8d8d8;
  }

  button + button {
    margin-top: 20px;
  }
`;
