import { useState } from "react";

function LoginPage({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false); // 登入 / 註冊切換
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [classroom, setClassroom] = useState("");
  const [role, setRole] = useState("student"); // 登入時用
  const [message, setMessage] = useState("");

  // 模擬假資料庫（正式要換成 API）
  const [users, setUsers] = useState([
    { username: "teacher123", password: "1234", role: "teacher" },
    { username: "student123", password: "1234", role: "student" },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("請輸入帳號和密碼");
      return;
    }

    if (isRegister) {
      // 註冊流程
      if (password !== confirmPassword) {
        setMessage("兩次輸入的密碼不一致");
        return;
      }
      if (!name || !grade || !classroom) {
        setMessage("請完整填寫姓名、年級、班級");
        return;
      }

      // 模擬後端會產生隨機 studentCode
      const studentCode = "STU" + Math.floor(100000 + Math.random() * 900000);

      const newUser = { username, password, role: "student", name, grade, classroom, studentCode };
      setUsers([...users, newUser]);

      // 🚀 這裡之後要改成呼叫後端 API，例如：
      // await fetch("/api/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ username, password, name, grade, classroom })
      // });

      setMessage(`註冊成功！您的驗證代碼是：${studentCode}`);
      setIsRegister(false);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      setGrade("");
      setClassroom("");
    } else {
      // 登入流程
      const user = users.find(
        (u) => u.username === username && u.password === password && u.role === role
      );

      if (!user) {
        setMessage("帳號或密碼錯誤，或角色選擇不正確");
        return;
      }

      // 🚀 這裡也要換成呼叫後端 API，例如：
      // const res = await fetch("/api/login", { ... })

      setMessage("");
      onLogin(user); // 傳遞登入使用者資訊
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">{isRegister ? "學生註冊" : "登入"}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-80 bg-white p-6 rounded shadow">
        {/* 帳號 */}
        <input
          type="text"
          placeholder="帳號"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />

        {/* 密碼 */}
        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />

        {/* 註冊時需要多輸入一次確認密碼 */}
        {isRegister && (
          <input
            type="password"
            placeholder="確認密碼"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        )}

        {/* 註冊時才顯示學生資料輸入 */}
        {isRegister && (
          <>
            <input
              type="text"
              placeholder="姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="年級"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="班級"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          </>
        )}

        {/* 登入時才顯示角色選擇 */}
        {!isRegister && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="student">學生</option>
            <option value="teacher">老師</option>
          </select>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isRegister ? "註冊" : "登入"}
        </button>
      </form>

      {message && <p className="mt-4 text-red-600">{message}</p>}

      <button
        onClick={() => {
          setIsRegister(!isRegister);
          setMessage("");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          setName("");
          setGrade("");
          setClassroom("");
        }}
        className="mt-6 text-blue-500 underline"
      >
        {isRegister ? "已有帳號？點此登入" : "還沒帳號？點此註冊"}
      </button>
    </div>
  );
}

export default LoginPage;
