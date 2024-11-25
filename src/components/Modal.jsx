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
`;

const Modal = ({ date, closeModal, savedEvent, onSave, onDelete }) => {
  const [time, setTime] = useState({ start: "", end: "" });
  const [notes, setNotes] = useState("");
  const [alarm, setAlarm] = useState("");

  useEffect(() => {
    if (savedEvent) {
      setTime(savedEvent.time || { start: "", end: "" });
      setNotes(savedEvent.notes || "");
      setAlarm(savedEvent.alarm || "");
    }
  }, [savedEvent]);

  const handleSave = () => {
    const event = { date, time, notes, alarm };
    onSave(event);
    closeModal();
  };

  const handleDelete = () => {
    onDelete(date);
    closeModal();
  };

  return (
    <>
      <Backdrop onClick={closeModal} />
      <ModalWrapper>
        <h2>Event on {date.toLocaleDateString()}</h2>
        {savedEvent ? (
          <>
            <p>
              <strong>Start Time:</strong> {savedEvent.time?.start}
            </p>
            <p>
              <strong>End Time:</strong> {savedEvent.time?.end}
            </p>
            <p>
              <strong>Notes:</strong> {savedEvent.notes}
            </p>
            <p>
              <strong>Alarm:</strong> {savedEvent.alarm}
            </p>
            <Button onClick={handleDelete}>Delete Event</Button>
          </>
        ) : (
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
            <label>Notes:</label>
            <TextArea
              rows="4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about the event..."
            />
            <label>Alarm:</label>
            <Input
              type="text"
              placeholder="e.g., 15 mins before"
              value={alarm}
              onChange={(e) => setAlarm(e.target.value)}
            />
            <Button onClick={handleSave}>Save</Button>
          </>
        )}
        <Button onClick={closeModal}>Cancel</Button>
      </ModalWrapper>
    </>
  );
};

export default Modal;
