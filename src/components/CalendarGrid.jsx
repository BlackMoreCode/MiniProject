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
  position: relative;
  padding: 20px;
  background: ${(props) => (props.isSelected ? "#555" : "#222")};
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  border: ${(props) => (props.isSelected ? "2px solid white" : "none")};

  &:hover {
    background: #444;
  }
`;

const DayNumber = styled.span`
  display: inline-block;
  color: ${(props) =>
    props.isToday
      ? "black"
      : props.isSunday
      ? "red"
      : props.isSaturday
      ? "blue"
      : "white"};
  background: ${(props) => (props.isToday ? "white" : "none")};
  padding: ${(props) => (props.isToday ? "5px" : "0")};
  border-radius: ${(props) => (props.isToday ? "20%" : "0")};
`;

const EventCount = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #007bff;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StarIndicator = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  color: gold;
  font-size: 16px;
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

const CalendarGrid = ({ date, onDateClick, selectedDate, events }) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  // 월의 시작일을 찾기. 0 은 일요일, 1은 월요일.. etc.
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 요일 배열을 만들어서 렌더링.
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null); // 1일 이전의 요일들에는 빈 셀을 넣어주자.
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
        {days.map((day, index) => {
          const cellDate = day ? new Date(year, month, day) : null;
          const isToday =
            cellDate && cellDate.toDateString() === today.toDateString();
          const isSelected =
            cellDate &&
            selectedDate &&
            cellDate.toDateString() === selectedDate.toDateString();

          const eventCount =
            cellDate && events[cellDate.toDateString()]
              ? events[cellDate.toDateString()].length
              : 0;

          // 중요 이벤트인지 체크
          const hasImportantEvent =
            cellDate &&
            events[cellDate.toDateString()]?.some((event) => event.isImportant);

          return (
            <DayCell
              key={index}
              isSelected={isSelected}
              onClick={() => day && onDateClick(cellDate)}
            >
              {day && (
                <>
                  <DayNumber
                    isToday={isToday}
                    isSunday={index % 7 === 0}
                    isSaturday={index % 7 === 6}
                  >
                    {day}
                  </DayNumber>
                  {eventCount > 0 && <EventCount>{eventCount}</EventCount>}
                  {hasImportantEvent && <StarIndicator>★</StarIndicator>}
                </>
              )}
            </DayCell>
          );
        })}
      </GridContainer>
    </>
  );
};

export default CalendarGrid;
