import React, { useState } from "react";
import styled from "styled-components";
import CalendarGrid from "../components/CalendarGrid";
import Modal from "../components/Modal";

const CalendarWrapper = styled.div`
  text-align: center;
  color: white;
  background-color: #121212;
  min-height: 100vh;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const Button = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({}); // events state 에 현재 이벤트 저장.

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  //   POST /api/events: To save or update an event.
  //   GET /api/events/{date}: To fetch an event for a specific date.
  //   DELETE /api/events/{date}: To delete an event for a specific date.
  // 현재 이벤트 저장은 로컬로 저장. 이거 추후에 SpringBoot 백엔드 처리해줘야한다.
  const handleSaveEvent = (event) => {
    setEvents((prev) => ({
      ...prev,
      [event.date.toDateString()]: event,
    }));
  };

  // 이벤트 제거도 위와 마찬가지다.
  const handleDeleteEvent = (date) => {
    setEvents((prev) => {
      const updatedEvents = { ...prev };
      delete updatedEvents[date.toDateString()];
      return updatedEvents;
    });
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <CalendarWrapper>
      <Navigation>
        <Button onClick={handlePrevMonth}>Previous</Button>
        <h2>
          {monthName} {year}
        </h2>
        <Button onClick={handleNextMonth}>Next</Button>
      </Navigation>
      <CalendarGrid date={currentDate} onDateClick={handleDateClick} />
      {selectedDate && (
        <Modal
          date={selectedDate}
          closeModal={() => setSelectedDate(null)}
          savedEvent={events[selectedDate.toDateString()] || null}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </CalendarWrapper>
  );
};

export default Calendar;
