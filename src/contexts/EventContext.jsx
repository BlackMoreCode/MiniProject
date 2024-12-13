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
          // Log the raw schedules received from the backend
          console.log("Fetched schedules from backend:", response.schedules);

          const fetchedSchedules = response.schedules.map((schedule) => ({
            ...schedule,
            isAllDay: schedule.isAllday, // Map 'isAllday' to 'isAllDay'
            id: schedule.scheduleNum, // Map 'scheduleNum' to 'id' for consistency
            description: schedule.description || "", // Handle null descriptions
          }));

          // Log the mapped schedules to verify 'id' assignment
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

          // Log the new events state
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
    // Fetch schedules for the current month on mount
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString(); // Months are 0-indexed
    fetchSchedules(year, month);
  }, [loggedInMember, fetchSchedules]); // Added 'fetchSchedules' to dependencies

  const scheduleAlarms = (event) => {
    // Alarm scheduling logic (unchanged)
    // ...
  };

  const formatLocalDate = (date) => {
    // Format: YYYY-MM-DDTHH:mm:ss
    return date.toISOString().slice(0, 19);
  };

  const addEvent = async (event) => {
    try {
      // Prepare dates according to timezone handling
      const startDate = event.isAllDay
        ? `${new Date(event.startDate)
            .toLocaleDateString("sv")
            .replace(/-/g, "-")}T00:00:00`
        : formatLocalDate(new Date(event.startDate));

      const endDate = event.isAllDay
        ? `${new Date(event.endDate)
            .toLocaleDateString("sv")
            .replace(/-/g, "-")}T23:59:59`
        : formatLocalDate(new Date(event.endDate));

      const scheduleDto = {
        title: event.title,
        description: event.description,
        startDate,
        endDate,
        isAllday: event.isAllDay, // Map 'isAllDay' to 'isAllday'
        isImportant: event.importance,
        notifications: event.alarmTimes.map((alarmTime) => ({
          alertTime: alarmTime, // Ensure correct format
          alertMethod: "webPush", // Or other methods as per your application
        })),
      };

      // Log the payload being sent to saveSchedule
      console.log("Payload for saveSchedule:", {
        loggedInMember,
        newSchedule: scheduleDto,
      });

      const response = await AxiosApi.saveSchedule({
        loggedInMember,
        newSchedule: scheduleDto,
      });

      // Log the response from saveSchedule
      console.log("Response from saveSchedule:", response);

      if (response.success) {
        toast.success("스케줄이 성공적으로 저장되었습니다.");
        // Fetch schedules after adding to get the updated 'id's
        const year = new Date(event.startDate).getFullYear().toString();
        const month = (new Date(event.startDate).getMonth() + 1).toString();
        await fetchSchedules(year, month); // Ensure this completes before proceeding
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

      // Log the payload being sent to updateSchedule
      console.log("Payload for updateSchedule:", {
        loggedInMember,
        scheduleNum: updatedEvent.id, // Assuming 'id' corresponds to 'scheduleNum'
        updatedSchedule: scheduleDto,
      });

      const response = await AxiosApi.updateSchedule({
        loggedInMember,
        scheduleNum: updatedEvent.id, // Assuming 'id' corresponds to 'scheduleNum'
        updatedSchedule: scheduleDto,
      });

      // Log the response from updateSchedule
      console.log("Response from updateSchedule:", response);

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
      // Log the event to be deleted
      console.log("Attempting to delete event:", eventToDelete);

      if (!eventToDelete.id) {
        toast.error("삭제할 이벤트를 식별할 수 없습니다.");
        return;
      }

      // Exclude sensitive information like password
      const sanitizedLoggedInMember = {
        id: loggedInMember.id,
        // Exclude password or any other sensitive fields
      };

      // Log the payload being sent to deleteSchedule
      console.log("Payload for deleteSchedule:", {
        loggedInMember: sanitizedLoggedInMember,
        scheduleNum: eventToDelete.id,
      });

      const response = await AxiosApi.deleteSchedule({
        loggedInMember: sanitizedLoggedInMember,
        scheduleNum: eventToDelete.id, // Ensure 'scheduleNum' is included
      });

      // Log the response from deleteSchedule
      console.log("Response from deleteSchedule:", response);

      if (response.success) {
        toast.success("스케줄이 성공적으로 삭제되었습니다.");
        // Refetch schedules after deletion
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
        deleteEvent: deleteEventFunc, // Renamed to avoid conflict with internal deleteEvent
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
