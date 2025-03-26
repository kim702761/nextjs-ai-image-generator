import ImageGeneratorForm from '@/components/ImageGeneratorForm';

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Image Generator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Turn your creative ideas into stunning images with our AI-powered image generator.
          Just describe what you want to see and let the AI do the rest!
        </p>
      </header>
      
      <ImageGeneratorForm />
      
      <footer className="text-center text-gray-500 text-sm mt-12">
        <p>Built with Next.js and AI image generation technologies</p>
        <p className="mt-1">© {new Date().getFullYear()} AI Image Generator</p>
      </footer>
    </div>
  );
}