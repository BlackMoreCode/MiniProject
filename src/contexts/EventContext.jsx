import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState({});

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const scheduleAlarms = (event) => {
    const now = Date.now();
    //  단일이 아닌 몇일 지속 이벤트에 대한 알람의 경우 시작날짜의 시간에 적용
    // 종일 이벤트의 경우. alarmTimes는 일 단위; 시간이 정해져있다면 분 단위

    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    // 종일 이벤트가 아니라면 event.time에 의존해서 정확한 이벤트 시작 시간을 구함.
    const eventStartTimestamp =
      startDate.getTime() +
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
      //alarmTimes는 startDate 이전에는 일 단위 (24시간 = 86400000 밀리초 / millisecond)
      event.alarmTimes.forEach((alarmTime) => {
        const alarmTimestamp = startDate.getTime() - alarmTime * 86400000;
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
      // alarmTimes 시작시간전 분 단위
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

      // 메인 이벤트 스타트 알람 (해당 이벤트 시작시)
      if (eventStartTimestamp > now) {
        const delay = eventStartTimestamp - now;
        setTimeout(() => {
          toast(`리마인더: "${event.title}" 가 시작합니다!`);
          playSound("/zawarudoEnhanced.wav");
        }, delay);
      }
    }
  };

  const addEvent = (event) => {
    const startKey = new Date(event.startDate).toDateString();
    const endKey = new Date(event.endDate).toDateString();
    const newEvents = { ...events };

    // 해당 이벤트가 여러일에 걸쳐 있다 --> 각 날짜의 리스트에 추가.
    let current = new Date(event.startDate);
    while (current <= new Date(event.endDate)) {
      const dateKey = current.toDateString();
      if (!newEvents[dateKey]) {
        newEvents[dateKey] = [];
      }
      // 기존에 없다면 새로운 이벤트 아이디 주기
      const eventId = event.id || Date.now();
      newEvents[dateKey].push({ ...event, id: eventId });
      current.setDate(current.getDate() + 1);
    }

    setEvents(newEvents);
    scheduleAlarms(event);
  };

  const updateEvent = (updatedEvent) => {
    // 날짜 범위 (date range) 나 정한 시간이 바뀌었을 수도 있으므로 이 해당 이벤트 ID의 기존 인스턴스들 먼저 삭제
    const newEvents = {};
    for (const dateKey in events) {
      newEvents[dateKey] = events[dateKey].filter(
        (e) => e.id !== updatedEvent.id
      );
      if (newEvents[dateKey].length === 0) {
        delete newEvents[dateKey];
      }
    }

    // 그 뒤 새로운 버전 업데이트
    let current = new Date(updatedEvent.startDate);
    while (current <= new Date(updatedEvent.endDate)) {
      const dateKey = current.toDateString();
      if (!newEvents[dateKey]) newEvents[dateKey] = [];
      newEvents[dateKey].push(updatedEvent);
      current.setDate(current.getDate() + 1);
    }

    setEvents(newEvents);
    scheduleAlarms(updatedEvent);
  };

  const deleteEvent = (event) => {
    // 등록된 날짜들로서부터 이벤트 제거
    const newEvents = { ...events };
    for (const dateKey in newEvents) {
      newEvents[dateKey] = newEvents[dateKey].filter((e) => e.id !== event.id);
      if (newEvents[dateKey].length === 0) {
        delete newEvents[dateKey];
      }
    }

    setEvents(newEvents);
  };

  return (
    <EventContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
