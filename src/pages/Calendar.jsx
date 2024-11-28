import React, { useState } from "react";
import styled from "styled-components";
import CalendarGrid from "../components/CalendarGrid";
import Modal from "../components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    if (selectedDate) {
      setModalData({ date: selectedDate, event: null });
    } else {
      toast.warn("요일을 먼저 골라주세요!");
    }
  };

  const handleEditEvent = (event) => {
    setModalData({ date: selectedDate, event });
  };

  const handleSaveEvent = (event) => {
    const dateKey = event.date.toDateString();
    setEvents((prev) => {
      // 해당 날짜에 이벤트가 존재한다면
      if (prev[dateKey]) {
        // ID 체크해서 이벤트가 이미 있나 확인
        const existingEventIndex = prev[dateKey].findIndex(
          (e) => e.id === event.id
        );
        if (existingEventIndex !== -1) {
          // 이미 존재하는 것이라면 업데이트
          const updatedEvents = [...prev[dateKey]];
          updatedEvents[existingEventIndex] = event;
          return { ...prev, [dateKey]: updatedEvents };
        }
        // 아닐 시 새로운 이벤트 추가
        return { ...prev, [dateKey]: [...prev[dateKey], event] };
      }
      //해당 날짜에 이벤트가 없다면 리스트 추가
      return { ...prev, [dateKey]: [event] };
    });
    // Save alarms
    if (event.alarmTimes) {
      scheduleAlarms(event);
    }

    setModalData(null); // 모달 닫기.
  };

  const handleDeleteEvent = (eventToDelete) => {
    const dateKey = eventToDelete.date.toDateString();
    setEvents((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((event) => event.id !== eventToDelete.id),
    }));

    setModalData(null);
  };

  // 알람 스케쥴
  const scheduleAlarms = (event) => {
    const now = Date.now();
    event.alarmTimes.forEach((alarmTime) => {
      const alarmTimestamp =
        new Date(event.date).getTime() + parseInt(alarmTime) * 60000;

      if (alarmTimestamp > now) {
        const delay = alarmTimestamp - now;
        setTimeout(() => {
          toast(`Reminder for "${event.title}"!`);
        }, delay);
      }
    });
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
      <CalendarGrid
        date={currentDate}
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
        events={events}
      />
      {selectedDate && (
        <EventListWrapper>
          <h3>Events on {selectedDate.toDateString()}</h3>
          {selectedDateEvents.map((event, index) => (
            <EventItem key={index} onClick={() => handleEditEvent(event)}>
              <span>
                {event.isAllDay
                  ? "All Day"
                  : `${event.time.start} - ${event.time.end}`}{" "}
                | {event.title} (Importance: {event.importance})
              </span>
            </EventItem>
          ))}
        </EventListWrapper>
      )}
      <AddButton onClick={handleAddEvent}>+</AddButton>
      {console.log}
      {modalData && (
        <Modal
          data={modalData}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          closeModal={() => setModalData(null)}
        />
      )}
      <ToastContainer />
    </CalendarWrapper>
  );
};

export default Calendar;
