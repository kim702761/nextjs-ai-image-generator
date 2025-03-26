# AI Image Generator

A Next.js application that generates images from text descriptions using AI through the MCP (Multi-agent Collaboration Protocol) system.

## Features

- Text-to-image generation with AI
- Modern UI with Tailwind CSS
- TypeScript support
- Responsive design
- Server Actions for secure API calls

## MCP Integration

This project uses MCP tools to generate images from text prompts. The `mcp_generate_images_generate_image` tool is utilized to:

1. Receive a text prompt from the user
2. Process this prompt through the AI model
3. Generate an image that matches the description
4. Save the image to the specified location

The integration is done through Next.js Server Actions, providing a secure way to call the MCP tools from the client-side.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/kim702761/nextjs-ai-image-generator.git
   cd nextjs-ai-image-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## Project Structure

- `/app` - Next.js app directory containing routes and server actions
- `/components` - React components including the ImageGeneratorForm
- `/public/generated` - Directory where generated images are stored

## Implementation Details

The image generation process follows these steps:

1. User enters a text prompt in the UI
2. The prompt is sent to the server via a Server Action
3. The server calls the MCP tool to generate the image
4. The generated image is saved to the public directory
5. The image path is returned to the client and displayed

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- MCP Tools for AI generation