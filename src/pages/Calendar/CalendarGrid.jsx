import React, { useContext, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import * as Styles from "./CalendarGridStyles";

const CalendarGrid = ({ date, onDateRangeSelect, selectedRange, events }) => {
  const { isDarkMode } = useContext(LoginContext);

  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);

  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const WeekdaysHeader = isDarkMode
    ? Styles.WeekdaysHeaderDark
    : Styles.WeekdaysHeader;
  const GridContainer = isDarkMode
    ? Styles.GridContainerDark
    : Styles.GridContainer;
  const DayCell = isDarkMode ? Styles.DayCellDark : Styles.DayCell;
  const DayNumber = isDarkMode ? Styles.DayNumberDark : Styles.DayNumber;

  const handleMouseDown = (cellDate) => {
    if (!cellDate) return;
    setIsSelecting(true);
    setSelectionStart(cellDate);
    setSelectionEnd(cellDate);
  };

  const handleMouseEnter = (cellDate) => {
    if (isSelecting && cellDate) {
      setSelectionEnd(cellDate);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    if (selectionStart && selectionEnd) {
      const start =
        selectionStart < selectionEnd ? selectionStart : selectionEnd;
      const end = selectionStart < selectionEnd ? selectionEnd : selectionStart;
      onDateRangeSelect({ start, end });
    }
  };

  const isInSelectedRange = (cellDate) => {
    if (!selectedRange || !cellDate) return false;
    return cellDate >= selectedRange.start && cellDate <= selectedRange.end;
  };

  const isInDragSelection = (cellDate) => {
    if (!isSelecting || !selectionStart || !selectionEnd || !cellDate)
      return false;
    const start = selectionStart < selectionEnd ? selectionStart : selectionEnd;
    const end = selectionStart < selectionEnd ? selectionEnd : selectionStart;
    return cellDate >= start && cellDate <= end;
  };

  return (
    <>
      <WeekdaysHeader>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </WeekdaysHeader>
      <GridContainer
        onMouseUp={handleMouseUp}
        onMouseLeave={() => isSelecting && handleMouseUp()}
      >
        {days.map((day, index) => {
          const cellDate = day ? new Date(year, month, day) : null;
          const isToday =
            cellDate && cellDate.toDateString() === today.toDateString();

          const eventsForDay =
            cellDate && events[cellDate.toDateString()]
              ? events[cellDate.toDateString()]
              : [];

          const eventCount = eventsForDay.length;
          const hasImportantEvent = eventsForDay.some(
            (event) => event.importance
          );

          const isInSelection =
            isInSelectedRange(cellDate) || isInDragSelection(cellDate);

          return (
            <DayCell
              key={index}
              isToday={isToday}
              isSelected={isInSelection}
              onMouseDown={() => handleMouseDown(cellDate)}
              onMouseEnter={() => handleMouseEnter(cellDate)}
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
