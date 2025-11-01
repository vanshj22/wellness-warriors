# Wellness Warriors - AI-Powered Pose Tracking

A mobile-first web application designed for seniors to track exercises with real-time AI-powered pose detection and form feedback.

## Features

- 📱 **Mobile-First Design** - Optimized for smartphone use with large buttons and clear text
- 🎯 **Real-Time Pose Detection** - AI-powered form analysis using MediaPipe
- 🗣️ **Voice Narration** - Screen reader functionality for accessibility
- 📹 **Video Recording** - Record exercises with live feedback
- 📊 **Progress Tracking** - Monitor your fitness journey
- 👥 **Community** - Connect with other users
- 🎨 **Beautiful UI** - Modern design with smooth animations

## Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** components
- **Framer Motion** for animations
- **Web Speech API** for narration
- **WebSocket** for real-time communication

### Backend
- **Python 3.8+**
- **FastAPI** for WebSocket server
- **MediaPipe** for pose detection
- **OpenCV** for video processing
- **NumPy** for calculations

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- pip (Python package manager)

### Installation

#### 1. Clone and Install Frontend Dependencies

```bash
# Navigate to the project directory
cd wellness-warriors

# Install Node.js dependencies
npm install
```

#### 2. Install Python Backend Dependencies

```bash
# Navigate to the backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt
```

### Running the Application

You need to run both the frontend and backend servers:

#### Terminal 1 - Backend (Python)

```bash
cd wellness-warriors/backend
python main.py
```

The backend will start on `http://localhost:8000`

#### Terminal 2 - Frontend (Next.js)

```bash
cd wellness-warriors
npm run dev
```

The frontend will start on `http://localhost:3000`

### Quick Start Script (Windows)

```powershell
# Run both servers (requires two terminals)
# Terminal 1:
cd wellness-warriors/backend; python main.py

# Terminal 2:
cd wellness-warriors; npm run dev
```

## Usage

1. **Welcome Screen** - Adjust text size and learn about the app
2. **Home Screen** - Choose from:
   - 📹 My Exercises - Record and check your form
   - 📅 My Plan - View your exercise schedule
   - 👥 My Community - Connect with others
3. **Recording Screen** - 
   - Toggle pose detection with the Activity button
   - Get real-time feedback on your form
   - Record videos for later review
4. **Accessibility** - Use the "Narrate" button to hear screen content

## Pose Detection Features

The AI analyzes your exercise form in real-time and provides feedback on:

### Squats
- ✅ Proper squat depth (knee angle)
- ✅ Knee alignment (knees over toes)
- ✅ Back posture (chest up)
- ✅ Hip positioning

### Push-ups
- ✅ Proper depth (elbow angle)
- ✅ Body alignment (straight line)
- ✅ Form consistency

The system automatically detects which exercise you're performing and provides appropriate feedback.

## Project Structure

```
wellness-warriors/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main app entry point
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── home-screen.tsx   # Home screen
│   ├── recording-screen.tsx  # Video recording with pose detection
│   ├── exercises-screen.tsx
│   ├── plan-screen.tsx
│   └── ...
├── hooks/                # Custom React hooks
│   ├── use-narration.ts  # Voice narration
│   └── use-pose-websocket.ts  # WebSocket communication
├── backend/              # Python backend
│   ├── main.py          # FastAPI server
│   ├── pose_detector.py # MediaPipe pose detection
│   ├── requirements.txt # Python dependencies
│   └── README.md        # Backend documentation
└── README.md            # This file
```

## API Documentation

### WebSocket Endpoint: `/ws/pose`

**Client → Server:**
```json
{
  "type": "frame",
  "data": "base64_encoded_image",
  "exercise": "auto|squat|pushup"
}
```

**Server → Client:**
```json
{
  "type": "feedback",
  "feedback": [
    {
      "type": "good|warning|error|neutral",
      "message": "Feedback message"
    }
  ],
  "annotated_frame": "data:image/jpeg;base64,...",
  "exercise_detected": "squat|pushup|unknown"
}
```

## Troubleshooting

### Backend Connection Issues

If you see "Connecting to pose detection..." or connection errors:

1. Make sure the Python backend is running on port 8000
2. Check that all Python dependencies are installed
3. Verify no firewall is blocking localhost:8000

### Camera Access

If the camera doesn't work:

1. Grant camera permissions in your browser
2. Use HTTPS or localhost (required for camera access)
3. Check that no other app is using the camera

### Performance

For better performance:

1. Use a modern browser (Chrome, Edge, Firefox)
2. Ensure good lighting for pose detection
3. Close other resource-intensive applications

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
