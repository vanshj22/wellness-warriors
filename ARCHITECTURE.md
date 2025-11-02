# System Architecture

> **Technical Documentation**  
> Comprehensive overview of Wellness Warriors system architecture and design patterns

---

## Table of Contents

- [Overview](#overview)
- [Architecture Diagram](#architecture-diagram)
- [Data Flow](#data-flow)
- [Component Architecture](#component-architecture)
- [Communication Protocol](#communication-protocol)
- [Pose Detection Algorithm](#pose-detection-algorithm)
- [Performance Optimization](#performance-optimization)
- [Scalability Considerations](#scalability-considerations)
- [Security Considerations](#security-considerations)
- [Error Handling](#error-handling)
- [Deployment Architecture](#deployment-architecture)

---

## Overview

Wellness Warriors employs a **client-server architecture** with real-time bidirectional communication via WebSockets. The system is designed for low-latency pose detection feedback while maintaining performance and scalability.

### Architecture Principles

- **Separation of Concerns**: Frontend handles UI, backend handles processing
- **Real-Time Communication**: WebSocket for low-latency bidirectional data flow
- **Stateless Backend**: Each connection maintains its own pose detector instance
- **Progressive Enhancement**: Application works without pose detection enabled
- **Privacy-First**: All processing happens locally; no data leaves the device

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER'S BROWSER                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Next.js Frontend (Port 3000)                    │  │
│  │                                                             │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │  │
│  │  │ Home Screen  │  │  Recording   │  │ Other Screens│   │  │
│  │  │              │  │   Screen     │  │              │   │  │
│  │  └──────────────┘  └──────┬───────┘  └──────────────┘   │  │
│  │                            │                               │  │
│  │                    ┌───────▼────────┐                     │  │
│  │                    │  Video Stream  │                     │  │
│  │                    │   (Camera)     │                     │  │
│  │                    └───────┬────────┘                     │  │
│  │                            │                               │  │
│  │                    ┌───────▼────────┐                     │  │
│  │                    │ Frame Capture  │                     │  │
│  │                    │  (Canvas API)  │                     │  │
│  │                    └───────┬────────┘                     │  │
│  │                            │                               │  │
│  │                    ┌───────▼────────┐                     │  │
│  │                    │   WebSocket   │                     │  │
│  │                    │  Connection    │                     │  │
│  │                    └───────┬────────┘                     │  │
│  └────────────────────────────┼───────────────────────────────┘  │
└────────────────────────────────┼─────────────────────────────────┘
                                 │
                         WebSocket (ws://)
                         Base64 Frames →
                         ← Feedback + Annotated Frames
                                 │
┌─────────────────────────────────▼─────────────────────────────────┐
│              Python Backend (Port 8000)                              │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                  FastAPI Server                               │  │
│  │                                                               │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │  │
│  │  │  WebSocket   │  │    Pose      │  │   Feedback   │      │  │
│  │  │   Handler    │→ │  Detector    │→ │  Generator   │      │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘      │  │
│  │                                                               │  │
│  │  ┌────────────────────────────────────────────────────────┐  │  │
│  │  │            MediaPipe Pose                             │  │  │
│  │  │  • Landmark Detection (33 points)                      │  │  │
│  │  │  • Angle Calculations                                 │  │  │
│  │  │  • Form Analysis                                      │  │  │
│  │  └────────────────────────────────────────────────────────┘  │  │
│  │                                                               │  │
│  │  ┌────────────────────────────────────────────────────────┐  │  │
│  │  │              OpenCV                                     │  │  │
│  │  │  • Frame Decoding                                      │  │  │
│  │  │  • Skeleton Drawing                                    │  │  │
│  │  │  • Frame Encoding                                      │  │  │
│  │  └────────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. Frame Capture (Frontend)

```
Camera → Video Element → Canvas → Base64 Encoding → WebSocket
```

**Steps:**
1. Browser accesses camera via `getUserMedia` API
2. Video stream displays in HTML `<video>` element
3. Canvas captures frame from video at ~15 FPS
4. Canvas converts frame to JPEG (60% quality, max 640x480)
5. JPEG encoded as Base64 string
6. Base64 data sent via WebSocket with exercise type metadata

### 2. Pose Detection (Backend)

```
WebSocket → Base64 Decode → OpenCV Frame → MediaPipe → Landmarks
```

**Steps:**
1. Receive Base64-encoded frame from WebSocket
2. Decode Base64 to binary image data
3. OpenCV decodes binary to numpy array (BGR format)
4. Convert BGR to RGB for MediaPipe
5. MediaPipe processes frame and extracts 33 pose landmarks
6. Landmarks returned as normalized coordinates (0.0 - 1.0)

### 3. Analysis (Backend)

```
Landmarks → Angle Calculation → Form Analysis → Feedback Generation
```

**Steps:**
1. Extract relevant landmark coordinates (shoulders, hips, knees, ankles, etc.)
2. Convert normalized coordinates to pixel coordinates
3. Calculate angles between joint points using vector math
4. Compare calculated angles to ideal form thresholds
5. Generate feedback messages based on deviations
6. Update repetition count based on movement patterns

### 4. Visualization (Backend)

```
Original Frame + Landmarks → Skeleton Drawing → Annotated Frame → Base64
```

**Steps:**
1. Draw pose landmarks as circles on original frame
2. Draw connections between landmarks as lines
3. Apply color coding (orange for joints, pink for connections)
4. Encode annotated frame to JPEG (70% quality)
5. Encode JPEG to Base64 string

### 5. Response (Frontend)

```
WebSocket ← Feedback Array + Annotated Frame → Display on Screen
```

**Steps:**
1. Receive WebSocket message with feedback and annotated frame
2. Update feedback state (triggers UI re-render)
3. Display annotated frame as overlay on live video
4. Show feedback messages in side panel
5. Trigger voice feedback for errors/warnings

---

## Component Architecture

### Frontend Components

#### `RecordingScreen`

**Purpose:** Main video recording interface with pose detection integration

**Responsibilities:**
- Camera access and management
- Video frame capture and encoding
- WebSocket communication coordination
- Real-time feedback display
- Video recording with MediaRecorder API
- Voice feedback coordination

**State Management:**
- `isRecording`: Recording status
- `poseDetectionEnabled`: Toggle pose detection on/off
- `feedback`: Array of current feedback messages
- `annotatedFrame`: Current skeleton overlay image
- `repCount`: Current repetition count

**Key Methods:**
- `captureAndSendFrame()`: Captures video frame and sends to backend
- `startRecording()`: Initiates video recording
- `stopRecording()`: Stops recording and processes video

#### `usePoseWebSocket` Hook

**Purpose:** Manages WebSocket connection for pose detection

**Features:**
- Auto-reconnect on disconnection (3-second delay)
- Frame queue management (prevents overflow)
- Connection status tracking
- Error handling and recovery
- Throttling to maintain ~15 FPS

**Returns:**
- `feedback`: Array of feedback messages
- `annotatedFrame`: Base64 annotated frame
- `isConnected`: Boolean connection status
- `error`: Error message string (if any)
- `sendFrame()`: Function to send frame data
- `repCount`: Current repetition count

**Implementation Details:**
- Maintains frame queue (max 2 frames)
- Uses `requestAnimationFrame` for smooth capture
- Implements exponential backoff for reconnection
- Cleans up resources on unmount

#### `useNarration` Hook

**Purpose:** Provides voice narration functionality

**Features:**
- Text-to-speech via Web Speech API
- Configurable rate, pitch, and volume
- Prevents interruption during speech
- Automatic cleanup on unmount

**Returns:**
- `speak()`: Function to speak text
- `stop()`: Function to stop current speech
- `isSpeaking`: Boolean indicating if speech is active

### Backend Components

#### `main.py` - FastAPI Server

**Purpose:** WebSocket server for pose detection

**Endpoints:**
- `GET /`: Health check endpoint
- `GET /health`: Health check with status
- `WebSocket /ws/pose`: Real-time pose detection endpoint

**Features:**
- CORS configuration for development
- Per-connection pose detector instances
- Async frame processing
- Error handling and cleanup
- Connection lifecycle management

**Connection Management:**
- Each WebSocket connection gets unique detector instance
- Detector state persists for connection lifetime
- Automatic cleanup on disconnect

#### `pose_detector.py` - Pose Detection Engine

**Purpose:** MediaPipe integration and exercise analysis

**Class:** `PoseDetector`

**Key Methods:**

- `process_frame(frame, exercise_type)`: Main processing pipeline
  - Processes single frame through MediaPipe
  - Analyzes form based on exercise type
  - Returns annotated frame and feedback

- `analyze_squat(landmarks, width, height)`: Squat form analysis
  - Calculates knee and hip angles
  - Checks depth, alignment, posture
  - Updates rep count based on movement

- `analyze_pushup(landmarks, width, height)`: Push-up form analysis
  - Calculates elbow and body angles
  - Checks depth and alignment

- `detect_exercise_type(landmarks, width, height)`: Auto-detection
  - Analyzes body position to determine exercise type
  - Returns "squat", "pushup", or "unknown"

- `calculate_angle(a, b, c)`: Geometric angle calculation
  - Uses vector math to calculate angle between three points
  - Returns angle in degrees (0-180°)

**State Management:**
- `rep_count`: Current repetition count
- `is_down_position`: Tracks squat/push-up down position
- `last_knee_angle`: Previous frame's knee angle
- `min_depth_reached`: Flag for minimum depth requirement

---

## Communication Protocol

### WebSocket Message Format

#### Client → Server: Frame Data

```json
{
  "type": "frame",
  "data": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "exercise": "auto"
}
```

**Fields:**
- `type`: Message type identifier (`"frame"`)
- `data`: Base64-encoded JPEG image (with optional data URL prefix)
- `exercise`: Exercise type (`"auto"`, `"squat"`, or `"pushup"`)

#### Server → Client: Feedback Response

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
    },
    {
      "type": "error",
      "message": "Keep knees aligned with toes!"
    }
  ],
  "annotated_frame": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "exercise_detected": "squat",
  "rep_count": 5
}
```

**Fields:**
- `type`: Response type (`"feedback"` or `"error"`)
- `feedback`: Array of feedback objects
  - `type`: Feedback severity (`"good"`, `"warning"`, `"error"`, `"neutral"`)
  - `message`: Human-readable feedback text
- `annotated_frame`: Base64-encoded annotated frame
- `exercise_detected`: Detected exercise type
- `rep_count`: Current repetition count

#### Server → Client: Error Response

```json
{
  "type": "error",
  "message": "Failed to decode image"
}
```

---

## Pose Detection Algorithm

### MediaPipe Pose Model

**Model Complexity:** Level 0 (Fast)
- 33 body landmarks
- Optimized for real-time performance
- Suitable for mobile and desktop

**Key Landmarks:**
- Face: Nose, eyes, ears (0-10)
- Upper body: Shoulders, elbows, wrists (11-22)
- Torso: Hips, center (23-24)
- Lower body: Knees, ankles, feet (25-33)

### Squat Analysis Algorithm

#### 1. Landmark Extraction

Extract coordinates for:
- Left/right shoulders
- Left/right hips
- Left/right knees
- Left/right ankles

#### 2. Angle Calculations

**Knee Angle:**
- Formula: `angle(Hip, Knee, Ankle)`
- Optimal range: 80° - 120° (proper squat depth)
- Too shallow: > 120°
- Too deep: < 80° (risk of injury)

**Hip Angle:**
- Formula: `angle(Shoulder, Hip, Knee)`
- Optimal: > 60° (upright posture)
- Warning: 45° - 60° (slight forward lean)
- Error: < 45° (excessive forward lean)

#### 3. Form Checks

**Depth Check:**
```python
if knee_angle > 160:
    feedback.append("Standing position - ready to squat")
elif knee_angle > 120:
    feedback.append("Go deeper! Squat to at least 90 degrees")
elif 80 <= knee_angle <= 120:
    feedback.append("Perfect squat depth!")
elif knee_angle < 80:
    feedback.append("Too deep - risk of injury")
```

**Alignment Check:**
```python
knee_distance = abs(left_knee_x - right_knee_x)
ankle_distance = abs(left_ankle_x - right_ankle_x)

if knee_distance < ankle_distance * 0.8:
    feedback.append("Keep knees aligned with toes!")
```

**Posture Check:**
```python
if hip_angle < 45:
    feedback.append("Keep your chest up! Back too bent")
elif hip_angle < 60:
    feedback.append("Try to keep chest more upright")
else:
    feedback.append("Great posture!")
```

#### 4. Rep Counting

**Algorithm:**
1. Track knee angle over time
2. Detect transition into down position (knee angle < threshold)
3. Mark minimum depth reached
4. Detect transition to up position (knee angle > threshold)
5. Increment rep count if minimum depth was reached

### Push-up Analysis Algorithm

#### 1. Landmark Extraction

Extract coordinates for:
- Left/right shoulders
- Left/right elbows
- Left/right wrists
- Left/right hips
- Left/right knees

#### 2. Angle Calculations

**Elbow Angle:**
- Formula: `angle(Shoulder, Elbow, Wrist)`
- Optimal range: 70° - 100° (proper depth)
- Too shallow: > 100°
- Too deep: < 70° (may cause strain)

**Body Alignment:**
- Formula: `angle(Shoulder, Hip, Knee)`
- Optimal: > 160° (straight line)
- Error: < 160° (sagging or piking)

#### 3. Form Checks

**Depth Check:**
```python
if elbow_angle > 160:
    feedback.append("Starting position - arms extended")
elif elbow_angle > 100:
    feedback.append("Go lower! Aim for 90 degrees")
elif 70 <= elbow_angle <= 100:
    feedback.append("Perfect depth!")
```

**Alignment Check:**
```python
if body_angle < 160:
    feedback.append("Keep your body straight! No sagging")
else:
    feedback.append("Great body alignment!")
```

---

## Performance Optimization

### Frame Rate Control

**Current Implementation:**
- Capture rate: ~15 FPS (66ms interval)
- Frame skip: Every other frame captured
- Queue management: Max 2 frames in queue

**Rationale:**
- Balance between responsiveness and performance
- Prevents WebSocket queue overflow
- Reduces CPU load on both frontend and backend

### Image Compression

**Settings:**
- Format: JPEG
- Quality: 60% (frontend), 70% (backend)
- Resolution: Max 640x480 (maintains aspect ratio)

**Benefits:**
- Reduces bandwidth usage
- Faster encoding/decoding
- Lower latency

### Connection Management

**Features:**
- Auto-reconnect with 3-second delay
- Connection state tracking
- Graceful degradation on disconnect
- Resource cleanup on unmount

### Backend Optimization

**MediaPipe Configuration:**
- Model complexity: 0 (fastest)
- Detection confidence: 0.5
- Tracking confidence: 0.5

**Processing:**
- Async frame processing
- Non-blocking WebSocket handler
- Efficient numpy operations

---

## Scalability Considerations

### Current Design

**Strengths:**
- Stateless processing (each connection independent)
- Horizontal scaling potential
- No shared state between connections
- Low memory footprint per connection

**Limitations:**
- Single-machine deployment
- No load balancing
- No persistent storage
- No user authentication

### Future Enhancements

**Horizontal Scaling:**
- Deploy multiple backend instances
- Use WebSocket load balancer
- Implement connection routing

**State Management:**
- Database for user profiles
- Session management
- Historical data storage

**Performance:**
- GPU acceleration for MediaPipe
- Frame preprocessing optimization
- Caching mechanisms

---

## Security Considerations

### Current Implementation

**Development Mode:**
- Localhost only (no external access)
- No authentication
- No data persistence
- Plain WebSocket (ws://)

### Production Recommendations

**Security Measures:**
1. **HTTPS/WSS**: Encrypt all communication
2. **Authentication**: Implement user authentication
3. **Rate Limiting**: Prevent abuse
4. **Input Validation**: Sanitize all inputs
5. **CORS**: Proper CORS configuration
6. **Secure Camera Access**: HTTPS requirement
7. **Data Encryption**: Encrypt stored data
8. **Access Control**: Role-based permissions

**Compliance:**
- GDPR compliance for user data
- HIPAA considerations for health data
- Privacy policy implementation

---

## Error Handling

### Frontend Error Handling

**Camera Errors:**
- Permission denied → Show user-friendly message
- Device not found → Provide troubleshooting steps
- Format not supported → Fallback options

**WebSocket Errors:**
- Connection failed → Show retry option
- Timeout → Auto-reconnect
- Invalid data → Log and continue

**Processing Errors:**
- Frame capture failure → Graceful degradation
- Memory issues → Reduce frame rate
- Display errors → Fallback UI

### Backend Error Handling

**Frame Processing:**
- Invalid base64 → Return error message
- Decode failure → Log and respond with error
- Empty frame → Validate before processing

**MediaPipe Errors:**
- No pose detected → Return neutral feedback
- Processing timeout → Skip frame
- Resource errors → Clean up and respond

**WebSocket Errors:**
- Client disconnect → Clean up detector
- Invalid message format → Return error
- Processing exception → Log and continue

---

## Deployment Architecture

### Development

```
Frontend: npm run dev (port 3000)
Backend: python main.py (port 8000)
Database: None (in-memory state)
```

### Production Options

#### Option 1: Static Frontend + Backend Service

```
Frontend: Vercel/Netlify (static export)
Backend: AWS Lambda / Google Cloud Functions
Database: PostgreSQL / MongoDB
CDN: CloudFront / Cloudflare
```

#### Option 2: Full Container Deployment

```
Frontend: Docker container (Next.js)
Backend: Docker container (FastAPI)
Orchestration: Kubernetes / Docker Compose
Database: Managed database service
Load Balancer: Nginx / AWS ALB
```

#### Option 3: Serverless Architecture

```
Frontend: Next.js on Vercel
Backend: AWS Lambda + API Gateway
Processing: AWS Batch for heavy processing
Storage: S3 for videos
Database: DynamoDB
```

---

## References

- [MediaPipe Pose Documentation](https://google.github.io/mediapipe/solutions/pose.html)
- [FastAPI WebSocket Guide](https://fastapi.tiangolo.com/advanced/websockets/)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Posture Project](https://github.com/twixupmysleeve/Posture) - Inspiration source

---

**Last Updated:** 2024  
**Version:** 1.0.0
