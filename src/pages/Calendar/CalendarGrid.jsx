import React, { useContext, useState } from "react";
import { DiarySettingContext } from "../../contexts/DiarySettingContext";
import * as Styles from "./CalendarGridStyles";

const CalendarGrid = ({ date, onDateRangeSelect, selectedRange, events }) => {
  // DiarySettingContext를 사용하여 테마 설정 가져오기 (다크 모드 여부 확인)
  const { diarySetting } = useContext(DiarySettingContext);
  const isDarkMode = diarySetting.theme === "dark";

  // 드래그를 통한 날짜 선택 관련 상태
  const [isSelecting, setIsSelecting] = useState(false); // 드래그 중인지 확인
  const [selectionStart, setSelectionStart] = useState(null); // 드래그 시작 날짜
  const [selectionEnd, setSelectionEnd] = useState(null); // 드래그 종료 날짜

  // 현재 연도와 월 가져오기
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  // 해당 월의 첫 번째 날과 총 일수 계산
  const firstDay = new Date(year, month, 1).getDay(); // 첫 번째 날의 요일
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 해당 월의 총 일수

  // 캘린더에 표시할 날짜 배열 생성
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null); // 공백으로 시작하는 빈 칸 추가
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i); // 실제 날짜 추가
  }

  // 다크 모드와 라이트 모드에 따라 스타일 결정
  const WeekdaysHeader = isDarkMode
    ? Styles.WeekdaysHeaderDark
    : Styles.WeekdaysHeader;
  const GridContainer = isDarkMode
    ? Styles.GridContainerDark
    : Styles.GridContainer;
  const DayCell = isDarkMode ? Styles.DayCellDark : Styles.DayCell;
  const DayNumber = isDarkMode ? Styles.DayNumberDark : Styles.DayNumber;

  // 드래그 시작 시 호출 (마우스 다운 이벤트)
  const handleMouseDown = (cellDate) => {
    if (!cellDate) return; // 빈 칸 클릭 시 무시
    setIsSelecting(true); // 드래그 시작 상태로 전환
    setSelectionStart(cellDate); // 드래그 시작 날짜 설정
    setSelectionEnd(cellDate); // 초기 종료 날짜를 시작 날짜와 동일하게 설정
  };

  // 드래그 중에 호출 (마우스 이동 이벤트)
  const handleMouseEnter = (cellDate) => {
    if (isSelecting && cellDate) {
      setSelectionEnd(cellDate); // 드래그 중인 동안 종료 날짜를 업데이트
    }
  };

  // 드래그 종료 시 호출 (마우스 업 이벤트)
  const handleMouseUp = () => {
    setIsSelecting(false); // 드래그 상태 종료
    if (selectionStart && selectionEnd) {
      const start =
        selectionStart < selectionEnd ? selectionStart : selectionEnd; // 드래그 시작 날짜와 종료 날짜 비교
      const end = selectionStart < selectionEnd ? selectionEnd : selectionStart;
      onDateRangeSelect({ start, end }); // 선택된 날짜 범위를 부모 컴포넌트로 전달
    }
  };

  // 선택된 범위에 포함된 날짜인지 확인
  const isInSelectedRange = (cellDate) => {
    if (!selectedRange || !cellDate) return false;
    return cellDate >= selectedRange.start && cellDate <= selectedRange.end;
  };

  // 드래그 중 선택된 날짜인지 확인
  const isInDragSelection = (cellDate) => {
    if (!isSelecting || !selectionStart || !selectionEnd || !cellDate)
      return false;
    const start = selectionStart < selectionEnd ? selectionStart : selectionEnd;
    const end = selectionStart < selectionEnd ? selectionEnd : selectionStart;
    return cellDate >= start && cellDate <= end;
  };

  return (
    <>
      {/* 요일 헤더 */}
      <WeekdaysHeader>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </WeekdaysHeader>

      {/* 캘린더 그리드 */}
      <GridContainer
        onMouseUp={handleMouseUp} // 마우스 업 이벤트 처리
        onMouseLeave={() => isSelecting && handleMouseUp()} // 마우스가 그리드 밖으로 나갈 때 처리
      >
        {days.map((day, index) => {
          // 해당 날짜 계산
          const cellDate = day ? new Date(year, month, day) : null;
          const isToday =
            cellDate && cellDate.toDateString() === today.toDateString(); // 오늘 날짜인지 확인

          // 해당 날짜에 연결된 이벤트 가져오기
          const eventsForDay =
            cellDate && events[cellDate.toDateString()]
              ? events[cellDate.toDateString()]
              : [];

          const eventCount = eventsForDay.length; // 해당 날짜의 이벤트 개수
          const hasImportantEvent = eventsForDay.some(
            (event) => event.isImportant // 중요한 이벤트가 있는지 확인
          );

          // 현재 날짜가 선택된 범위에 포함되었는지 확인
          const isInSelection =
            isInSelectedRange(cellDate) || isInDragSelection(cellDate);

          // 주말 여부 확인
          const isSunday = index % 7 === 0;
          const isSaturday = index % 7 === 6;

          return (
            <DayCell
              key={index}
              $isToday={isToday} // 스타일을 위한 props
              $isSelected={isInSelection} // 선택된 상태인지 여부
              onMouseDown={() => handleMouseDown(cellDate)} // 드래그 시작
              onMouseEnter={() => handleMouseEnter(cellDate)} // 드래그 중
            >
              {day && (
                <>
                  {/* 날짜 번호 */}
                  <DayNumber $isSunday={isSunday} $isSaturday={isSaturday}>
                    {day}
                  </DayNumber>
                  {/* 이벤트 개수 표시 */}
                  {eventCount > 0 && (
                    <Styles.EventCount>{eventCount}</Styles.EventCount>
                  )}
                  {/* 중요한 이벤트 표시 */}
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
