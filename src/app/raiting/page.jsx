'use client'
import { useState, useEffect } from "react";

export default function ReviewPage() {
  const emojis = ["😡", "☹️", "😐", "😊", "😍"];
  const emojiLabels = ["سيء جدًا", "سيء", "عادي", "جيد", "ممتاز"];

  const [counts, setCounts] = useState(Array(emojis.length).fill(0));
  
  useEffect(() => {
    // Check if we're in the browser (client-side)
    if (typeof window !== "undefined") {
      const savedCounts = JSON.parse(localStorage.getItem("emojiCounts"));
      if (savedCounts) {
        setCounts(savedCounts);
      }
    }
  }, []);

  const [showResult, setShowResult] = useState(false);
  const [overallEmoji, setOverallEmoji] = useState(null);
  const [overallPercentage, setOverallPercentage] = useState(0);
  const [ratingLabel, setRatingLabel] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("emojiCounts", JSON.stringify(counts));
    }
    calculateOverallRating();
  }, [counts]);

  const handleEmojiClick = (index) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
    setShowResult(true); // Show result after selection
  };

  const calculateOverallRating = () => {
    const totalVotes = counts.reduce((acc, val) => acc + val, 0);
    if (totalVotes === 0) return;

    const weightedSum = counts.reduce((sum, count, index) => sum + count * (index + 1), 0);
    const averageScore = weightedSum / totalVotes;
    const percentage = ((averageScore / emojis.length) * 100).toFixed(1);

    setOverallPercentage(percentage);
    
    if (percentage >= 80) {
      setOverallEmoji("😍");
      setRatingLabel("ممتاز");
    } else if (percentage >= 60) {
      setOverallEmoji("😊");
      setRatingLabel("جيد");
    } else if (percentage >= 40) {
      setOverallEmoji("😐");
      setRatingLabel("عادي");
    } else if (percentage >= 20) {
      setOverallEmoji("☹️");
      setRatingLabel("سيء");
    } else {
      setOverallEmoji("😡");
      setRatingLabel("سيء جدًا");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {!showResult ? (
        <div className="w-[300px] h-auto bg-[#f6f6f6] rounded-lg shadow-lg p-5 text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-4">💬 كيف كانت تجربتك معنا؟</h2>
          <div className="flex justify-around">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(index)}
                className="text-3xl hover:scale-110 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-[300px] h-auto bg-[#f6f6f6] rounded-lg shadow-lg p-2 text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-4">✨ نسبة الرضى العام</h2>
          <div className="text-5xl">{overallEmoji}</div>
          <p className="text-gray-700 font-bold mt-2">{ratingLabel} - {overallPercentage}%</p>
        </div>
      )}
    </div>
  );
}
