'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageResult {
  url: string;
  alt: string;
}

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<ImageResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      
      // In a real application, this would call your API endpoint
      // For demonstration, we're simulating an API call
      setTimeout(() => {
        // This would be replaced with actual API call results
        setGeneratedImage({
          url: `https://via.placeholder.com/512x512?text=${encodeURIComponent(prompt)}`,
          alt: prompt
        });
        setIsGenerating(false);
      }, 2000);
      
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">AI Image Generator</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your prompt
          </label>
          <textarea
            id="prompt"
            className="input w-full"
            rows={3}
            placeholder="Describe the image you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <button 
          type="submit" 
          className="btn w-full"
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Image'}
        </button>
      </form>
      
      {isGenerating && (
        <div className="mt-6 flex justify-center">
          <div className="animate-pulse text-center">
            <p>Creating your masterpiece...</p>
            <div className="mt-2 bg-gray-200 rounded-md h-64 w-64 mx-auto"></div>
          </div>
        </div>
      )}
      
      {generatedImage && !isGenerating && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Generated Image</h3>
          <div className="relative h-64 w-full">
            <Image 
              src={generatedImage.url}
              alt={generatedImage.alt}
              fill
              className="object-contain rounded-md"
            />
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Prompt: {prompt}</p>
          </div>
        </div>
      )}
    </div>
  );
}