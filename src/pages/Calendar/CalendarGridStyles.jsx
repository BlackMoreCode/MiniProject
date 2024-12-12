import styled from "styled-components";

// 공통 부분
export const EventCount = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #dadadb;
  color: #66666e;
  border-radius: 25%;
  width: 16px;
  height: 16px;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StarIndicator = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  color: gold;
  font-size: 10px;
`;

// 바뀌는 부분들

// 그리드 컨테이너 라이트
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  /* background: #494a50; */
  padding: 10px;
`;

// 그리드 컨테이너 다크
export const GridContainerDark = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #333;
  padding: 10px;
`;

// 각 요일 셀 라이트
export const DayCell = styled.div`
  position: relative;
  padding: 12px;
  padding-top: 24px;
  background: ${(props) =>
    props.isToday ? "##bdbdbd" : props.isSelected ? "#dadadb" : "#f4f4f6"};
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  border: ${(props) =>
    props.isToday
      ? "2px solid black"
      : props.isSelected
      ? "2px solid black"
      : "none"};

  &:hover {
    background: #dadadb;
    transition: ease-in-out 0.1s;
  }
`;

// 각 요일 셀 다크
export const DayCellDark = styled.div`
  position: relative;
  padding: 12px;
  padding-top: 30px;
  background: ${(props) =>
    props.isToday ? "##bdbdbd" : props.isSelected ? "#555" : "#222"};
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  border: ${(props) =>
    props.isToday
      ? "2px solid white"
      : props.isSelected
      ? "2px solid white"
      : "none"};

  &:hover {
    background: #444;
    transition: ease-in-out 0.1s;
  }
`;

// 각 요일 색상 표기 라이트
export const DayNumber = styled.span`
  display: inline-block;
  color: ${(props) =>
    props.isToday
      ? "black"
      : props.isSunday
      ? "red"
      : props.isSaturday
      ? "blue"
      : "black"};
  /* background: ${(props) => (props.isToday ? "white" : "none")};
  padding: ${(props) => (props.isToday ? "5px" : "0")}; */
  border-radius: ${(props) => (props.isToday ? "20%" : "0")};
`;

// 각 요일 색상 표기 다크
export const DayNumberDark = styled.span`
  display: inline-block;
  color: ${(props) =>
    props.isToday
      ? "white"
      : props.isSunday
      ? "red"
      : props.isSaturday
      ? "blue"
      : "white"};
  /* background: ${(props) => (props.isToday ? "white" : "none")};
  padding: ${(props) => (props.isToday ? "5px" : "0")}; */
  border-radius: ${(props) => (props.isToday ? "20%" : "0")};
`;

// 각 요일 (일~토) 표기 라이트
export const WeekdaysHeader = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  padding: 12px 10px;
  text-align: center;
  color: black;
  font-weight: bold;
`;

// 각 요일 (일~토) 표기 다크
export const WeekdaysHeaderDark = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  padding: 12px 10px;
  text-align: center;
  color: white;
  font-weight: bold;
`;
