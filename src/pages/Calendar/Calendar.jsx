import React, { useState, useContext, useEffect } from "react";
import { DiarySettingContext } from "../../contexts/DiarySettingContext";
import { EventContext } from "../../contexts/EventContext";
import * as IntegratedStyles from "./CalendarStyles";
import CalendarGrid from "./CalendarGrid";
import Modal from "./CalendarModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { extractTimeOnly } from "../../util/dateUtils";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 여러일에 걸쳐서 이벤트 등록해주기 위한 범위 선택
  const [selectedRange, setSelectedRange] = useState(null);
  const [modalData, setModalData] = useState(null);

  // Theme setting fetched from DiarySettingContext
  const { diarySetting } = useContext(DiarySettingContext);
  const { events, addEvent, updateEvent, deleteEvent, fetchSchedules } =
    useContext(EventContext);

  const navigate = useNavigate();
  const isDarkMode = diarySetting.theme === "dark";

  useEffect(() => {
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString();
    fetchSchedules(year, month);
  }, [currentDate, fetchSchedules]);

  const handlePrevMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(newDate);
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
    if (selectedRange?.start && selectedRange.end) {
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
    console.log("Editing event:", event);
    setModalData({ start: event.startDate, end: event.endDate, event });
  };

  const handleSaveEvent = (event) => {
    console.log("Saving event:", event);
    if (event.id) {
      console.log("Updating event with ID:", event.id);
      updateEvent(event);
    } else {
      console.log("Adding new event:", event);
      addEvent(event);
    }
    setModalData(null);
  };

  const handleDeleteEvent = (eventToDelete) => {
    if (!eventToDelete.id) {
      toast.error("삭제할 이벤트를 식별할 수 없습니다.");
      return;
    }
    deleteEvent(eventToDelete);
    setModalData(null);
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const selectedDateEvents = selectedRange?.start
    ? events[selectedRange.start.toDateString()] || []
    : [];

  const CalendarWrapper = isDarkMode
    ? IntegratedStyles.CalendarWrapperDark
    : IntegratedStyles.CalendarWrapper;
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
      <IntegratedStyles.Navigation>
        <Button onClick={handlePrevMonth}>이전 달</Button>
        <h2>
          {year} {monthName}
        </h2>
        <Button onClick={handleNextMonth}>다음 달</Button>
      </IntegratedStyles.Navigation>

      <CalendarGrid
        date={currentDate}
        onDateRangeSelect={handleDateSelection}
        selectedRange={selectedRange}
        events={events}
      />

      {selectedRange?.start && (
        <EventListWrapper>
          <h3>
            {`${selectedRange.start.getDate()}일`}{" "}
            {selectedRange.start.toLocaleDateString("ko-kr", {
              weekday: "long",
            })}{" "}
            이벤트 목록
          </h3>
          {/* 방어적 코딩 임시 추가; undefined 객체의 속성에 접근 못하게 */}
          {selectedDateEvents.map((event, index) => (
            <EventItem key={index} onClick={() => handleEditEvent(event)}>
              <span>
                {event.isAllDay
                  ? "All Day"
                  : `${
                      event.startDate
                        ? extractTimeOnly(event.startDate, false)
                        : "시간 정보를 가져오는데 실패했습니다."
                    } - ${
                      event.endDate
                        ? extractTimeOnly(event.endDate, false)
                        : "시간 정보를 가져오는데 실패했습니다."
                    } `}
                | {event.title}
              </span>
              {event.isImportant && "⭐"}
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
