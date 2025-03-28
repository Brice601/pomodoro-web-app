// src/components/TestimonialCard.jsx
import React from 'react';

const TestimonialCard = ({ name, role, content, avatar }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <div className="flex items-center mb-4">
        <img 
          src={avatar} 
          alt={`Avatar de ${name}`} 
          className="w-12 h-12 rounded-full mr-4 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/48?text=User';
          }}
        />
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
      <blockquote className="text-gray-700 italic">"{content}"</blockquote>
    </div>
  );
};

export default TestimonialCard;