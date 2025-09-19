
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { CharacterDisplay } from './components/CharacterDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateAnimeCharacter } from './services/geminiService';
import type { GenerativePart } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generativePart, setGenerativePart] = useState<GenerativePart | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    setError(null);
    setGeneratedImage(null);
    
    const reader = new FileReader();
    reader.onloadend = () => {
        const fullDataUrl = reader.result as string;
        setOriginalImage(fullDataUrl);
        
        const base64Data = fullDataUrl.split(',')[1];
        if (base64Data) {
            setGenerativePart({
                mimeType: file.type,
                data: base64Data
            });
        } else {
             setError("Could not read image file. Please try another one.");
             setOriginalImage(null);
             setGenerativePart(null);
        }
    };
    reader.onerror = () => {
        setError("Failed to read the file. Please try again.");
        setOriginalImage(null);
        setGenerativePart(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!generativePart) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const resultBase64 = await generateAnimeCharacter(generativePart, prompt);
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "An unknown error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [generativePart, prompt]);
  
  const handleReset = useCallback(() => {
    setOriginalImage(null);
    setGenerativePart(null);
    setGeneratedImage(null);
    setPrompt('');
    setIsLoading(false);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <Header />
        <main className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ImageUploader 
              onImageUpload={handleImageUpload}
              originalImage={originalImage}
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              onReset={handleReset}
            />
            <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-2xl p-6 border border-gray-700 min-h-[400px] lg:min-h-0">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <CharacterDisplay 
                  originalImage={originalImage} 
                  generatedImage={generatedImage} 
                  error={error} 
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
