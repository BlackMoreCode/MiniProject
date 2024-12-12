import styled from "styled-components";

export const CalendarWrapper = styled.div`
  text-align: center;
  color: black;
  background-color: white;
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

// 이전/다음 달 관련 버튼
export const Button = styled.button`
  background-color: #494a50;
  color: #e4e4e6;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #292a2d;
    transition: ease-in-out 0.3s;
    color: #f4f4f6;
  }
`;

export const CheckIndicator = styled.span`
  color: white;
  font-size: 18px;
  margin-left: 10px;
`;

// 이벤트 목록
export const EventListWrapper = styled.div`
  padding: 20px;
  background-color: #f4f4f6;
  border-radius: 8px;
  margin: 10px;
  color: black;
  &:hover {
    background-color: #dadadb;
    transition: ease-in-out 0.3s;
  }
`;

// 추가된 개별 이벤트
export const EventItem = styled.div`
  background-color: #292a2d;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #494a50;
    transition: ease-in-out 0.3s;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 버튼을 ㅜ측으로 */
  gap: 10px; /* 버튼 사이에 공간 주기*/
  padding: 10px;
  background-color: white; /* 캘린더와 별개의 백그라운드...인데 필요한가? */
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
