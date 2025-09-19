
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Anime Me
        </span>
      </h1>
      <p className="mt-3 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
        Upload your photo and let AI create a unique anime version of you!
      </p>
    </header>
  );
};
