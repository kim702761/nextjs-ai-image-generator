'use client';

import { useState } from 'react';
import { generateImage } from '@/app/actions';
import Image from 'next/image';

export default function ImageGeneratorForm() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImagePath, setGeneratedImagePath] = useState<string | null>(null);
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
      
      // Call the server action
      const result = await generateImage(prompt);
      
      if (result.success) {
        setGeneratedImagePath(result.imagePath);
      } else {
        setError(result.error || 'Failed to generate image');
      }
      
    } catch (err) {
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="card max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">AI Image Generator</h2>
      
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
        
        <div className="flex items-center text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Be specific with details for better results.</p>
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
        <div className="mt-6">
          <div className="animate-pulse flex flex-col items-center">
            <div className="text-center mb-4">
              <p className="font-medium">Creating your masterpiece...</p>
              <p className="text-sm text-gray-500">This may take a few moments</p>
            </div>
            <div className="bg-gray-200 rounded-md h-64 w-full max-w-md"></div>
          </div>
        </div>
      )}
      
      {generatedImagePath && !isGenerating && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Generated Image</h3>
          <div className="relative h-96 w-full">
            {/* In a real application, this would use the actual generated image */}
            <Image 
              src={generatedImagePath.startsWith('/') 
                ? `https://via.placeholder.com/1024x1024?text=${encodeURIComponent(prompt)}`
                : generatedImagePath
              }
              alt={prompt}
              fill
              className="object-contain rounded-md"
            />
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Prompt: {prompt}</p>
            <button 
              className="mt-2 text-blue-500 hover:text-blue-700"
              onClick={() => {
                // Download functionality would be implemented here
                alert('In a real app, this would download the image');
              }}
            >
              Download Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}