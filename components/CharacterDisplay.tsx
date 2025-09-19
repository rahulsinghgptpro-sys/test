
import React from 'react';

interface CharacterDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  error: string | null;
}

const ImagePanel: React.FC<{ src: string | null; title: string; isPlaceholder?: boolean }> = ({ src, title, isPlaceholder = false }) => (
    <div className="w-full flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-300 mb-3">{title}</h3>
        <div className="aspect-square w-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700 flex items-center justify-center">
            {src ? (
                <img src={src} alt={title} className="w-full h-full object-contain" />
            ) : (
                <div className={`w-full h-full flex items-center justify-center text-gray-500 ${isPlaceholder ? 'animate-pulse' : ''}`}>
                    {isPlaceholder ? "Waiting for AI..." : "Your image will appear here"}
                </div>
            )}
        </div>
    </div>
);


export const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ originalImage, generatedImage, error }) => {
  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <h3 className="text-xl font-bold text-red-300">An Error Occurred</h3>
        <p className="text-red-400 mt-2">{error}</p>
      </div>
    );
  }

  if (!originalImage && !generatedImage) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
             <img src="https://picsum.photos/seed/anime-placeholder/300" alt="placeholder" className="rounded-full w-32 h-32 object-cover mb-4 opacity-30"/>
            <h3 className="text-2xl font-bold text-gray-300">Your Creation Awaits</h3>
            <p className="text-gray-500 mt-2">Upload a photo and add a prompt to see the magic happen!</p>
        </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <ImagePanel src={originalImage} title="Original" />
        <ImagePanel src={generatedImage} title="Your Anime Character" isPlaceholder={!!originalImage && !generatedImage} />
    </div>
  );
};
