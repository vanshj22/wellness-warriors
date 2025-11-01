# Wellness Warriors - Pose Detection Backend

This backend provides real-time pose detection and exercise form analysis using MediaPipe.

## Features

- Real-time pose detection using MediaPipe
- Exercise form analysis (Squats, Push-ups)
- WebSocket-based communication for low latency
- Automatic exercise type detection
- Visual feedback with skeleton overlay

## Setup

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the Backend Server

```bash
python main.py
```

The server will start on `http://localhost:8000`

## API Endpoints

### WebSocket: `/ws/pose`

Connect to this endpoint to send video frames and receive real-time feedback.

**Message Format (Client → Server):**
```json
{
  "type": "frame",
  "data": "base64_encoded_image",
  "exercise": "auto|squat|pushup"
}
```

**Response Format (Server → Client):**
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

## Exercise Analysis

### Squats
- Checks squat depth (knee angle)
- Monitors knee alignment
- Verifies back posture
- Detects if knees go past toes

### Push-ups
- Checks push-up depth (elbow angle)
- Monitors body alignment (straight line)
- Detects sagging or piking

## Based On

This implementation is inspired by the [Posture project](https://github.com/twixupmysleeve/Posture) which uses MediaPipe for pose tracking and machine learning for form analysis.

