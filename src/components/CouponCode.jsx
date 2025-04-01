// src/components/CouponCode.jsx
import React, { useState } from 'react';

const CouponCode = ({ onApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Date d'expiration du code "campus" (un mois à partir d'aujourd'hui)
  // Vous devrez ajuster cette date manuellement selon vos besoins
  const expiryDate = new Date('2025-05-01');
  
  // Configuration du code de réduction
  const validCoupon = {
    code: 'CAMPUS',
    discount: 20, // 20% de réduction
    description: 'Code de réduction Campus (20%)'
  };

  const applyCoupon = () => {
    // Réinitialiser les messages
    setError('');
    setSuccess('');
    
    // Vérifier si le code est vide
    if (!couponCode.trim()) {
      setError('Veuillez entrer un code de réduction');
      return;
    }
    
    // Simuler un chargement
    setIsLoading(true);
    
    // Vérifier le code après un court délai (pour simulation)
    setTimeout(() => {
      // Vérifier si le code correspond (insensible à la casse)
      const code = couponCode.trim().toUpperCase();
      
      if (code !== validCoupon.code) {
        setError('Code de réduction invalide');
        setIsLoading(false);
        return;
      }
      
      // Vérifier si le coupon n'est pas expiré
      const now = new Date();
      if (now > expiryDate) {
        setError('Ce code de réduction a expiré');
        setIsLoading(false);
        return;
      }
      
      // Appliquer la réduction
      setSuccess(`${validCoupon.description} appliqué avec succès!`);
      
      // Appeler la fonction de rappel avec les détails du coupon
      if (onApplyCoupon) {
        onApplyCoupon({
          code: validCoupon.code,
          discount: validCoupon.discount,
          description: validCoupon.description
        });
      }
      
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="mb-6">
      <h4 className="font-medium text-gray-700 mb-2">Code de réduction :</h4>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Entrez votre code"
          className="border border-gray-300 rounded px-3 py-2 sm:w-3/5 flex-grow"
          disabled={isLoading}
        />
        <button
          onClick={applyCoupon}
          className={`px-4 py-2 rounded text-white font-medium transition-colors ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Vérification...' : 'Appliquer'}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
      {success && (
        <p className="text-green-500 text-sm mt-1">{success}</p>
      )}
    </div>
  );
};

export default CouponCode;