import { useState } from "react";

function LoginPage({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false); // 登入 / 註冊切換
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // 預設學生
  const [message, setMessage] = useState("");

  // 假資料庫（用 useState 存帳號密碼物件陣列）
  const [users, setUsers] = useState([
    { username: "teacher123", password: "1234", role: "teacher" },
    { username: "student123", password: "1234", role: "student" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("請輸入帳號和密碼");
      return;
    }

    if (isRegister) {
      // 註冊流程
      if (users.find((u) => u.username === username)) {
        setMessage("此帳號已被註冊");
        return;
      }

      // 新增帳號到假資料庫（根據選擇的角色）
      const newUser = { username, password, role };
      setUsers([...users, newUser]);
      setMessage("註冊成功！請登入");
      setIsRegister(false);
      setUsername("");
      setPassword("");
      setRole("student");
    } else {
      // 登入流程
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (!user) {
        setMessage("帳號或密碼錯誤");
        return;
      }

      // 登入成功，傳遞使用者資訊（包含角色）
      onLogin(user);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">{isRegister ? "註冊" : "登入"}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-72">
        <input
          type="text"
          placeholder="帳號"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />

        {/* 註冊時才顯示角色選擇 */}
        {isRegister && (
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
          setRole("student");
        }}
        className="mt-6 text-blue-500 underline"
      >
        {isRegister ? "已有帳號？點此登入" : "還沒帳號？點此註冊"}
      </button>
    </div>
  );
}

export default LoginPage;
