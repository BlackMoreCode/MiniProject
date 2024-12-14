// EventContext.jsx
import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import AxiosApi from "../api/AxiosApi";
import { LoginContext } from "../contexts/LoginContext";
import { formatToSeoulLocal } from "../util/dateUtils";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState({});
  const { loggedInMember } = useContext(LoginContext);

  const fetchSchedules = useCallback(
    async (year, month) => {
      try {
        const response = await AxiosApi.getMonthlySchedules({
          loggedInMember,
          year,
          month,
        });

        if (response.success) {
          console.log("Fetched schedules from backend:", response.schedules);

          const fetchedSchedules = response.schedules.map((schedule) => ({
            ...schedule,
            isAllDay: schedule.isAllday,
            id: schedule.scheduleNum.toString(), // Ensure 'id' is a string
            description: schedule.description || "",
          }));

          console.log("Mapped schedules with 'id':", fetchedSchedules);

          const newEvents = {};
          fetchedSchedules.forEach((schedule) => {
            const dateKey = new Date(schedule.startDate).toDateString();
            if (!newEvents[dateKey]) {
              newEvents[dateKey] = [];
            }
            newEvents[dateKey].push(schedule);
          });

          setEvents(newEvents);

          console.log("Updated events state:", newEvents);
        } else {
          toast.error("스케줄을 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("Error fetching monthly schedules:", error);
        toast.error("스케줄을 불러오는 중 오류가 발생했습니다.");
      }
    },
    [loggedInMember]
  );

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString();
    fetchSchedules(year, month);
  }, [loggedInMember, fetchSchedules]);

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
    try {
      const startDate = event.isAllDay
        ? `${formatToSeoulLocal(new Date(event.startDate)).slice(
            0,
            10
          )}T00:00:00`
        : formatToSeoulLocal(new Date(event.startDate));

      const endDate = event.isAllDay
        ? `${formatToSeoulLocal(new Date(event.endDate)).slice(0, 10)}T23:59:59`
        : formatToSeoulLocal(new Date(event.endDate));

      const scheduleDto = {
        title: event.title,
        description: event.description,
        startDate,
        endDate,
        isAllday: event.isAllDay,
        isImportant: event.isImportant, // Ensure consistent naming
        notifications: event.alarmTimes.map((alarmTime) => ({
          alertTime: formatToSeoulLocal(new Date(alarmTime)), // Ensure alertTime is correctly formatted
          alertMethod: "webPush",
        })),
      };

      console.log("Payload for saveSchedule:", {
        loggedInMember,
        newSchedule: scheduleDto,
      });

      const response = await AxiosApi.saveSchedule({
        loggedInMember,
        newSchedule: scheduleDto,
      });

      console.log("Response from saveSchedule:", response);

      if (response.success) {
        toast.success("스케줄이 성공적으로 저장되었습니다.");
        const year = new Date(event.startDate).getFullYear().toString();
        const month = (new Date(event.startDate).getMonth() + 1).toString();
        await fetchSchedules(year, month);
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
      // 알람 시간도 백엔드 요구인 Asia/Seoul 시간대로
      const notifications = updatedEvent.alarmTimes.map((alarmTime) => {
        const eventStart = new Date(updatedEvent.startDate);
        const alarmDate = new Date(alarmTime);
        const alertTime = formatToSeoulLocal(alarmDate);
        return {
          alertTime,
          alertMethod: "webPush",
        };
      });

      const scheduleDto = {
        title: updatedEvent.title,
        description: updatedEvent.description,
        startDate: formatToSeoulLocal(new Date(updatedEvent.startDate)),
        endDate: formatToSeoulLocal(new Date(updatedEvent.endDate)),
        isAllday: updatedEvent.isAllDay,
        isImportant: updatedEvent.isImportant,
        notifications,
      };

      console.log("Payload for updateSchedule:", {
        loggedInMember,
        scheduleNum: updatedEvent.id,
        updatedSchedule: scheduleDto,
      });

      const response = await AxiosApi.updateSchedule({
        loggedInMember,
        scheduleNum: updatedEvent.id.toString(), // 문자열임을 확실하게
        updatedSchedule: scheduleDto,
      });

      console.log("Response from updateSchedule:", response);

      if (response.success) {
        toast.success("스케줄이 성공적으로 업데이트되었습니다.");
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
      console.log("Attempting to delete event:", eventToDelete);

      if (!eventToDelete.id) {
        toast.error("삭제할 이벤트를 식별할 수 없습니다.");
        return;
      }

      // Use the already available loggedInMember
      console.log("Payload for deleteSchedule:", {
        loggedInMember,
        scheduleNum: eventToDelete.id,
      });

      const response = await AxiosApi.deleteSchedule({
        loggedInMember,
        scheduleNum: eventToDelete.id.toString(),
      });

      console.log("Response from deleteSchedule:", response);

      if (response.success) {
        toast.success("스케줄이 성공적으로 삭제되었습니다.");
        const year = new Date(eventToDelete.startDate).getFullYear().toString();
        const month = (
          new Date(eventToDelete.startDate).getMonth() + 1
        ).toString();
        await fetchSchedules(year, month);
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
    (fetchedSchedules || []).forEach((schedule) => {
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
        fetchSchedules,
        addEvent,
        updateEvent,
        deleteEvent: deleteEventFunc,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
