# 🤖 AI HireSync

**AI-Powered Remote Interview Platform**

AI HireSync is a modern, high-performance remote interview platform designed to streamline the technical hiring process. It combines real-time video communication with AI-powered question generation and a collaborative coding environment.

![HireSync Header](https://source.unsplash.com/featured/?technology,interview)

## ✨ Core Features

### 🏢 Role-Based Dashboards
- **Interviewers**: Comprehensive dashboard to schedule interviews, manage sessions, and generate AI questions.
- **Candidates**: Professional portal to access upcoming invitations, join meetings, and view past recordings.

### 🧠 AI Question Generator
- Leveraging **Google Gemini** & **Llama 3.3 (via Groq)**.
- Generate high-quality technical, behavioral, and problem-solving questions based on role and difficulty level.
- Seamlessly integrate generated questions into the interview description or side panel.

### 🎥 Professional Interview Room (Powered by Stream.io)
- **High-Quality Video/Audio**: Real-time communication with optimized latency.
- **Dual Layouts**: Switch between Grid and Speaker views.
- **AI Questions Side-Panel**: Access generated questions directly within the call without switching tabs.
- **Participant Management**: Easily see who's in the room.

### 💻 Collaborative Code Editor
- **Multi-Language Support**: JavaScript, Python, Java.
- **Interactive Coding**: Real-time code execution and results (Coming Soon).
- **Resizable Layout**: Dynamically adjust the video and editor workspace size.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Database**: [Convex](https://www.convex.dev/) (Real-time backend)
- **Authentication**: [Clerk](https://clerk.com/)
- **Video/Audio**: [Stream Video SDK](https://getstream.io/)
- **AI**: [Google Generative AI](https://ai.google.dev/) & [Groq Cloud](https://groq.com/)
- **UI/UX**: [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Convex Account
- Stream IO Account
- Clerk Account
- Google AI / Groq API Keys

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/debojeetmitra/AI-HireSync-ByDebojeet.git
   cd AI-HireSync-ByDebojeet
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=

   # Convex
   CONVEX_DEPLOYMENT=
   NEXT_PUBLIC_CONVEX_URL=

   # Stream
   NEXT_PUBLIC_STREAM_API_KEY=
   STREAM_SECRET_KEY=

   # AI Keys
   GEMINI_API_KEY=
   GROQ_API_KEY=
   ```

4. **Run Convex Dev:**
   ```bash
   npx convex dev
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

## 🤝 Credit

Made with ❤️ by [Debojeet Mitra](https://github.com/debojeetmitra)

---
*Transforming the technical interview experience with AI.*
