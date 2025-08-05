// src/pages/FormPage.jsx
import { useState } from "react";
import StudentForm from "./StudentForm";

export default function FormPage() {
  // 假的表單清單
  const formList = [
    {
      id: 1,
      name: "期中考調查表",
      questions: [
        { text: "你喜歡這門課嗎？", type: "shortAnswer" },
        { text: "有準時交作業嗎？", type: "yesNo" },
      ],
    },
    {
      id: 2,
      name: "期末考調查表",
      questions: [
        { text: "你覺得期末考難不難？", type: "shortAnswer" },
        { text: "會推薦這門課嗎？", type: "yesNo" },
      ],
    },
  ];

  // 預設選第一個表單（如果有）
  const [selectedFormId, setSelectedFormId] = useState(formList[0]?.id || null);

  // 找出被選擇的表單
  const selectedForm = formList.find((f) => f.id === selectedFormId);

  const handleSubmit = (answers) => {
    console.log("學生答案", answers);
    alert("送出成功！");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>請選擇要填寫的表單</h1>
      <select
        onChange={(e) => setSelectedFormId(Number(e.target.value))}
        value={selectedFormId || ""}
      >
        <option value="">-- 請選擇 --</option>
        {formList.map((f) => (
          <option key={f.id} value={f.id}>
            {f.name}
          </option>
        ))}
      </select>

      {selectedForm ? (
        <StudentForm form={selectedForm} onSubmit={handleSubmit} />
      ) : (
        <p>尚無表單，或請先從上方下拉選單選擇表單</p>
      )}
    </div>
  );
}
