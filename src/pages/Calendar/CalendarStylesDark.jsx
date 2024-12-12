import styled from "styled-components";

export const CalendarWrapper = styled.div`
  text-align: center;
  color: white;
  background-color: #121212;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

export const Button = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #444;
    transition: ease-in-out 0.3s;
  }
`;

export const CheckIndicator = styled.span`
  color: green;
  font-size: 18px;
  margin-left: 10px;
`;

export const EventListWrapper = styled.div`
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 8px;
  margin: 10px;
`;

export const EventItem = styled.div`
  background-color: #333;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #444;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 버튼을 ㅜ측으로 */
  gap: 10px; /* 버튼 사이에 공간 주기*/
  padding: 10px;
  background-color: #121212; /* 캘린더와 별개의 백그라운드...인데 필요한가? */
`;

export const AddButtonBack = styled.button`
  background-color: #dadadb;
  color: #66666e;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 30px;
  cursor: pointer;

  &:hover {
    transition: ease-in-out 0.5s;
    background-color: #f4f4f6;
    color: black;
  }
`;

export const AddButton = styled.button`
  background-color: #dadadb;
  color: #66666e;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 30px;
  cursor: pointer;

  &:hover {
    transition: ease-in-out 0.5s;
    background-color: #f4f4f6;
    color: Black;
  }
`;
