// src/components/FAQItem.jsx
import React, { useState } from 'react';

const FAQItem = ({ question, answer, isOpen: initialIsOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
        <svg
          className={`w-5 h-5 text-blue-600 transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-4 text-gray-600">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;