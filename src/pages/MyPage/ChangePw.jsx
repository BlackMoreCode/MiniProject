
// !!!!!!!!!!!!비밀번호 변경    ----->    프로필 수정으로 옮김!!!!!!!!!!

// import React, { useContext, useState } from "react";
// import AxiosApi from "../../api/AxiosApi";
// import { UserContext } from "../../contexts/UserContext";

// const ChangePw = () => {
//   const { userId } = useContext(UserContext);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");

//   //백엔드로서부터 데이터 받기 위한 프로토타입.
//   const handleChangePassword = async () => {
//     try {
//       const response = await AxiosApi.updatePassword(
//         userId,
//         currentPassword,
//         newPassword
//       );
//       setMessage("비밀번호가 성공적으로 수정되었습니다.");
//     } catch (error) {
//       console.error("Failed to update password:", error);
//       setMessage("비밀번호 수정에 실패하였습니다.");
//     }
//   };

//   return (
//     <div>
//       <h1>비밀번호 변경</h1>
//       <input
//         type="password"
//         placeholder="현재 비밀번호를 입력하세요."
//         value={currentPassword}
//         onChange={(e) => setCurrentPassword(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="새로운 비밀번호를 입력하세요."
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//       />
//       <button onClick={handleChangePassword}>비밀번호 수정</button>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default ChangePw;
