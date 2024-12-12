import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";

import * as IntegratedStyles from "./CalendarStyles";

import CalendarGrid from "./CalendarGrid";

import Modal from "./CalendarModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [modalData, setModalData] = useState(null);
  const { isDarkMode } = useContext(LoginContext); // Get dark mode context

  const navigate = useNavigate();

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage on changes
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
      // Check if event already exists on this date
      if (prev[dateKey]) {
        const existingEventIndex = prev[dateKey].findIndex(
          (e) => e.id === event.id
        );
        if (existingEventIndex !== -1) {
          // Update existing event
          const updatedEvents = [...prev[dateKey]];
          updatedEvents[existingEventIndex] = event;
          return { ...prev, [dateKey]: updatedEvents };
        }
        // Add new event if it doesn't exist
        return {
          ...prev,
          [dateKey]: [...prev[dateKey], { ...event, checked: false }],
        };
      }
      // If no events exist for this date yet, create a new array
      return { ...prev, [dateKey]: [{ ...event, checked: false }] };
    });

    // Schedule alarms if any
    if (event.alarmTimes) {
      scheduleAlarms(event);
    }

    setModalData(null);
  };

  const handleDeleteEvent = (eventToDelete) => {
    const dateKey = new Date(eventToDelete.date).toDateString();
    setEvents((prev) => {
      const updatedEvents = {
        ...prev,
        [dateKey]: prev[dateKey].filter(
          (event) => event.id !== eventToDelete.id
        ),
      };
      // If no events remain for this date, remove the date key
      if (updatedEvents[dateKey].length === 0) {
        delete updatedEvents[dateKey];
      }

      localStorage.setItem("events", JSON.stringify(updatedEvents));
      return updatedEvents;
    });
    setModalData(null);
  };

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
      // For timed events, alarms before the event start time
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

      // Main event start alarm
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

  // Choose styles based on isDarkMode
  const CalendarWrapper = isDarkMode
    ? IntegratedStyles.CalendarWrapperDark
    : IntegratedStyles.CalendarWrapper;

  const Navigation = IntegratedStyles.Navigation; // Common
  const CheckIndicator = IntegratedStyles.CheckIndicator; // Common

  const Button = isDarkMode
    ? IntegratedStyles.ButtonDark
    : IntegratedStyles.Button;
  const EventListWrapper = isDarkMode
    ? IntegratedStyles.EventListWrapperDark
    : IntegratedStyles.EventListWrapper;
  const EventItem = isDarkMode
    ? IntegratedStyles.EventItemDark
    : IntegratedStyles.EventItem;
  const ButtonContainer = isDarkMode
    ? IntegratedStyles.ButtonContainerDark
    : IntegratedStyles.ButtonContainer;
  const AddButtonBack = isDarkMode
    ? IntegratedStyles.AddButtonBackDark
    : IntegratedStyles.AddButtonBack;
  const AddButton = isDarkMode
    ? IntegratedStyles.AddButtonDark
    : IntegratedStyles.AddButton;

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
          <h3>
            {`${selectedDate.getDate()}일`}{" "}
            {selectedDate.toLocaleDateString("ko-kr", {
              weekday: "long",
            })}{" "}
            이벤트 목록
          </h3>
          {selectedDateEvents.map((event, index) => (
            <EventItem key={index} onClick={() => handleEditEvent(event)}>
              <span>
                {event.isAllDay
                  ? "All Day"
                  : `${event.time.start} - ${event.time.end}`}{" "}
                | {event.title}
              </span>
              {event.importance && "⭐"}
              {event.checked && <CheckIndicator>✔</CheckIndicator>}
            </EventItem>
          ))}
        </EventListWrapper>
      )}

      <ButtonContainer>
        <AddButtonBack onClick={() => navigate("/")}>←</AddButtonBack>
        <AddButton onClick={handleAddEvent}>+</AddButton>
      </ButtonContainer>

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
