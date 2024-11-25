import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #333;
  padding: 10px;
`;

const DayCell = styled.div`
  padding: 20px;
  background: #222;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #444;
  }
`;

const DayNumber = styled.span`
  color: ${(props) =>
    props.isSunday ? "red" : props.isSaturday ? "blue" : "white"};
`;

const WeekdaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  padding: 10px 0;
  text-align: center;
  color: white;
  font-weight: bold;
`;

const CalendarGrid = ({ date, onDateClick }) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create an array of days to render
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null); // Empty cells for days before the 1st
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <>
      <WeekdaysHeader>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </WeekdaysHeader>
      <GridContainer>
        {days.map((day, index) => (
          <DayCell
            key={index}
            onClick={() => day && onDateClick(new Date(year, month, day))}
          >
            {day && (
              <DayNumber
                isSunday={index % 7 === 0} // Sunday
                isSaturday={index % 7 === 6} // Saturday
              >
                {day}
              </DayNumber>
            )}
          </DayCell>
        ))}
      </GridContainer>
    </>
  );
};

export default CalendarGrid;
