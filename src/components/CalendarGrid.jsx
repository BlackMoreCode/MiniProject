import React from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #333;
  padding: 10px;
`;

const Day = styled.div`
  padding: 20px;
  background: ${(props) => (props.isToday ? "#555" : "#222")};
  color: white;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #444;
  }
`;

const CalendarGrid = ({ onDateClick }) => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <CalendarContainer>
      {days.map((day) => (
        <Day key={day} onClick={() => onDateClick(`2024-11-${day}`)}>
          {day}
        </Day>
      ))}
    </CalendarContainer>
  );
};

export default CalendarGrid;
