import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { extractTimeOnly, formatToSeoulLocal } from "../../util/dateUtils";

const ModalWrapper = styled.div`
  position: fixed;
  display: grid;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #333;
  color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  z-index: 1000;
  .labelFont {
    font-weight: bold;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 95%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  resize: none;
`;

const Button = styled.button`
  background-color: #555;
  color: white;
  border: none;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }

  &:disabled {
    background-color: #777;
    cursor: not-allowed;
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarModal = ({ data, onSave, onDelete, closeModal }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState({ start: "", end: "" });
  const [isAllDay, setIsAllDay] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [description, setDescription] = useState(""); // 기존에 notes라고 썼더니 너무 헷갈려서 백엔드의 description으로 통일처리
  const [importance, setImportance] = useState(false);

  useEffect(() => {
    if (data.event) {
      setTitle(data.event.title || "");
      setTime({
        start: data.event.startDate
          ? extractTimeOnly(data.event.startDate)
          : "",
        end: data.event.startDate ? extractTimeOnly(data.event.endDate) : "",
      });
      setIsAllDay(data.event.isAllDay || false); // isAllDay가 제대로 세팅되게..
      setAlarms(data.event.alarmTimes || []);
      setDescription(data.event.description || ""); // descriptions 이 비어있는, 즉 NULL 값이여도 문제 없이 핸들링
      setImportance(data.event.isImportant || false);

      if (data.event.notifications) {
        const alertTimeList = [];
        data.event.notifications.forEach((noti) => {
          if (data.event.isAllDay) {
            const startDate = new Date(data.event.startDate);
            const alertTime = new Date(noti.alertTime);

            const timeDifference = startDate - alertTime;
            const daysDifference = timeDifference / (1000 * 3600 * 24);

            alertTimeList.push(daysDifference);
          } else {
            const startDate = new Date(data.event.startDate);
            const alertTime = new Date(noti.alertTime);

            const timeDifference = startDate - alertTime;
            const minutesDifference = timeDifference / (1000 * 60);

            alertTimeList.push(minutesDifference);
          }
        });
        setAlarms(alertTimeList);
      }
    }
  }, [data]);

  const toggleAlarm = (value) => {
    setAlarms((prev) =>
      prev.includes(value)
        ? prev.filter((alarm) => alarm !== value)
        : [...prev, value]
    );
  };

  const validateFields = () => {
    if (!title.trim()) {
      toast.error("이벤트 제목이 필요합니다.");
      return false;
    }
    if (!isAllDay && (!time.start || !time.end)) {
      toast.error("시작 및 종료 시간을 선택해주세요.");
      return false;
    }
    if (
      !isAllDay &&
      time.start >= time.end &&
      data.start.toDateString() === data.end.toDateString()
    ) {
      toast.error("시작 시간은 종료 시간보다 빨라야 합니다.");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateFields()) return;

    if (isAllDay) {
      // isAllDay가 true일 때, 0, 1, 2를 제거
      setAlarms((prevAlarms) =>
        prevAlarms.filter((alarm) => ![0, 1, 2].includes(alarm))
      );
    } else {
      // isAllDay가 false일 때, 15, 30, 45, 60, 120을 제거
      setAlarms((prevAlarms) =>
        prevAlarms.filter((alarm) => ![15, 30, 45, 60, 120].includes(alarm))
      );
    }

    const startDateObj = new Date(data.start);
    const endDateObj = new Date(data.end);

    if (!isAllDay && time.start) {
      const [sh, sm] = time.start.split(":");
      startDateObj.setHours(parseInt(sh, 10), parseInt(sm, 10), 0, 0);
    } else {
      startDateObj.setHours(0, 0, 0, 0);
    }

    if (!isAllDay && time.end) {
      const [eh, em] = time.end.split(":");
      endDateObj.setHours(parseInt(eh, 10), parseInt(em, 10), 0, 0);
    } else {
      endDateObj.setHours(23, 59, 59, 999);
    }

    const startDate = formatToSeoulLocal(startDateObj).slice(0, 19); // 'yyyy-MM-dd'T'HH:mm:ss'
    const endDate = formatToSeoulLocal(endDateObj).slice(0, 19); // 'yyyy-MM-dd'T'HH:mm:ss'

    const eventPayload = {
      id: data.event?.id || null,
      startDate,
      endDate,
      title,
      time: isAllDay ? null : time,
      isAllDay,
      alarmTimes: alarms.map((alarm) => {
        if (isAllDay) {
          //  하루 종일 이벤트라면 알람은 일 단위로 전으로
          const alarmDate = new Date(startDateObj);
          alarmDate.setDate(alarmDate.getDate() - alarm);
          return alarmDate;
        } else {
          // 특정 시간대로 정해진 이벤트라면 알람은 시작시간 n분 전으로
          const alarmDate = new Date(startDateObj);
          alarmDate.setMinutes(alarmDate.getMinutes() - alarm);
          return alarmDate;
        }
      }),
      description: description.trim() || "",
      isImportant: importance,
    };

    console.log("Saving event payload:", eventPayload);
    onSave(eventPayload);
  };

  const handleDelete = () => {
    if (data.event) {
      onDelete(data.event);
    }
  };

  return (
    <>
      <Backdrop onClick={closeModal} />
      <ModalWrapper>
        <h2>{data.event ? "이벤트 수정" : "이벤트 추가"}</h2>
        <label>이벤트 제목:</label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="이벤트 제목"
        />
        <ToggleWrapper>
          <input
            type="checkbox"
            checked={isAllDay}
            onChange={() => setIsAllDay((prev) => !prev)}
          />
          <label>하루 종일</label>
        </ToggleWrapper>
        <ToggleWrapper>
          <input
            type="checkbox"
            checked={importance}
            onChange={(e) => setImportance(e.target.checked)}
          />
          <label>중요 이벤트로 설정</label>
        </ToggleWrapper>
        {!isAllDay && (
          <>
            <label className="labelFont">이벤트 시작 시간:</label>
            <Input
              type="time"
              value={time.start || ""}
              onChange={(e) => setTime({ ...time, start: e.target.value })}
            />
            <label className="labelFont">이벤트 종료 시간:</label>
            <Input
              type="time"
              value={time.end || ""}
              onChange={(e) => setTime({ ...time, end: e.target.value })}
            />
          </>
        )}
        <label className="labelFont">알람 설정:</label>
        <TimerWrapper>
          {isAllDay
            ? [0, 1, 2].map((value) => (
                <label key={value}>
                  <input
                    type="checkbox"
                    checked={alarms.includes(value)}
                    onChange={() => toggleAlarm(value)}
                  />
                  {value === 0 ? "당일" : `${value} 일 전`}
                </label>
              ))
            : [15, 30, 45, 60, 120].map((value) => (
                <label key={value}>
                  <input
                    type="checkbox"
                    checked={alarms.includes(value)}
                    onChange={() => toggleAlarm(value)}
                  />
                  {value} 분 전
                </label>
              ))}
        </TimerWrapper>
        <label className="labelFont">메모:</label>
        <TextArea
          rows="4"
          value={description} // Updated to use description
          onChange={(e) => setDescription(e.target.value)} // Updated handler
          placeholder="이 이벤트에 대한 메모를 남겨주세요."
        />

        <Button onClick={handleSave}>저장</Button>
        {data.event && <Button onClick={handleDelete}>삭제</Button>}
        <Button onClick={closeModal}>취소</Button>
      </ModalWrapper>
    </>
  );
};

export default CalendarModal;
