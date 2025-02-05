'use client';
import { useState, useEffect } from 'react';

export default function ReviewPage() {
  const emojis = ['😡', '☹️', '😐', '😊', '😍'];
  const emojiLabels = ['سيء جدًا', 'سيء', 'عادي', 'جيد', 'ممتاز'];

  // استرجاع القيم المحفوظة في localStorage
  const getStoredCounts = () => {
    if (typeof window !== 'undefined') {
      const savedCounts = localStorage.getItem('emojiCounts');
      return savedCounts ? JSON.parse(savedCounts) : Array(emojis.length).fill(0);
    }
    return Array(emojis.length).fill(0);
  };

  const [counts, setCounts] = useState(getStoredCounts);
  const [showResult, setShowResult] = useState(false);
  const [overallEmoji, setOverallEmoji] = useState(null);
  const [overallPercentage, setOverallPercentage] = useState(0);
  const [ratingLabel, setRatingLabel] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('emojiCounts', JSON.stringify(counts));
    }
    calculateOverallRating(counts);
  }, [counts]);

  const handleEmojiClick = (index) => {
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[index] += 1;
      return newCounts;
    });
    setShowResult(true);
  };

  const calculateOverallRating = (counts) => {
    const totalVotes = counts.reduce((acc, val) => acc + val, 0);
    if (totalVotes === 0) return;

    const weightedSum = counts.reduce((sum, count, index) => sum + count * (index + 1), 0);
    const averageScore = weightedSum / totalVotes;
    const percentage = ((averageScore / emojis.length) * 100).toFixed(1);

    setOverallPercentage(percentage);
    
    if (percentage >= 80) {
      setOverallEmoji('😍');
      setRatingLabel('ممتاز');
    } else if (percentage >= 60) {
      setOverallEmoji('😊');
      setRatingLabel('جيد');
    } else if (percentage >= 40) {
      setOverallEmoji('😐');
      setRatingLabel('عادي');
    } else if (percentage >= 20) {
      setOverallEmoji('☹️');
      setRatingLabel('سيء');
    } else {
      setOverallEmoji('😡');
      setRatingLabel('سيء جدًا');
    }
  };

  const handleClose = () => {
    setShowResult(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {!showResult ? (
        <div className="w-[300px] h-auto rounded-lg p-5 text-center">
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
        <>
          <div className="w-[300px] h-auto rounded-lg p-2 text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-4">✨ نسبة الرضى العام</h2>
            <div className="text-5xl">{overallEmoji}</div>
            <p className="text-gray-700 font-bold mt-2">{ratingLabel} - {overallPercentage}%</p>
          </div>
          <button
            style={{ background: '#f6f6f6', width: '70px', height: '30px', borderRadius: '7px' }}
            onClick={handleClose}
          >
            إغلاق
          </button>
        </>
      )}
    </div>
  );
}
