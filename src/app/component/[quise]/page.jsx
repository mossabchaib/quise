'use client';
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Entrepreneurial_Mindset,
  Marketing_and_Branding,
  Business_Technology,
  Innovation_and_Creativity,
  Business_Model,
  Pitching_and_Fundraising,
  Startup_Basics,
  History_of_Entrepreneurship
} from './dataEngish';

import Review from '../../raiting/raition_l';
import { Business_ModelArabic, Business_TechnologyArabic, Entrepreneurial_MindsetArabic, History_of_EntrepreneurshipArabic, Innovation_and_CreativityArabic, Marketing_and_BrandingArabic, Pitching_and_FundraisingArabic, Startup_BasicsArabic } from "./dataarabic";

function getRandomQuestions(array, count = 5) {
  return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [language, setLanguage] = useState(''); // الحالة لتخزين اللغة
  const [loading, setLoading] = useState(true); // لتجنب أخطاء أثناء التحميل

  const pathname = usePathname();
  const router = useRouter();
  const categoryNumber = parseInt(pathname.split('/').pop());

  useEffect(() => {
    if (typeof window !== "undefined") {
      // نضمن أن `localStorage` متاح قبل استخدامه
      setLanguage(localStorage.getItem('language') || '');
    }
  }, []);

  useEffect(() => {
    if (!language) return; // ننتظر حتى يتم تحميل اللغة

    let selectedCategory;
    switch (categoryNumber) {
      case 1: selectedCategory = language !== 'arabic' ? History_of_Entrepreneurship : History_of_EntrepreneurshipArabic; break;
      case 2: selectedCategory = language !== 'arabic' ? Startup_Basics : Startup_BasicsArabic; break;
      case 3: selectedCategory = language !== 'arabic' ? Pitching_and_Fundraising : Pitching_and_FundraisingArabic; break;
      case 4: selectedCategory = language !== 'arabic' ? Business_Model : Business_ModelArabic; break;
      case 5: selectedCategory = language !== 'arabic' ? Innovation_and_Creativity : Innovation_and_CreativityArabic; break;
      case 6: selectedCategory = language !== 'arabic' ? Business_Technology : Business_TechnologyArabic; break;
      case 7: selectedCategory = language !== 'arabic' ? Marketing_and_Branding : Marketing_and_BrandingArabic; break;
      case 8: selectedCategory = language !== 'arabic' ? Entrepreneurial_Mindset : Entrepreneurial_MindsetArabic; break;
      default: selectedCategory = []; break;
    }
    setQuizData(getRandomQuestions(selectedCategory));
    setLoading(false);
  }, [categoryNumber, language]);

  const handleAnswerClick = (option) => {
    if (!selectedAnswer) {
      setSelectedAnswer(option);
      setAnswerFeedback(option === quizData[currentQuestion].answer ? "correct" : "wrong");

      if (option === quizData[currentQuestion].answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setAnswerFeedback(null);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 bg-[url('../../public/TriviaWheelbackground2.png')] bg-cover bg-center">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : showResult ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
          <p className="text-lg text-gray-700">
            Your Score: <span className="font-bold">{score}</span> / {quizData.length}
          </p>

          <div className="mt-4 text-left">
            <h3 className="text-xl font-semibold text-gray-800">{language !== 'arabic' ? 'Correct Answers:' : 'الاجابات الصحيحة:'}</h3>
            <ul className="mt-2">
              {quizData.map((q, index) => (
                <li key={index} className="text-gray-700">
                  <h1 className="text-black font-bold">{index + 1}. {q.question}</h1>
                  <h5 className="text-green-600">{q.answer}</h5>
                </li>
              ))}
            </ul>
          </div>

          <Review />
          <button
            onClick={handleClick}
            className="mt-6 bg-[#7239d6] text-white px-6 py-4 rounded-lg"
          >
            Sign in
          </button>
        </div>
      ) : (
        quizData.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800">{quizData[currentQuestion].question}</h2>
            <div className="mt-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  disabled={!!selectedAnswer}
                  className={`block w-full py-3 px-4 rounded-lg border mt-2 transition-all duration-300 
                    ${selectedAnswer === option 
                      ? (answerFeedback === "wrong" ? "bg-red-500 text-white" : "bg-green-500 text-white") 
                      : (selectedAnswer && option === quizData[currentQuestion].answer ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700")}`}
                >
                  <span className="text-lg">{option}</span>
                </button>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className="block w-full py-3 px-4 rounded-lg border mt-4 bg-[#7239d6] text-white font-bold text-lg disabled:bg-gray-400"
            >
              {currentQuestion === quizData.length - 1 ? "Finish Quiz" : "Next"}
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Loading questions...</p>
        )
      )}
    </div>
  );
}
