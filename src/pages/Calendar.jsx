import React, { useState, useEffect } from "react";
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

const CheckIndicator = styled.span`
  color: green;
  font-size: 18px;
  margin-left: 10px;
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

  // 임시코드: localStorage로부 컴포넌트가 마운트될 때 events를 로드
  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // events 상태가 변경될 때 마다 localStorage에 이벤트 저장.
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

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
    const dateKey = new Date(event.date).toDateString();
    setEvents((prev) => {
      const updatedEvents = {
        ...prev,
        [dateKey]: prev[dateKey].map((e) =>
          e.id === event.id ? { ...e, checked: true } : e
        ),
      };
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      return updatedEvents;
    });

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
        // 아닐 시 새로운 이벤트 추가  --> 추가로 이벤트가 확인되었는지 체크하는 로직 추가
        return {
          ...prev,
          [dateKey]: [...prev[dateKey], { ...event, checked: false }],
        };
      }
      //해당 날짜에 이벤트가 없다면 리스트 추가 --> 추가로 이벤트가 확인되었는지 체크하는 로직 추가
      return { ...prev, [dateKey]: [{ ...event, checked: false }] };
    });
    // Save alarms
    if (event.alarmTimes) {
      scheduleAlarms(event);
    }

    setModalData(null); // 모달 닫기.
  };

  const handleDeleteEvent = (eventToDelete) => {
    const dateKey = new Date(eventToDelete.date).toDateString(); // 저장된 date 문자열을 Date 객체 (Date String)로 변환
    setEvents((prev) => {
      const updatedEvents = {
        ...prev,
        [dateKey]: prev[dateKey].filter(
          (event) => event.id !== eventToDelete.id
        ),
      };
      // 더 이상 해당 요일에 이벤트가 없을 시 date 키 삭제
      if (updatedEvents[dateKey].length === 0) {
        delete updatedEvents[dateKey];
      }
      // 업데이트된 이벤트들을 localStorage로 저장
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      return updatedEvents;
    });
    setModalData(null); //  모달 닫기
  };

  // 알람 스케쥴
  const scheduleAlarms = (event) => {
    const now = Date.now();
    const eventStartTimestamp =
      new Date(event.date).getTime() +
      (event.isAllDay
        ? 0
        : parseInt(event.time.start.split(":")[0]) * 3600000 +
          parseInt(event.time.start.split(":")[1]) * 60000);

    const playSound = (soundPath) => {
      const audio = new Audio(soundPath);
      audio.play().catch((error) => {
        toast.error("Error playing alarm sound.");
        console.error(error);
      });
    };

    if (event.isAllDay) {
      event.alarmTimes.forEach((alarmTime) => {
        const alarmTimestamp =
          new Date(event.date).getTime() - alarmTime * 86400000;
        if (alarmTimestamp > now) {
          const delay = alarmTimestamp - now;
          setTimeout(() => {
            toast(
              `All-Day Event Reminder: "${event.title}" - ${
                alarmTime === 0
                  ? "Today!"
                  : `${alarmTime} day${alarmTime > 1 ? "s" : ""} before`
              }`
            );
            playSound("/zawarudoEffect.mp3");
          }, delay);
        }
      });
    } else {
      // 특정 시간대를 알람으로 정했고, 몇분 전~ 알람을 선택했을 시 메인 알람 전에 사전 알람을 제공.
      event.alarmTimes.forEach((alarmTime) => {
        const alarmTimestamp =
          eventStartTimestamp - parseInt(alarmTime) * 60000;
        if (alarmTimestamp > now) {
          const delay = alarmTimestamp - now;
          setTimeout(() => {
            toast(
              `리마인더:  "${event.title}" 이 시작하기 ${alarmTime} 분 전입니다!`
            );
            playSound("/zawarudoEffect.mp3");
          }, delay);
        }
      });

      // 메인 일정 알람.
      if (eventStartTimestamp > now) {
        const delay = eventStartTimestamp - now;
        setTimeout(() => {
          toast(`리마인더: "${event.title}" 가 시작합니다!`);
          playSound("/zawarudoEnhanced.wav");
        }, delay);
      }
    }
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const selectedDateEvents = selectedDate
    ? events[selectedDate.toDateString()] || []
    : [];

  return (
    <CalendarWrapper>
      <Navigation>
        <Button onClick={handlePrevMonth}>이전 달</Button>
        <h2>
          {year} {monthName}
        </h2>
        <Button onClick={handleNextMonth}>다음 달</Button>
      </Navigation>
      <CalendarGrid
        date={currentDate}
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
        events={events}
      />
      {selectedDate && (
        <EventListWrapper>
          <h3>{selectedDate.toDateString()} 이벤트 목록</h3>
          {selectedDateEvents.map((event, index) => (
            <EventItem key={index} onClick={() => handleEditEvent(event)}>
              <span>
                {event.isAllDay
                  ? "All Day"
                  : `${event.time.start} - ${event.time.end}`}{" "}
                | {event.title} {event.importance && "⭐"}
              </span>
              {event.checked && <CheckIndicator>✔</CheckIndicator>}
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
