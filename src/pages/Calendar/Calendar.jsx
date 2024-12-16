import React, { useState, useContext, useEffect } from "react";
import { DiarySettingContext } from "../../contexts/DiarySettingContext";
import { EventContext } from "../../contexts/EventContext";
import * as IntegratedStyles from "./CalendarStyles";
import CalendarGrid from "./CalendarGrid";
import Modal from "./CalendarModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { extractTimeOnly, formatDate } from "../../util/dateUtils";

const Calendar = () => {
  // 현재 날짜를 상태로 관리 (현재 보고 있는 달)
  const [currentDate, setCurrentDate] = useState(new Date());

  // 날짜 범위 선택을 위한 상태 관리
  const [selectedRange, setSelectedRange] = useState(null);

  // 모달 창 데이터 (이벤트 추가/수정/삭제 시 사용)
  const [modalData, setModalData] = useState(null);

  // DiarySettingContext에서 테마 설정을 가져옴 (다크 모드 확인용)
  const { diarySetting } = useContext(DiarySettingContext);

  // EventContext에서 이벤트 관련 함수와 데이터 가져오기
  const { events, addEvent, updateEvent, deleteEvent, fetchSchedules } =
    useContext(EventContext);

  const navigate = useNavigate();
  const isDarkMode = diarySetting.theme === "dark";

  // 컴포넌트가 처음 렌더링되거나 currentDate가 변경될 때 이벤트 데이터를 가져옴
  useEffect(() => {
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString();
    fetchSchedules(year, month); // 현재 보고 있는 달의 스케줄 가져오기
  }, [currentDate, fetchSchedules]);

  // 이전 달로 이동하는 핸들러
  const handlePrevMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(newDate); // currentDate를 이전 달로 설정
  };

  // 다음 달로 이동하는 핸들러
  const handleNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(newDate); // currentDate를 다음 달로 설정
  };

  // 날짜 범위를 선택하는 핸들러
  const handleDateSelection = (range) => {
    // 같은 범위를 다시 선택하면 선택을 해제함
    if (
      selectedRange &&
      selectedRange.start.toDateString() === range.start.toDateString() &&
      selectedRange.end.toDateString() === range.end.toDateString()
    ) {
      setSelectedRange(null); // 선택 해제
    } else {
      setSelectedRange(range); // 새로운 범위를 선택
    }
  };

  // 선택된 범위에 새로운 이벤트 추가 (모달 데이터 설정)
  const handleAddEvent = () => {
    if (selectedRange?.start && selectedRange.end) {
      setModalData({
        start: selectedRange.start,
        end: selectedRange.end,
        event: null,
      });
    } else {
      toast.warn("먼저 날짜 범위를 선택해주세요!"); // 선택된 범위가 없으면 경고 메시지 출력
    }
  };

  // 기존 이벤트 수정 (모달 데이터 설정)
  const handleEditEvent = (event) => {
    console.log("Editing event:", event);
    setModalData({ start: event.startDate, end: event.endDate, event });
  };

  // 이벤트 저장 (추가 또는 수정)
  const handleSaveEvent = (event) => {
    console.log("Saving event:", event);
    if (event.id) {
      console.log("Updating event with ID:", event.id);
      updateEvent(event); // 기존 이벤트 업데이트
    } else {
      console.log("Adding new event:", event);
      addEvent(event); // 새로운 이벤트 추가
    }
    setModalData(null); // 모달 닫기
  };

  // 이벤트 삭제
  const handleDeleteEvent = (eventToDelete) => {
    if (!eventToDelete.id) {
      toast.error("삭제할 이벤트를 식별할 수 없습니다."); // 이벤트 ID가 없으면 에러 메시지 출력
      return;
    }
    deleteEvent(eventToDelete); // 이벤트 삭제
    setModalData(null); // 모달 닫기
  };

  // 현재 달과 연도를 가져와 렌더링용 변수 설정
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  // 선택된 범위의 이벤트 목록 가져오기
  const selectedDateEvents = selectedRange?.start
    ? events[selectedRange.start.toDateString()] || []
    : [];

  // 다크 모드와 라이트 모드에 따른 스타일 설정
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
      {/* 네비게이션: 이전 달, 현재 달, 다음 달 이동 */}
      <IntegratedStyles.Navigation>
        <Button onClick={handlePrevMonth}>이전 달</Button>
        <h2>
          {year} {monthName}
        </h2>
        <Button onClick={handleNextMonth}>다음 달</Button>
      </IntegratedStyles.Navigation>
      {/* 캘린더 그리드 렌더링 */}
      <CalendarGrid
        date={currentDate}
        onDateRangeSelect={handleDateSelection} // 날짜 범위 선택 핸들러 전달
        selectedRange={selectedRange} // 현재 선택된 범위
        events={events} // 이벤트 데이터
      />
      {/* 선택된 범위에 해당하는 이벤트 목록 */}
      {selectedRange?.start && (
        <EventListWrapper>
          <h3>
            {`${selectedRange.start.getDate()}일`}{" "}
            {selectedRange.start.toLocaleDateString("ko-kr", {
              weekday: "long",
            })}{" "}
            이벤트 목록
          </h3>
          {/* 방어적 코딩: 이벤트 데이터가 없는 경우 대비 */}
          {selectedDateEvents.map((event, index) => (
            <EventItem key={index} onClick={() => handleEditEvent(event)}>
              <div style={{ flex: 1, textAlign: "left" }}>{event.title}</div>
              <div style={{ textAlign: "right" }}>
                <div>
                  <strong>시작:</strong>{" "}
                  {event.startDate
                    ? `${formatDate(new Date(event.startDate))} ${
                        event.isAllDay
                          ? "하루 종일"
                          : extractTimeOnly(event.startDate, false)
                      }`
                    : "시간 정보를 가져오는데 실패했습니다."}
                </div>
                <div>
                  <strong>종료:</strong>{" "}
                  {event.endDate
                    ? `${formatDate(new Date(event.endDate))} ${
                        event.isAllDay
                          ? "하루 종일"
                          : extractTimeOnly(event.endDate, false)
                      }`
                    : "시간 정보를 가져오는데 실패했습니다."}
                </div>
              </div>
            </EventItem>
          ))}
        </EventListWrapper>
      )}
      {/* 추가/수정/삭제 버튼 */}
      <ButtonContainer>
        <AddButtonBack onClick={() => navigate("/")}>←</AddButtonBack>
        <AddButton onClick={handleAddEvent}>+</AddButton>
      </ButtonContainer>
      {/* 이벤트 추가/수정 모달 */}
      {modalData && (
        <Modal
          data={modalData}
          onSave={handleSaveEvent} // 이벤트 저장 핸들러
          onDelete={handleDeleteEvent} // 이벤트 삭제 핸들러
          closeModal={() => setModalData(null)} // 모달 닫기 핸들러
        />
      )}
      <ToastContainer /> {/* 알림 메시지 출력 */}
    </CalendarWrapper>
  );
};

export default Calendar;
