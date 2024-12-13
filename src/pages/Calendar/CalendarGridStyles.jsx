// CalendarGridStyles.jsx
import styled from "styled-components";

// Common Styles
export const EventCount = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #dadadb;
  color: #66666e;
  border-radius: 50%; /* Changed from 25% to 50% for perfect circle */
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

// Changing Parts

// Grid Container Light
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  padding: 10px;
`;

// Grid Container Dark
export const GridContainerDark = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #333;
  padding: 10px;
`;

// Day Cell Light
export const DayCell = styled.div`
  position: relative;
  padding: 12px;
  padding-top: 24px;
  background: ${({ $isToday, $isSelected }) =>
    $isToday ? "#bdbdbd" : $isSelected ? "#dadadb" : "#f4f4f6"};
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  border: ${({ $isToday, $isSelected }) =>
    $isToday || $isSelected ? "2px solid black" : "none"};

  &:hover {
    background: #dadadb;
    transition: ease-in-out 0.1s;
  }
`;

// Day Cell Dark
export const DayCellDark = styled.div`
  position: relative;
  padding: 12px;
  padding-top: 30px;
  background: ${({ $isToday, $isSelected }) =>
    $isToday ? "#bdbdbd" : $isSelected ? "#555" : "#222"};
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  border: ${({ $isToday, $isSelected }) =>
    $isToday || $isSelected ? "2px solid white" : "none"};

  &:hover {
    background: #444;
    transition: ease-in-out 0.1s;
  }
`;

// Day Number Light
export const DayNumber = styled.span`
  display: inline-block;
  color: ${({ $isSunday, $isSaturday }) =>
    $isSunday ? "red" : $isSaturday ? "blue" : "black"};
  border-radius: ${({ $isToday }) => ($isToday ? "20%" : "0")};
`;

// Day Number Dark
export const DayNumberDark = styled.span`
  display: inline-block;
  color: ${({ $isSunday, $isSaturday }) =>
    $isSunday ? "red" : $isSaturday ? "blue" : "white"};
  border-radius: ${({ $isToday }) => ($isToday ? "20%" : "0")};
`;

// Weekdays Header Light
export const WeekdaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  padding: 12px 10px;
  text-align: center;
  color: black;
  font-weight: bold;
`;

// Weekdays Header Dark
export const WeekdaysHeaderDark = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  padding: 12px 10px;
  text-align: center;
  color: white;
  font-weight: bold;
`;
