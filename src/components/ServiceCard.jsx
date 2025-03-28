// src/components/ServiceCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const { 
    id, 
    title, 
    description, 
    features, 
    price, 
    isAvailable, 
    releaseDate, 
    image, 
    link 
  } = service;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className="md:flex">
        <div className="md:w-1/3 relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            style={{ minHeight: '200px' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(title)}`;
            }}
          />
          {!isAvailable && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white py-1 px-3 rounded-lg text-sm font-medium">
              À venir
            </div>
          )}
        </div>
        <div className="md:w-2/3 p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">Caractéristiques:</h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <div>
              <span className="text-gray-700 font-semibold">Prix:</span> 
              <span className="text-lg font-bold text-blue-600 ml-2">{price}</span>
              {!isAvailable && releaseDate && (
                <div className="text-sm text-gray-500 mt-1">
                  Disponible à partir de {releaseDate}
                </div>
              )}
            </div>
            
            {isAvailable ? (
              <Link
                to={link}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Commander
              </Link>
            ) : (
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg cursor-not-allowed"
                disabled
              >
                Bientôt disponible
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;