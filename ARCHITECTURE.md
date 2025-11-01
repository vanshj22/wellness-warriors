# Wellness Warriors - System Architecture

## Overview

Wellness Warriors uses a client-server architecture with real-time WebSocket communication for pose detection feedback.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        USER'S BROWSER                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Next.js Frontend (Port 3000)                 │ │
│  │                                                         │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐│ │
│  │  │ Home Screen  │  │  Recording   │  │ Other Screens││ │
│  │  │              │  │   Screen     │  │              ││ │
│  │  └──────────────┘  └──────┬───────┘  └──────────────┘│ │
│  │                            │                           │ │
│  │                    ┌───────▼────────┐                 │ │
│  │                    │  Video Stream  │                 │ │
│  │                    │   (Camera)     │                 │ │
│  │                    └───────┬────────┘                 │ │
│  │                            │                           │ │
│  │                    ┌───────▼────────┐                 │ │
│  │                    │ Frame Capture  │                 │ │
│  │                    │  (Canvas API)  │                 │ │
│  │                    └───────┬────────┘                 │ │
│  │                            │                           │ │
│  │                    ┌───────▼────────┐                 │ │
│  │                    │   WebSocket    │                 │ │
│  │                    │  Connection    │                 │ │
│  │                    └───────┬────────┘                 │ │
│  └────────────────────────────┼────────────────────────────┘ │
└─────────────────────────────────┼────────────────────────────┘
                                  │
                          WebSocket (ws://)
                          Base64 Frames →
                          ← Feedback + Annotated Frames
                                  │
┌─────────────────────────────────▼────────────────────────────┐
│              Python Backend (Port 8000)                       │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                  FastAPI Server                        │  │
│  │                                                         │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐│  │
│  │  │  WebSocket   │  │    Pose      │  │   Feedback   ││  │
│  │  │   Handler    │→ │  Detector    │→ │  Generator   ││  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘│  │
│  │                                                         │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │            MediaPipe Pose                        │ │  │
│  │  │  • Landmark Detection (33 points)                │ │  │
│  │  │  • Angle Calculations                            │ │  │
│  │  │  • Form Analysis                                 │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  │                                                         │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │              OpenCV                              │ │  │
│  │  │  • Frame Decoding                                │ │  │
│  │  │  • Skeleton Drawing                              │ │  │
│  │  │  • Frame Encoding                                │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Frame Capture (Frontend)
```
Camera → Video Element → Canvas → Base64 Encoding → WebSocket
```

### 2. Pose Detection (Backend)
```
WebSocket → Base64 Decode → OpenCV Frame → MediaPipe → Landmarks
```

### 3. Analysis (Backend)
```
Landmarks → Angle Calculation → Form Analysis → Feedback Generation
```

### 4. Visualization (Backend)
```
Original Frame + Landmarks → Skeleton Drawing → Annotated Frame → Base64
```

### 5. Response (Frontend)
```
WebSocket ← Feedback Array + Annotated Frame → Display on Screen
```

## Component Breakdown

### Frontend Components

#### `RecordingScreen`
- **Purpose:** Main video recording interface
- **Features:**
  - Camera access via `getUserMedia`
  - Frame capture at 5 FPS
  - WebSocket communication
  - Real-time feedback display
  - Video recording with MediaRecorder
- **State Management:**
  - Recording state
  - Pose detection toggle
  - Feedback messages
  - Annotated frames

#### `usePoseWebSocket` Hook
- **Purpose:** Manage WebSocket connection
- **Features:**
  - Auto-reconnect on disconnect
  - Frame queue management
  - Error handling
  - Connection status tracking
- **Returns:**
  - `feedback`: Array of feedback messages
  - `annotatedFrame`: Base64 annotated frame
  - `isConnected`: Connection status
  - `sendFrame`: Function to send frames

### Backend Components

#### `main.py` - FastAPI Server
- **Endpoints:**
  - `GET /`: Health check
  - `WebSocket /ws/pose`: Pose detection endpoint
- **Features:**
  - CORS configuration
  - Connection management
  - Error handling
  - Async processing

#### `pose_detector.py` - Pose Detection
- **Class:** `PoseDetector`
- **Methods:**
  - `process_frame()`: Main processing pipeline
  - `analyze_squat()`: Squat form analysis
  - `analyze_pushup()`: Push-up form analysis
  - `detect_exercise_type()`: Auto-detect exercise
  - `calculate_angle()`: Angle between 3 points
- **Features:**
  - MediaPipe Pose integration
  - Real-time landmark detection
  - Form validation rules
  - Visual feedback generation

## Communication Protocol

### Client → Server Message
```json
{
  "type": "frame",
  "data": "data:image/jpeg;base64,/9j/4AAQ...",
  "exercise": "auto"
}
```

### Server → Client Response
```json
{
  "type": "feedback",
  "feedback": [
    {
      "type": "good",
      "message": "Perfect squat depth! ✓"
    },
    {
      "type": "warning",
      "message": "Try to keep chest more upright"
    }
  ],
  "annotated_frame": "data:image/jpeg;base64,/9j/4AAQ...",
  "exercise_detected": "squat"
}
```

## Pose Detection Algorithm

### Squat Analysis

1. **Landmark Extraction**
   - Shoulders (left/right)
   - Hips (left/right)
   - Knees (left/right)
   - Ankles (left/right)

2. **Angle Calculations**
   - Knee angle: Hip → Knee → Ankle
   - Hip angle: Shoulder → Hip → Knee

3. **Form Checks**
   - ✓ Depth: 80° ≤ knee angle ≤ 120°
   - ✓ Alignment: Knee distance ≥ 80% of ankle distance
   - ✓ Posture: Hip angle ≥ 60°
   - ✓ Knee position: Not past toes

### Push-up Analysis

1. **Landmark Extraction**
   - Shoulders, elbows, wrists
   - Hips, knees

2. **Angle Calculations**
   - Elbow angle: Shoulder → Elbow → Wrist
   - Body angle: Shoulder → Hip → Knee

3. **Form Checks**
   - ✓ Depth: 70° ≤ elbow angle ≤ 100°
   - ✓ Alignment: Body angle ≥ 160°

## Performance Optimization

### Frame Rate Control
- **Capture:** 5 FPS (200ms interval)
- **Processing:** Async, non-blocking
- **Queue:** Max 2 frames to prevent lag

### Image Compression
- **Format:** JPEG
- **Quality:** 80%
- **Resolution:** 640x480

### Connection Management
- **Auto-reconnect:** 3-second delay
- **Heartbeat:** Ping/pong messages
- **Cleanup:** Automatic resource disposal

## Scalability Considerations

### Current Design
- Single-user per connection
- Stateless processing
- No data persistence

### Future Enhancements
- Multiple exercise types
- Machine learning model integration
- Historical analysis
- Multi-user support
- Cloud deployment

## Security

### Current Implementation
- Localhost only (development)
- No authentication
- No data storage

### Production Recommendations
- HTTPS/WSS required
- Authentication tokens
- Rate limiting
- Input validation
- Secure camera access

## Error Handling

### Frontend
- Camera permission errors
- WebSocket connection failures
- Frame capture errors
- Display fallbacks

### Backend
- Invalid frame data
- MediaPipe processing errors
- WebSocket disconnections
- Resource cleanup

## Testing

### Frontend Tests
- Component rendering
- WebSocket connection
- Frame capture
- User interactions

### Backend Tests
- Pose detection accuracy
- Angle calculations
- Feedback generation
- WebSocket handling

## Deployment

### Development
- Frontend: `npm run dev` (port 3000)
- Backend: `python main.py` (port 8000)

### Production
- Frontend: Static export or Vercel
- Backend: Docker container or cloud function
- Database: Optional for user data
- CDN: For static assets

## References

- [MediaPipe Pose](https://google.github.io/mediapipe/solutions/pose.html)
- [FastAPI WebSockets](https://fastapi.tiangolo.com/advanced/websockets/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Posture Project](https://github.com/twixupmysleeve/Posture)

