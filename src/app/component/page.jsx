'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";

export default function Boxes() {
  const [language, setLanguage] = useState('');
  const [isClient, setIsClient] = useState(false); // لتحديد ما إذا كان الكود يعمل على العميل
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // تأكيد أن الكود يعمل على العميل
    if (typeof window !== "undefined") {
      setLanguage(localStorage.getItem('language') || '');
    }
  }, []);

  const [data, setdata] = useState([
    {
      "id": 1,
      "name": "History of Entrepreneurship",
      "arabicname":"تاريخ ريادة الأعمال",
      'background':'#75b0cc'
    },
    {
      "id": 2,
      "name": "Startup Basics",
      "arabicname":"أساسيات الشركات الناشئة",
      'background':'#7dd2ed'
    },
    {
      "id": 3,
      "name": "Pitching and Fundraising",
      "arabicname":"عرض المشروع وجمع الأموال",
      'background':'#a5d9c9'
    },
    {
      "id": 4,
      "name": "Business Model",
      "arabicname":"نموذج العمل",
      'background':'#f26b6c'
    },
    {
      "id": 5,
      "name": "Innovation and Creativity",
      "arabicname":"الابتكار والإبداع",
      'background':'#c3a6cf'
    },
    {
      "id": 6,
      "name": "Business Technology",
      "arabicname":"تكنولوجيا الأعمال",
      'background':'#fee065'
    },
    {
      "id": 7,
      "name": "Marketing and Branding",
      "arabicname":"التسويق والعالمة التجاري",
      'background':'#86c87b'
    },
    {
      "id": 8,
      "name": "Entrepreneurial Mindset",
      "arabicname":"العقلية الريادية",
      'background':'#f391bc'
    },
  ]);

  const gotodynamc = (id) => {
    if (router) {
      router.push(`/component/${id}`);
    }
  };

  if (!isClient) {
    return null; // إرجاع null حتى يتم تحميل الصفحة بالكامل في المتصفح
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 bg-[url('../../public/TriviaWheelbackground2.png')] bg-cover bg-center">
      <div className="flex justify-center items-center p-4 mt-20">
        <div className="grid grid-cols-2 gap-4">
          {data.map((item) => (
            <button
              onClick={() => gotodynamc(item.id)}
              key={item.id}
              className="w-65 h-32 bg-blue-500 text-white flex justify-center items-center text-xl font-bold rounded-lg shadow-lg p-5"
              style={{ backgroundColor: item.background }}
            >
              {language === 'arabic' ? item.arabicname : item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
