// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { toast } from "react-toastify";

// const ModalWrapper = styled.div`
//   position: fixed;
//   display: grid;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background: #333;
//   color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 90%;
//   max-width: 400px;
//   z-index: 1000;
//   .labelFont {
//     font-weight: bold;
//   }
// `;

// const Backdrop = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 999;
// `;

// const Input = styled.input`
//   width: 95%;
//   padding: 10px;
//   margin: 10px 0;
//   border: none;
//   border-radius: 4px;
// `;

// const TextArea = styled.textarea`
//   width: 95%;
//   padding: 10px;
//   margin: 10px 0;
//   border: none;
//   border-radius: 4px;
//   resize: none;
// `;

// const Button = styled.button`
//   background-color: #555;
//   color: white;
//   border: none;
//   padding: 10px;
//   margin-top: 10px;
//   cursor: pointer;

//   &:hover {
//     background-color: #666;
//   }

//   &:disabled {
//     background-color: #777;
//     cursor: not-allowed;
//   }
// `;

// const ToggleWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 10px 0;
// `;

// const TimerWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const Modal = ({ data, onSave, onDelete, closeModal }) => {
//   const [title, setTitle] = useState("");
//   const [time, setTime] = useState({ start: "", end: "" });
//   const [isAllDay, setIsAllDay] = useState(false); // all-day toggle state
//   const [alarms, setAlarms] = useState([]);
//   const [notes, setNotes] = useState("");
//   const [importance, setImportance] = useState(false); // Default importance: false

//   useEffect(() => {
//     if (data.event) {
//       setTitle(data.event.title || "");
//       setTime(data.event.time || { start: "", end: "" });
//       setIsAllDay(data.event.isAllDay || false); // Load all-day state
//       setAlarms(data.event.alarmTimes || []);
//       setNotes(data.event.notes || "");
//       setImportance(data.event.importance || false);
//     }
//   }, [data]);

//   const toggleAlarm = (value) => {
//     setAlarms((prev) =>
//       prev.includes(value)
//         ? prev.filter((alarm) => alarm !== value)
//         : [...prev, value]
//     );
//   };

//   const validateFields = () => {
//     if (!title.trim()) {
//       toast.error("이벤트 제목이 필요합니다.");
//       return false;
//     }
//     if (!isAllDay && (!time.start || !time.end)) {
//       toast.error("시작 및 종료 시간을 선택해주세요.");
//       return false;
//     }
//     if (!isAllDay && time.start >= time.end) {
//       toast.error("시작 시간은 종료 시간보다 빨라야 합니다.");
//       return false;
//     }
//     return true;
//   };

//   const handleSave = () => {
//     if (!validateFields()) return;

//     const event = {
//       id: data.event?.id || new Date().getTime(),
//       date: data.date,
//       title,
//       time: isAllDay ? null : time,
//       isAllDay,
//       alarmTimes: alarms,
//       notes,
//       importance,
//     };
//     onSave(event);
//   };

//   const handleDelete = () => {
//     if (data.event) {
//       onDelete(data.event);
//     }
//   };

//   return (
//     <>
//       <Backdrop onClick={closeModal} />
//       <ModalWrapper>
//         <h2>{data.event ? "이벤트 수정" : "이벤트 추가"}</h2>
//         <label>이벤트 제목:</label>
//         <Input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="이벤트 제목"
//         />
//         <ToggleWrapper>
//           <input
//             type="checkbox"
//             checked={isAllDay}
//             onChange={() => setIsAllDay((prev) => !prev)}
//           />
//           <label>하루 종일</label>
//         </ToggleWrapper>
//         <ToggleWrapper>
//           <input
//             type="checkbox"
//             checked={importance}
//             onChange={(e) => setImportance(e.target.checked)}
//           />
//           <label>중요 이벤트로 설정</label>
//         </ToggleWrapper>
//         {!isAllDay && (
//           <>
//             <label className="labelFont">이벤트 시작 시간:</label>
//             <Input
//               type="time"
//               value={time.start}
//               onChange={(e) => setTime({ ...time, start: e.target.value })}
//             />
//             <label className="labelFont">이벤트 종료 시간:</label>
//             <Input
//               type="time"
//               value={time.end}
//               onChange={(e) => setTime({ ...time, end: e.target.value })}
//             />
//           </>
//         )}
//         <label className="labelFont">알람 설정:</label>
//         <TimerWrapper>
//           {isAllDay
//             ? [0, 1, 2].map((value) => (
//                 <label key={value}>
//                   <input
//                     type="checkbox"
//                     checked={alarms.includes(value)}
//                     onChange={() => toggleAlarm(value)}
//                   />
//                   {value === 0
//                     ? "당일"
//                     : `${value} 일 ${value > 1 ? "" : ""} 전`}
//                 </label>
//               ))
//             : [15, 30, 45, 60, 120].map((value) => (
//                 <label key={value}>
//                   <input
//                     type="checkbox"
//                     checked={alarms.includes(value)}
//                     onChange={() => toggleAlarm(value)}
//                   />
//                   {value} 분 전
//                 </label>
//               ))}
//         </TimerWrapper>
//         <label className="labelFont">메모:</label>
//         <TextArea
//           rows="4"
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//           placeholder="이 이벤트에 대한 메모를 남겨주세요."
//         />

//         <Button onClick={handleSave}>저장</Button>
//         {data.event && <Button onClick={handleDelete}>삭제</Button>}
//         <Button onClick={closeModal}>취소</Button>
//       </ModalWrapper>
//     </>
//   );
// };

// export default Modal;
