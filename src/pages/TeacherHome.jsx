export default function TeacherHome({ user, onLogout, attendanceList }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>老師頁面，歡迎 {user.username}</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => alert("查看學生簽到紀錄")} style={{ marginRight: 8 }}>
          查看簽到紀錄
        </button>
        <button onClick={() => alert("管理學生資料")} style={{ marginRight: 8 }}>
          管理學生
        </button>
        <button onClick={() => alert("查看統計報表")} style={{ marginRight: 8 }}>
          統計報表
        </button>

        {/* 新增表單設定按鈕，導向 /form-editor */}
        <button
          onClick={() => window.location.href = "/form-editor"}
          style={{ marginLeft: 20, backgroundColor: "#4CAF50", color: "white", padding: "6px 12px", borderRadius: 4 }}
        >
          表單設定
        </button>
      </div>

      <h2>已簽到學生名單：</h2>
      {attendanceList.length === 0 ? (
        <p>目前沒有學生簽到</p>
      ) : (
        <ul>
          {attendanceList.map((student, index) => (
            <li key={index}>{student}</li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 30 }}>
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
