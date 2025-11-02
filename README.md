# Wellness Warriors

> **AI-Powered Exercise Tracking Platform**  
> Real-time pose detection and form feedback for seniors and fitness enthusiasts

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [Pose Detection](#pose-detection)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Wellness Warriors is a mobile-first web application designed to help users track their exercises with real-time AI-powered pose detection. The platform provides instant feedback on exercise form, helping users maintain proper technique and prevent injuries.

### Key Highlights

- **Real-Time Analysis**: Live pose detection using Google MediaPipe
- **Voice Guidance**: Automated voice feedback during exercises
- **Senior-Friendly**: Large buttons, clear text, and intuitive navigation
- **Accessibility**: Built-in screen reader and voice narration
- **Privacy-Focused**: All processing happens locally on your device

---

## Features

### Core Capabilities

| Feature | Description |
|---------|-------------|
| 📹 **Video Recording** | Record exercise sessions with live form analysis |
| 🎯 **Real-Time Feedback** | Instant posture and form corrections via AI analysis |
| 🗣️ **Voice Assistance** | Automated voice guidance for posture corrections |
| 📊 **Progress Tracking** | Monitor your fitness journey over time |
| 👥 **Community** | Connect with other users and share experiences |
| 🎨 **Modern UI** | Beautiful, responsive design with smooth animations |

### Pose Detection Features

- ✅ **Squat Analysis**: Depth, knee alignment, back posture, hip positioning
- ✅ **Push-up Analysis**: Depth, body alignment, form consistency
- ✅ **Auto-Detection**: Automatically identifies exercise type
- ✅ **Visual Feedback**: Real-time skeleton overlay on video
- ✅ **Rep Counting**: Automatic repetition counting for exercises

---

## Technology Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Speech**: Web Speech API
- **Communication**: WebSocket API

### Backend

- **Framework**: FastAPI
- **Language**: Python 3.8+
- **Pose Detection**: Google MediaPipe
- **Image Processing**: OpenCV
- **Computations**: NumPy

---

## Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.8+ ([Download](https://www.python.org/downloads/))
- **Webcam** (built-in or external)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd wellness-warriors

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..
```

### Running the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
python main.py
```
Server starts on `http://localhost:8000`

**Terminal 2 - Frontend Server:**
```bash
npm run dev
```
Application opens at `http://localhost:3000`

> **Note**: Both servers must run simultaneously. See [QUICKSTART.md](./QUICKSTART.md) for detailed instructions.

---

## Installation

### Step-by-Step Setup

1. **Verify Prerequisites**
   ```bash
   node --version  # Should be 18.0.0 or higher
   python --version  # Should be 3.8.0 or higher
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Start Both Servers** (requires two terminal windows)
   - Terminal 1: `cd backend && python main.py`
   - Terminal 2: `npm run dev`

For detailed setup instructions, see [SETUP.md](./SETUP.md).

---

## Usage Guide

### Getting Started

1. **Welcome Screen**
   - Adjust text size preferences
   - Learn about application features
   - Complete interactive tutorial

2. **Home Screen Navigation**
   - **📹 My Exercises**: Record and analyze exercise form
   - **📅 My Plan**: View your exercise schedule
   - **👥 My Community**: Connect with other users
   - **📊 Measurements**: Track your fitness metrics

3. **Recording Exercise Session**
   - Navigate to "My Exercises"
   - Select exercise type (Auto/Squat/Push-up)
   - Tap "Start Recording"
   - Grant camera permissions when prompted
   - Position yourself 6-8 feet from camera
   - Follow real-time feedback during exercise

4. **Accessibility Features**
   - **Voice Narration**: Tap the 🔊 button to hear screen content
   - **Text Size Adjustment**: Customize text size in settings
   - **High Contrast**: Optimized for visual accessibility

---

## Pose Detection

### Supported Exercises

#### Squats

The system analyzes:
- **Depth**: Knee angle should be between 80°-120°
- **Alignment**: Knees should stay aligned with toes
- **Posture**: Back should remain relatively upright (hip angle > 60°)
- **Safety**: Prevents knees from going too far past toes

**Sample Feedback:**
- ✅ "Perfect squat depth!"
- ✅ "Good knee alignment"
- ⚠️ "Go deeper! Squat to at least 90 degrees"
- ❌ "Keep knees aligned with toes!"

#### Push-ups

The system analyzes:
- **Depth**: Elbow angle should be between 70°-100°
- **Alignment**: Body should form a straight line
- **Form**: Detects sagging or piking

**Sample Feedback:**
- ✅ "Perfect depth!"
- ✅ "Great body alignment"
- ⚠️ "Go lower! Aim for 90 degrees"
- ❌ "Keep your body straight! No sagging"

### Voice Feedback

When posture issues are detected during exercise, the system automatically provides voice guidance:
- **Errors** are spoken immediately with lower pitch for emphasis
- **Warnings** are announced to help correct form
- Feedback is throttled to avoid excessive repetition
- Messages are optimized for clarity in voice format

---

## Project Structure

```
wellness-warriors/
├── app/                        # Next.js app directory
│   ├── page.tsx               # Main application entry
│   ├── layout.tsx             # Root layout configuration
│   └── globals.css            # Global styles
│
├── components/                 # React components
│   ├── ui/                    # Reusable UI components (shadcn/ui)
│   ├── home-screen.tsx        # Home screen component
│   ├── recording-screen.tsx   # Video recording with pose detection
│   ├── exercises-screen.tsx   # Exercise selection
│   ├── plan-screen.tsx        # Exercise plan display
│   ├── community-screen.tsx   # Community features
│   └── profile-screen.tsx     # User profile
│
├── hooks/                     # Custom React hooks
│   ├── use-narration.ts      # Voice narration functionality
│   └── use-pose-websocket.ts  # WebSocket communication
│
├── backend/                   # Python backend
│   ├── main.py               # FastAPI server
│   ├── pose_detector.py      # MediaPipe pose detection logic
│   ├── requirements.txt      # Python dependencies
│   └── README.md             # Backend documentation
│
├── lib/                       # Utility functions
│   └── utils.ts              # Helper utilities
│
└── Documentation/
    ├── README.md              # This file
    ├── QUICKSTART.md          # Quick setup guide
    ├── SETUP.md               # Detailed setup instructions
    ├── ARCHITECTURE.md        # System architecture
    ├── FAQ.md                 # Frequently asked questions
    └── VISUAL_GUIDE.md        # Visual walkthrough
```

---

## API Documentation

### WebSocket Endpoint: `/ws/pose`

Real-time bidirectional communication for pose detection.

#### Client → Server Message

```json
{
  "type": "frame",
  "data": "data:image/jpeg;base64,...",
  "exercise": "auto|squat|pushup"
}
```

**Parameters:**
- `type`: Must be `"frame"`
- `data`: Base64-encoded JPEG image (with or without data URL prefix)
- `exercise`: Exercise type (`"auto"`, `"squat"`, or `"pushup"`)

#### Server → Client Response

```json
{
  "type": "feedback",
  "feedback": [
    {
      "type": "good|warning|error|neutral",
      "message": "Feedback message text"
    }
  ],
  "annotated_frame": "data:image/jpeg;base64,...",
  "exercise_detected": "squat|pushup|unknown",
  "rep_count": 0
}
```

**Response Fields:**
- `type`: Response type (`"feedback"` or `"error"`)
- `feedback`: Array of feedback messages with type and message
- `annotated_frame`: Base64-encoded image with skeleton overlay
- `exercise_detected`: Detected exercise type
- `rep_count`: Current repetition count

### Feedback Types

| Type | Description | Color |
|------|-------------|-------|
| `good` | Form is correct | 🟢 Green |
| `warning` | Needs improvement | 🟡 Yellow |
| `error` | Incorrect form | 🔴 Red |
| `neutral` | Informational | 🔵 Blue |

---

## Troubleshooting

### Common Issues

#### Backend Connection Issues

**Symptoms:**
- "Connecting to pose detection..." message persists
- Connection error messages appear

**Solutions:**
1. Verify Python backend is running on port 8000
2. Check that all dependencies are installed: `pip install -r backend/requirements.txt`
3. Ensure no firewall is blocking localhost:8000
4. Verify WebSocket URL in browser console (F12)

#### Camera Access Problems

**Symptoms:**
- Camera doesn't activate
- Permission denied errors

**Solutions:**
1. Grant camera permissions in browser settings
2. Use HTTPS or localhost (required for camera access)
3. Close other applications using the camera
4. Try a different browser (Chrome/Edge recommended)

#### Performance Issues

**Symptoms:**
- Laggy video feed
- Delayed feedback
- High CPU usage

**Solutions:**
1. Use modern browser (Chrome, Edge, Firefox latest versions)
2. Ensure good lighting for pose detection
3. Close other resource-intensive applications
4. Reduce video resolution if needed
5. Toggle pose detection off when not needed

#### "No Pose Detected"

**Symptoms:**
- Skeleton overlay doesn't appear
- "No pose detected" message shown

**Solutions:**
1. Ensure entire body is visible in frame
2. Stand 6-8 feet from camera
3. Improve lighting conditions (face light source)
4. Remove cluttered background
5. Check camera angle (should be at chest height)

For more troubleshooting help, see [FAQ.md](./FAQ.md).

---

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** with clear commit messages
4. **Test thoroughly** before submitting
5. **Submit a pull request** with a detailed description

### Development Guidelines

- Follow existing code style and patterns
- Add comments for complex logic
- Update documentation for new features
- Ensure accessibility features remain functional
- Test on mobile and desktop browsers

---

## License

MIT License

Copyright (c) 2024 Wellness Warriors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

---

## Additional Resources

- [Quick Start Guide](./QUICKSTART.md) - Get up and running in 5 minutes
- [Setup Instructions](./SETUP.md) - Detailed installation guide
- [Architecture Documentation](./ARCHITECTURE.md) - System design and technical details
- [FAQ](./FAQ.md) - Frequently asked questions
- [Visual Guide](./VISUAL_GUIDE.md) - Visual walkthrough of features

---

**Need Help?** Check our [FAQ](./FAQ.md) or review the troubleshooting section above.
