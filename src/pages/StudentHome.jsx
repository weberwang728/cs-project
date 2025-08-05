import { useNavigate } from "react-router-dom";

export default function StudentHome({ username, onLogout }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>學生頁面，歡迎 {username}</h1>

      <button onClick={() => alert("學生點名簽到")} style={{ marginRight: 8 }}>
        點名簽到
      </button>

      <button onClick={() => navigate("/form")} style={{ marginRight: 8 }}>
        填寫表單
      </button>

      <button onClick={() => alert("查看個人資料")} style={{ marginRight: 8 }}>
        查看個人資料
      </button>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={onLogout}
          style={{ backgroundColor: "red", color: "white", padding: "8px 16px" }}
        >
          登出
        </button>
      </div>
    </div>
  );
}
