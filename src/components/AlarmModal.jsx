import React, { useEffect, useState } from "react";
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

const Button = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: darkred;
  }
`;

const AlarmModal = ({ event, onClose }) => {
  const [audio] = useState(new Audio(event.sound));

  useEffect(() => {
    console.log("알람 모달: 소리 재생"); //디버그용 콘솔
    audio.play().catch((error) => console.error("알람음 재생 에러 : ", error)); //알람음 재생하고 에러 생길시 콘솔 찍기

    return () => {
      console.log("알람 모달 시간 멈추기");
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalWrapper>
        <h2>Reminder for: {event.title}</h2>
        <p>
          {event.isAllDay
            ? "하루 종일로 책정된 이벤트."
            : `${event.time.start}에 시작하고, ${event.time.end}에 종료하는 이벤트`}
        </p>
        <Button onClick={onClose}>알람 닫기</Button>
      </ModalWrapper>
    </>
  );
};

export default AlarmModal;
