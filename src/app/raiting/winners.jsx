'use client'
import { useState } from "react";

export default function WinnerAlert() {
  const [winners, setWinners] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleSelectWinners = () => {
    if (typeof window === "undefined") return; // تأكد من أن الكود يعمل على العميل فقط

    const storedData = JSON.parse(localStorage.getItem("data")) || {};
    const users = Object.values(storedData);

    if (users.length === 0) {
      alert("لا يوجد بيانات في LocalStorage");
      return;
    }

    // اختيار عدد الفائزين بناءً على عدد المستخدمين المتاحين
    const winnersCount = Math.min(5, users.length);
    const selectedWinners = [];
    const usersCopy = [...users];

    for (let i = 0; i < winnersCount; i++) {
      const randomIndex = Math.floor(Math.random() * usersCopy.length);
      const winner = usersCopy.splice(randomIndex, 1)[0];
      selectedWinners.push(winner);
    }

    setWinners(selectedWinners);
    setShowAlert(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* زر اختيار الفائزين */}
      <button
        onClick={handleSelectWinners}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        اختر الفائزين
      </button>

      {/* نافذة عرض الفائزين */}
      {showAlert && winners.length > 0 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#f6f6f6] w-[300px] h-auto p-5 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-800">🎉 الفائزون 🎉</h2>
          <div className="mt-2 w-full text-center">
            {winners.map((winner, index) => (
              <div key={index} className="text-lg">
                <p className="font-semibold">{winner.name}</p>
                <p className="text-gray-600">{winner.email}</p>
                {index !== winners.length - 1 && <hr className="my-2" />}
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowAlert(false)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            إغلاق
          </button>
        </div>
      )}
    </div>
  );
}
