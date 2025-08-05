// src/App.jsx
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import TeacherHome from "./pages/TeacherHome";
import StudentHome from "./pages/StudentHome";
import AttendancePage from "./pages/AttendancePage";
import FormPage from "./pages/FormPage";

// 新增兩個表單頁面元件
import TeacherFormEditor from "./pages/TeacherFormEditor";
import StudentForm from "./pages/StudentForm";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // 假的簽到名單資料（測試用）
  const [attendanceList, setAttendanceList] = useState([
    "student1",
    "student2",
    "student3",
  ]);

  // 存老師設定的表單資料，初始為 null（無表單）
  const [form, setForm] = useState(null);

  const handleLogin = (user) => setCurrentUser(user);
  const handleLogout = () => setCurrentUser(null);

  // 尚未登入，顯示登入頁面
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // 登入後依角色顯示不同頁面及路由
  return (
    <Routes>
      {currentUser.role === "teacher" ? (
        <>
          <Route
            path="/teacher"
            element={
              <TeacherHome
                user={currentUser}
                onLogout={handleLogout}
                attendanceList={attendanceList} // 傳入簽到名單
              />
            }
          />
          <Route
            path="/form-editor"
            element={
              <TeacherFormEditor
                form={form}
                onSave={(newForm) => setForm(newForm)}
              />
            }
          />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="*" element={<Navigate to="/teacher" />} />
        </>
      ) : (
        <>
          <Route
            path="/student"
            element={
              <StudentHome
                username={currentUser.username}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/form"
            element={<StudentForm form={form} />}
          />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="*" element={<Navigate to="/student" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
