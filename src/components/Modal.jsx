import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
  const [isAllDay, setIsAllDay] = useState(false);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [isImportant, setIsImportant] = useState(false); // Boolean for importance
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    if (data.event) {
      setTitle(data.event.title || "");
      setTime(data.event.time || { start: "", end: "" });
      setIsAllDay(data.event.isAllDay || false);
      setNotes(data.event.notes || "");
      setIsImportant(data.event.isImportant || false); // Load saved importance
      setAlarms(data.event.alarmTimes || []);
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
      time: isAllDay ? null : time,
      isAllDay,
      isImportant, // Save importance as boolean
      notes,
      alarmTimes: alarms,
    };
    onSave(event);
  };

  const toggleAlarm = (value) => {
    setAlarms((prev) =>
      prev.includes(value)
        ? prev.filter((alarm) => alarm !== value)
        : [...prev, value]
    );
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
        <ToggleWrapper>
          <input
            type="checkbox"
            checked={isImportant}
            onChange={() => setIsImportant((prev) => !prev)}
          />
          <ToggleLabel>Mark as Important</ToggleLabel>
        </ToggleWrapper>
        {!isAllDay && (
          <>
            <label>Start Time:</label>
            <Input
              type="time"
              value={time.start}
              onChange={(e) => setTime({ ...time, start: e.target.value })}
            />
            <label>End Time:</label>
            <Input
              type="time"
              value={time.end}
              onChange={(e) => setTime({ ...time, end: e.target.value })}
            />
          </>
        )}
        <label>Notes:</label>
        <TextArea
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes for this event..."
        />
        <label>Alarm Settings:</label>
        <div>
          {[15, 30, 45, 60, 120].map((value) => (
            <label key={value}>
              <input
                type="checkbox"
                checked={alarms.includes(value)}
                onChange={() => toggleAlarm(value)}
              />
              {value} mins before
            </label>
          ))}
        </div>

        <Button onClick={handleSave}>Save</Button>
        {data.event && (
          <Button onClick={() => onDelete(data.event)}>Delete</Button>
        )}
        <Button onClick={closeModal}>Cancel</Button>
      </ModalWrapper>
    </>
  );
};

export default Modal;
