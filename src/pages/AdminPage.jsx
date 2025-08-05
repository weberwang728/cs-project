import { useEffect, useState } from "react";

function AdminPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // 模擬抓 API
  useEffect(() => {
    async function fetchAttendance() {
      try {
        const res = await fetch("/api/attendance");
        const data = [
        { studentId: "s123", name: "小明", timestamp: "2025-08-06T01:00:00Z", verified: true },
        { studentId: "s456", name: "小美", timestamp: "2025-08-06T02:00:00Z", verified: false },
      ];
        setRecords(data);
      } catch (err) {
        console.error("獲取簽到紀錄失敗：", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAttendance();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">簽到紀錄</h1>
      {loading ? (
        <p>載入中...</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">學生 ID</th>
              <th className="border px-4 py-2">姓名</th>
              <th className="border px-4 py-2">簽到時間</th>
              <th className="border px-4 py-2">驗證結果</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{record.studentId}</td>
                <td className="border px-4 py-2">{record.name}</td>
                <td className="border px-4 py-2">
                  {new Date(record.timestamp).toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  {record.verified ? "✅ 通過" : "❌ 失敗"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPage;
