import styled from "styled-components";

export const IntroContents = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 100%;
  padding: 30px 10px;

  font-size: 20px;

  header {
    height: 30px;
  }

  header img {
    cursor: pointer;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;

    margin-top: 20px;
  }

  main > section > div:first-child {
    display: flex;
    align-items: center;
  }

  main > section > div:first-child img {
    height: 120px;
  }

  section + section {
    margin-top: 20px;
  }

  section:nth-child(3) {
    margin-top: 40px;
  }

  section:nth-child(2) > div:first-child {
    justify-content: flex-end;
  }

  section:nth-child(3) > div:first-child {
    flex-direction: column;
    align-items: flex-start;
  }

  nav {
    display: flex;
    flex: 1;
    align-items: end;
  }

  nav > div {
    display: flex;
    justify-content: center;

    width: 100%;
  }

  nav a {
    width: 40%;
    padding: 2px 0;

    background-color: #ddd;

    border-radius: 8px;

    font-size: 14px;
    text-align: center;
  }

  nav a + a {
    margin-left: 20px;
  }
`;
