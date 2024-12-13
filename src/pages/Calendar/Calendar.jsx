import React, { useState, useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { EventContext } from "../../contexts/EventContext";
import * as IntegratedStyles from "./CalendarStyles";
import CalendarGrid from "./CalendarGrid";
import Modal from "./CalendarModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 여러일에 걸쳐서 이벤트 등록해주기 위한 범위 선택
  const [selectedRange, setSelectedRange] = useState(null);

  const [modalData, setModalData] = useState(null);
  const { isDarkMode } = useContext(LoginContext);
  const { events, addEvent, updateEvent, deleteEvent } =
    useContext(EventContext);

  const navigate = useNavigate();

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleDateSelection = (range) => {
    // 유저가 같은 범위를 다시 누른다면, 해당 선택을 클리어. 즉 더블 클릭시나 이럴때도 지우려고 도입 시도.
    if (
      selectedRange &&
      selectedRange.start.toDateString() === range.start.toDateString() &&
      selectedRange.end.toDateString() === range.end.toDateString()
    ) {
      setSelectedRange(null);
    } else {
      setSelectedRange(range);
    }
  };

  const handleAddEvent = () => {
    if (selectedRange && selectedRange.start && selectedRange.end) {
      setModalData({
        start: selectedRange.start,
        end: selectedRange.end,
        event: null,
      });
    } else {
      toast.warn("먼저 날짜 범위를 선택해주세요!");
    }
  };

  const handleEditEvent = (event) => {
    console.log("Editing event:", event); // 이 방식으로는 이미 startDate/endDate가 있으니 요정도만. 그리고 로깅으로 체크
    setModalData({ start: event.startDate, end: event.endDate, event });
  };

  const handleSaveEvent = (event) => {
    console.log("Saving event:", event); // 저장되는 이벤트를 보자..
    if (event.id) {
      console.log("Updating event with ID:", event.id); //이벤트를 무슨 id랑 업데이트 하는가..?
      updateEvent(event);
    } else {
      console.log("Adding new event:", event); // 새로 추가되는 이벤트
      addEvent(event);
    }
    setModalData(null);
  };

  const handleDeleteEvent = (eventToDelete) => {
    deleteEvent(eventToDelete);
    setModalData(null);
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const selectedDateEvents =
    selectedRange && selectedRange.start
      ? events[selectedRange.start.toDateString()] || []
      : [];

  const CalendarWrapper = isDarkMode
    ? IntegratedStyles.CalendarWrapperDark
    : IntegratedStyles.CalendarWrapper;

  const Navigation = IntegratedStyles.Navigation;
  const CheckIndicator = IntegratedStyles.CheckIndicator;
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
        onDateRangeSelect={handleDateSelection}
        selectedRange={selectedRange}
        events={events}
      />

      {selectedRange && selectedRange.start && (
        <EventListWrapper>
          <h3>
            {`${selectedRange.start.getDate()}일`}{" "}
            {selectedRange.start.toLocaleDateString("ko-kr", {
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
