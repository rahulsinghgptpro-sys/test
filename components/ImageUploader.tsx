
import React, { useRef, useCallback } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  originalImage: string | null;
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  onReset: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  originalImage,
  prompt,
  setPrompt,
  onGenerate,
  isLoading,
  onReset
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 flex flex-col space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />
      
      {!originalImage ? (
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">PNG, JPG, or WEBP</p>
          </div>
        </label>
      ) : (
        <div className="relative w-full aspect-square max-h-64 mx-auto rounded-lg overflow-hidden border border-gray-600">
           <img src={originalImage} alt="Uploaded preview" className="w-full h-full object-contain" />
        </div>
      )}

      <div className="flex-grow flex flex-col space-y-4">
        <div className="flex-grow">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Add your creative touch (optional)
          </label>
          <textarea
            id="prompt"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'give them spiky blue hair and a futuristic visor'"
            className="w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-gray-200 p-3 transition"
            disabled={isLoading}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onReset}
            type="button"
            className="w-full sm:w-auto px-4 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-400"
          >
            Start Over
          </button>
          <button
            onClick={onGenerate}
            disabled={!originalImage || isLoading}
            type="button"
            className="flex-grow flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            <SparklesIcon className="w-5 h-5 mr-2" />
            {isLoading ? 'Generating...' : 'Generate Character'}
          </button>
        </div>
      </div>
    </div>
  );
};
