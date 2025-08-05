// src/pages/AttendancePage.jsx
import { useState } from "react";

function AttendancePage() {
  const [signedIn, setSignedIn] = useState(false);

  const handleSignIn = () => {
    setSignedIn(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">點名簽到</h1>
      <p className="mb-4 text-lg">
        簽到狀態：{" "}
        <span className={signedIn ? "text-green-600" : "text-red-600"}>
          {signedIn ? "已簽到" : "尚未簽到"}
        </span>
      </p>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        onClick={handleSignIn}
        disabled={signedIn}
      >
        {signedIn ? "已簽到" : "簽到"}
      </button>
    </div>
  );
}

export default AttendancePage;
