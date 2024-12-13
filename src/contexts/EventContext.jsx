import React, { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import AxiosApi from "../api/AxiosApi";
import { LoginContext } from "../contexts/LoginContext";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState({});
  const { loggedInMember } = useContext(LoginContext);

  const fetchSchedules = async (year, month) => {
    try {
      const response = await AxiosApi.getMonthlySchedules({
        loggedInMember,
        year,
        month,
      });
      if (response.success) {
        const fetchedSchedules = response.schedules; // 백엔드 응답에 따라서 수정해야함
        const newEvents = {};

        fetchedSchedules.forEach((schedule) => {
          const dateKey = new Date(schedule.startDate).toDateString();
          if (!newEvents[dateKey]) {
            newEvents[dateKey] = [];
          }
          newEvents[dateKey].push(schedule);
        });

        setEvents(newEvents);
      } else {
        toast.error("스케줄을 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
      toast.error("스케줄을 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    // Fetch schedules for the current month on mount
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString(); // Months are 0-indexed
    fetchSchedules(year, month);
  }, [loggedInMember]); // Re-fetch if loggedInMember changes

  const scheduleAlarms = (event) => {
    const now = Date.now();

    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

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

  const addEvent = async (event) => {
    console.log("Adding event:", event); // Log the event before processing
    try {
      // alartTimes을 notifications으로 전환
      const notifications = event.alarmTimes.map((alarmTime) => {
        const eventStart = new Date(event.startDate);
        const alarmTimestamp = event.isAllDay
          ? eventStart.getTime() - alarmTime * 86400000
          : eventStart.getTime() - alarmTime * 60000;
        const alertTime = new Date(alarmTimestamp).toISOString().slice(0, 19);
        return {
          alertTime,
          alertMethod: "webPush",
        };
      });

      const scheduleDto = {
        title: event.title,
        description: event.description,
        startDate: new Date(event.startDate).toISOString().slice(0, 19),
        endDate: new Date(event.endDate).toISOString().slice(0, 19),
        isAllday: event.isAllDay,
        isImportant: event.isImportant,
        notifications,
      };

      const response = await AxiosApi.saveSchedule({
        loggedInMember,
        newSchedule: scheduleDto,
      });

      if (response.success) {
        toast.success("스케줄이 성공적으로 저장되었습니다.");
        // Refetch schedules after adding
        const year = new Date(event.startDate).getFullYear().toString();
        const month = (new Date(event.startDate).getMonth() + 1).toString();
        fetchSchedules(year, month);
      } else {
        toast.error("스케줄 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("스케줄을 추가하는 중 오류가 발생했습니다.");
    }
  };

  const updateEvent = async (updatedEvent) => {
    try {
      // Transform alarmTimes into notifications
      const notifications = updatedEvent.alarmTimes.map((alarmTime) => {
        const eventStart = new Date(updatedEvent.startDate);
        const alarmTimestamp = updatedEvent.isAllDay
          ? eventStart.getTime() - alarmTime * 86400000
          : eventStart.getTime() - alarmTime * 60000;
        const alertTime = new Date(alarmTimestamp).toISOString().slice(0, 19);
        return {
          alertTime,
          alertMethod: "webPush",
        };
      });

      const scheduleDto = {
        title: updatedEvent.title,
        description: updatedEvent.description, // Use description instead of notes
        startDate: new Date(updatedEvent.startDate).toISOString().slice(0, 19),
        endDate: new Date(updatedEvent.endDate).toISOString().slice(0, 19),
        isAllday: updatedEvent.isAllDay,
        isImportant: updatedEvent.isImportant,
        notifications,
      };

      const response = await AxiosApi.updateSchedule({
        loggedInMember,
        scheduleNum: updatedEvent.id, // Assuming 'id' corresponds to 'scheduleNum'
        updatedSchedule: scheduleDto,
      });

      if (response.success) {
        toast.success("스케줄이 성공적으로 업데이트되었습니다.");
        // Refetch schedules after updating
        const year = new Date(updatedEvent.startDate).getFullYear().toString();
        const month = (
          new Date(updatedEvent.startDate).getMonth() + 1
        ).toString();
        fetchSchedules(year, month);
      } else {
        toast.error("스케줄 업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("스케줄을 업데이트하는 중 오류가 발생했습니다.");
    }
  };

  const deleteEventFunc = async (eventToDelete) => {
    try {
      const response = await AxiosApi.deleteSchedule({
        loggedInMember,
        scheduleNum: eventToDelete.id, // Assuming 'id' corresponds to 'scheduleNum'
      });

      if (response.success) {
        toast.success("스케줄이 성공적으로 삭제되었습니다.");
        // Refetch schedules after deleting
        const year = new Date(eventToDelete.startDate).getFullYear().toString();
        const month = (
          new Date(eventToDelete.startDate).getMonth() + 1
        ).toString();
        fetchSchedules(year, month);
      } else {
        toast.error("스케줄 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("스케줄을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  const updateEventsState = (fetchedSchedules) => {
    const newEvents = {};
    fetchedSchedules.forEach((schedule) => {
      const dateKey = new Date(schedule.startDate).toDateString();
      if (!newEvents[dateKey]) {
        newEvents[dateKey] = [];
      }
      newEvents[dateKey].push(schedule);
    });
    setEvents(newEvents);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent: deleteEventFunc, // Renamed to avoid conflict with internal deleteEvent
        fetchSchedules, // Expose fetchSchedules if needed elsewhere
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
