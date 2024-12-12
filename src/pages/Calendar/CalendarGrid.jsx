import React, { useContext } from "react";
import * as Styles from "./CalendarGridStyles";
import { LoginContext } from "../../contexts/LoginContext";

const CalendarGrid = ({ date, onDateClick, selectedDate, events }) => {
  const { isDarkMode } = useContext(LoginContext);

  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  // 달의 시작 요일 구하기
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 날짜 배열 만들기
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null); // 1일 이전은 빈 칸
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Choose styles based on isDarkMode
  const WeekdaysHeader = isDarkMode
    ? Styles.WeekdaysHeaderDark
    : Styles.WeekdaysHeader;
  const GridContainer = isDarkMode
    ? Styles.GridContainerDark
    : Styles.GridContainer;
  const DayCell = isDarkMode ? Styles.DayCellDark : Styles.DayCell;
  const DayNumber = isDarkMode ? Styles.DayNumberDark : Styles.DayNumber;

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

          const eventsForDay =
            cellDate && events[cellDate.toDateString()]
              ? events[cellDate.toDateString()]
              : [];

          const eventCount = eventsForDay.length;

          // Check if this day has any important events
          const hasImportantEvent = eventsForDay.some(
            (event) => event.importance
          );

          return (
            <DayCell
              key={index}
              isSelected={isSelected}
              isToday={isToday}
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
                  {eventCount > 0 && (
                    <Styles.EventCount>{eventCount}</Styles.EventCount>
                  )}
                  {hasImportantEvent && (
                    <Styles.StarIndicator>★</Styles.StarIndicator>
                  )}
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
