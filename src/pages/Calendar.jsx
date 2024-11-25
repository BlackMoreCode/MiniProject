import React, { useState } from "react";
import styled from "styled-components";
import CalendarGrid from "../components/CalendarGrid";
import Modal from "../components/Modal";

const CalendarWrapper = styled.div`
  text-align: center;
  color: white;
  background-color: #121212;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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

const EventListWrapper = styled.div`
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 8px;
  margin: 10px;
`;

const EventItem = styled.div`
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

const AddButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 30px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [modalData, setModalData] = useState(null);

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    setModalData({ date: selectedDate, event: null });
  };

  const handleEditEvent = (event) => {
    setModalData({ date: selectedDate, event });
  };

  const handleSaveEvent = (event) => {
    const dateKey = event.date.toDateString();
    setEvents((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey]
        ? prev[dateKey].map((e) => (e.id === event.id ? event : e)) // 아이디가 동일하다면 내용만 변경
        : [event], // 새로운 아이디 = 새로운 이벤트 추가
    }));
    setModalData(null);
  };

  const handleDeleteEvent = (eventToDelete) => {
    const dateKey = eventToDelete.date.toDateString();
    setEvents((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((event) => event !== eventToDelete),
    }));
    setModalData(null);
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const selectedDateEvents = selectedDate
    ? events[selectedDate.toDateString()] || []
    : [];

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
        <EventListWrapper>
          <h3>Events on {selectedDate.toDateString()}</h3>
          {selectedDateEvents.map((event, index) => (
            <EventItem key={index} onClick={() => handleEditEvent(event)}>
              <span>
                {event.time.start} - {event.title}
              </span>
            </EventItem>
          ))}
        </EventListWrapper>
      )}
      <AddButton onClick={handleAddEvent}>+</AddButton>
      {modalData && (
        <Modal
          data={modalData}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          closeModal={() => setModalData(null)}
        />
      )}
    </CalendarWrapper>
  );
};

export default Calendar;
