"use client"; // agar tu state/interaction use karegi

import { useState } from "react";

export default function FlashcardPage() {
  // sample flashcard data
  const flashcards = [
    { question: "Capital of France?", answer: "Paris" },
    { question: "2 + 2 ?", answer: "4" },
    { question: "Who wrote Hamlet?", answer: "William Shakespeare" },
  ];

  // track kaunsa flashcard flip hua hai
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Flashcards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {flashcards.map((card, index) => (
          <div
            key={index}
            onClick={() => setFlipped(flipped === index ? null : index)}
            className="cursor-pointer bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-64 h-40 flex items-center justify-center text-center transition-transform duration-500 transform hover:rotate-y-180"
          >
            {flipped === index ? (
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {card.answer}
              </p>
            ) : (
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {card.question}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

