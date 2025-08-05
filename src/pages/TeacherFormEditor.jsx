import { useState } from "react";

export default function TeacherFormEditor() {
  const [formName, setFormName] = useState("");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("shortAnswer");
  const [questions, setQuestions] = useState([]);
  const [savedForms, setSavedForms] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // 新增題目
  const addQuestion = () => {
    if (!newQuestionText.trim()) {
      alert("請輸入題目");
      return;
    }
    setQuestions([
      ...questions,
      { text: newQuestionText.trim(), type: newQuestionType },
    ]);
    setNewQuestionText("");
  };

  // 編輯題目文字
  const updateQuestionText = (index, newText) => {
    const updated = [...questions];
    updated[index].text = newText;
    setQuestions(updated);
  };

  // 編輯題目類型
  const updateQuestionType = (index, newType) => {
    const updated = [...questions];
    updated[index].type = newType;
    setQuestions(updated);
  };

  // 刪除題目
  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  // 儲存表單
  const saveForm = () => {
    if (!formName.trim()) {
      alert("請輸入表單名稱");
      return;
    }
    if (questions.length === 0) {
      alert("請至少新增一題");
      return;
    }

    if (editingIndex === null) {
      setSavedForms([...savedForms, { name: formName.trim(), questions }]);
    } else {
      const newForms = [...savedForms];
      newForms[editingIndex] = { name: formName.trim(), questions };
      setSavedForms(newForms);
    }

    setFormName("");
    setQuestions([]);
    setEditingIndex(null);
  };

  // 編輯已存表單
  const editForm = (index) => {
    const form = savedForms[index];
    setFormName(form.name);
    setQuestions(form.questions);
    setEditingIndex(index);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>老師表單設定</h1>

      <div style={{ marginBottom: 20 }}>
        <label>
          表單名稱:{" "}
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="輸入表單名稱"
            style={{ width: "300px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="請輸入題目"
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
          style={{ width: "60%", marginRight: 8 }}
        />

        <select
          value={newQuestionType}
          onChange={(e) => setNewQuestionType(e.target.value)}
          style={{ marginRight: 8 }}
        >
          <option value="shortAnswer">簡答題</option>
          <option value="trueFalse">是非題</option>
        </select>

        <button onClick={addQuestion}>新增題目</button>
      </div>

      <h3>題目列表</h3>
      {questions.length === 0 ? (
        <p>尚無題目</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {questions.map((q, i) => (
            <li key={i} style={{ marginBottom: 12, borderBottom: "1px solid #ccc", paddingBottom: 8 }}>
              <input
                type="text"
                value={q.text}
                onChange={(e) => updateQuestionText(i, e.target.value)}
                style={{ width: "60%", marginRight: 8 }}
              />
              <select
                value={q.type}
                onChange={(e) => updateQuestionType(i, e.target.value)}
                style={{ marginRight: 8 }}
              >
                <option value="shortAnswer">簡答題</option>
                <option value="trueFalse">是非題</option>
              </select>
              <button onClick={() => removeQuestion(i)} style={{ color: "red" }}>
                刪除
              </button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={saveForm} style={{ marginTop: 20 }}>
        {editingIndex === null ? "儲存表單" : "更新表單"}
      </button>

      <hr style={{ margin: "30px 0" }} />

      <h2>已儲存的表單列表</h2>
      {savedForms.length === 0 ? (
        <p>尚無表單</p>
      ) : (
        savedForms.map((form, index) => (
          <button
            key={index}
            onClick={() => editForm(index)}
            style={{
              display: "block",
              marginBottom: 8,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            {form.name}
          </button>
        ))
      )}
    </div>
  );
}
