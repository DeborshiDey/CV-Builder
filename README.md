# AI-Powered CV Builder

A modern, AI-enhanced Resume/CV builder built with Next.js, TypeScript, and Tailwind CSS. Create professional resumes in minutes with AI assistance and multiple templates.

## Features

- **AI Assistance**: Generate professional summaries and enhance bullet points using Google Gemini AI.
- **Real-time Preview**: See your changes instantly as you type.
- **Multiple Templates**: Choose between "Modern" and "Minimalist" designs.
- **PDF Export**: High-quality PDF generation using `@react-pdf/renderer`.
- **Responsive Design**: Works on desktop and tablet.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API Key (Get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DeborshiDey/CV-Builder.git
   cd CV-Builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   ```bash
   cp .env.example .env.local
   ```
   - Add your Google Gemini API key to `.env.local`:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to start building your CV.

## Technologies Used

- [Next.js 14](https://nextjs.org/) - App Router & React Framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Google Generative AI](https://ai.google.dev/) - AI features
- [React-PDF](https://react-pdf.org/) - PDF generation
- [Lucide React](https://lucide.dev/) - Icons

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

