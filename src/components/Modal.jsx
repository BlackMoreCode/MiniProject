import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
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
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
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

const ToggleLabel = styled.label`
  margin-left: 10px;
  color: white;
  font-size: 16px;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const Modal = ({ data, onSave, onDelete, closeModal }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState({ start: "", end: "" });
  const [isAllDay, setIsAllDay] = useState(false); // all-day 토글을 위한 새로운 state
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [importance, setImportance] = useState(3); // 중요도는 기본 3으로 시작.
  // const [alarm, setAlarm] = useState("15"); // 유저가 선택 안할시 기본 알림은 15분 전으로

  useEffect(() => {
    if (data.event) {
      setTitle(data.event.title || "");
      setTime(data.event.time || { start: "", end: "" });
      setIsAllDay(data.event.isAllDay || false); // all-day state 불러오기
      setNotes(data.event.notes || "");
      // setAlarm(data.event.alarm || "");
    }
  }, [data]);

  const validateFields = () => {
    if (!title.trim()) {
      setError("이벤트 제목이 필요합니다.");
      return false;
    }

    if (!isAllDay) {
      if (!time.start || !time.end) {
        setError("시작 및 종료 시간을 선택해주세요.");
        return false;
      }

      if (time.start >= time.end) {
        setError("시작 시간은 종료 시간보다 빨라야 합니다.");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleSave = () => {
    if (!validateFields()) return;

    const event = {
      id: data.event?.id || new Date().getTime(),
      date: data.date,
      title,
      time: isAllDay ? null : time, // All-day 이벤트로 클릭시 시간 설정은 NULL 처리.
      isAllDay, // all-day 플래그 포함
      importance, //중요도 포함
      notes,
      // alarm,
    };
    onSave(event);
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
        <h2>{data.event ? "Edit Event" : "Add Event"}</h2>
        <label>Title:</label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
        />
        {error && <ErrorText>{error}</ErrorText>}
        <ToggleWrapper>
          <input
            type="checkbox"
            checked={isAllDay}
            onChange={() => setIsAllDay((prev) => !prev)}
          />
          <ToggleLabel>All Day</ToggleLabel>
        </ToggleWrapper>
        {/* 중요도 선택 부분 */}
        <label>Importance:</label>
        <select
          value={importance}
          onChange={(e) => setImportance(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        {!isAllDay && (
          <>
            <label>시작 시간:</label>
            <Input
              type="time"
              value={time.start}
              onChange={(e) => setTime({ ...time, start: e.target.value })}
            />
            <label>종료 시간:</label>
            <Input
              type="time"
              value={time.end}
              onChange={(e) => setTime({ ...time, end: e.target.value })}
            />
          </>
        )}
        <label>노트:</label>
        <TextArea
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="해당 이벤트에 대한 노트를 작성해주세요."
        />
        {/* 알람 선택 */}
        {/* <label>Alarm Settings:</label>
        <select value={alarm} onChange={(e) => setAlarm(e.target.value)}>
          <option value="15">15분 전</option>
          <option value="30">30분 전</option>
          <option value="45">45분 전</option>
          <option value="60">1시간 전</option>
          <option value="120">2시간 전</option>
          <option value="180">3시간 전</option>
        </select> */}

        <Button onClick={handleSave}>Save</Button>
        {data.event && <Button onClick={handleDelete}>Delete</Button>}
        <Button onClick={closeModal}>Cancel</Button>
      </ModalWrapper>
    </>
  );
};

export default Modal;
