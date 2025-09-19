
import React, { useState, useEffect } from 'react';

const messages = [
  "Summoning artistic spirits...",
  "Painting with digital ink...",
  "Perfecting the hairstyle...",
  "Adding vibrant colors...",
  "Crafting a unique character...",
  "The AI is hard at work...",
];

export const LoadingSpinner: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-400"></div>
      <h3 className="mt-6 text-xl font-semibold text-gray-200">Generating Your Character</h3>
      <p className="mt-2 text-gray-400 transition-opacity duration-500">
        {messages[messageIndex]}
      </p>
    </div>
  );
};
