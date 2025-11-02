# Backend API Documentation

> **Wellness Warriors Pose Detection Backend**

---

## Overview

The Wellness Warriors backend provides real-time pose detection and exercise form analysis using Google MediaPipe. The system processes video frames via WebSocket and returns pose analysis with visual feedback.

---

## Features

- ✅ **Real-Time Pose Detection** - MediaPipe integration for 33-point body landmark detection
- ✅ **Exercise Analysis** - Form validation for squats and push-ups
- ✅ **WebSocket Communication** - Low-latency bidirectional communication
- ✅ **Automatic Exercise Detection** - Identifies exercise type from body position
- ✅ **Visual Feedback** - Skeleton overlay with annotated frames
- ✅ **Rep Counting** - Automatic repetition tracking for squats

---

## Requirements

### Software Dependencies

- **Python** 3.8+ ([Download](https://www.python.org/downloads/))
- **pip** (Python package manager)

### Python Packages

All dependencies are listed in `requirements.txt`:

- `fastapi` - Web framework with WebSocket support
- `uvicorn` - ASGI server
- `mediapipe` - Pose detection library
- `opencv-python` - Image processing
- `numpy` - Mathematical operations

---

## Installation

### Step 1: Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

⏱️ **Installation Time:** 3-5 minutes (MediaPipe is a large package)

### Step 2: Verify Installation

```bash
python test_backend.py
```

**Expected Output:**
```
✓ Pose detector created successfully
✓ Frame processing works
✓ Feedback received: X messages
✓ Detector closed successfully
✅ All tests passed!
```

---

## Running the Server

### Development Mode

```bash
python main.py
```

**Server starts on:** `http://localhost:8000`

**Expected Output:**
```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

### Production Mode

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## API Endpoints

### Health Check

**Endpoint:** `GET /`

**Response:**
```json
{
  "message": "Wellness Warriors Pose Detection API",
  "status": "running"
}
```

### Health Status

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "healthy"
}
```

### WebSocket: Pose Detection

**Endpoint:** `WebSocket /ws/pose`

Real-time bidirectional communication for pose detection.

---

## WebSocket Protocol

### Client → Server Message

**Frame Data:**
```json
{
  "type": "frame",
  "data": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "exercise": "auto"
}
```

**Parameters:**

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `type` | string | Must be `"frame"` | ✅ |
| `data` | string | Base64-encoded JPEG image (with or without data URL prefix) | ✅ |
| `exercise` | string | Exercise type: `"auto"`, `"squat"`, or `"pushup"` | ✅ |

**Ping Message:**
```json
{
  "type": "ping"
}
```

### Server → Client Response

**Feedback Response:**
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

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Response type: `"feedback"` or `"error"` |
| `feedback` | array | Array of feedback objects |
| `feedback[].type` | string | Severity: `"good"`, `"warning"`, `"error"`, or `"neutral"` |
| `feedback[].message` | string | Human-readable feedback text |
| `annotated_frame` | string | Base64-encoded annotated frame with skeleton overlay |
| `exercise_detected` | string | Detected exercise type: `"squat"`, `"pushup"`, or `"unknown"` |
| `rep_count` | integer | Current repetition count |

**Error Response:**
```json
{
  "type": "error",
  "message": "Failed to decode image"
}
```

**Pong Response:**
```json
{
  "type": "pong"
}
```

---

## Feedback Types

| Type | Color | Description | Example |
|------|-------|-------------|---------|
| `good` | 🟢 Green | Form is correct | "Perfect squat depth! ✓" |
| `warning` | 🟡 Yellow | Needs improvement | "Go deeper! Squat to at least 90 degrees" |
| `error` | 🔴 Red | Incorrect form | "Keep knees aligned with toes!" |
| `neutral` | 🔵 Blue | Informational | "Standing position - ready to squat" |

---

## Exercise Analysis

### Squat Analysis

**Checks Performed:**

1. **Depth Check**
   - Calculates knee angle (Hip → Knee → Ankle)
   - Optimal: 80° - 120°
   - Warning: > 120° (too shallow) or < 80° (too deep)

2. **Alignment Check**
   - Compares knee distance to ankle distance
   - Warning: Knees caving inward (< 80% of ankle distance)

3. **Posture Check**
   - Calculates hip angle (Shoulder → Hip → Knee)
   - Optimal: > 60° (upright)
   - Warning: 45° - 60° (slight lean)
   - Error: < 45° (excessive forward lean)

4. **Safety Check**
   - Verifies knees don't go too far past toes
   - Warning if knee position exceeds safety threshold

**Rep Counting:**
- Tracks knee angle transitions
- Counts rep when: down position (< 120°) → up position (> 140°)
- Requires minimum depth for valid rep

### Push-up Analysis

**Checks Performed:**

1. **Depth Check**
   - Calculates elbow angle (Shoulder → Elbow → Wrist)
   - Optimal: 70° - 100°
   - Warning: > 100° (too shallow) or < 70° (too deep)

2. **Alignment Check**
   - Calculates body angle (Shoulder → Hip → Knee)
   - Optimal: ≥ 160° (straight line)
   - Error: < 160° (sagging or piking)

---

## Architecture

### Connection Management

- Each WebSocket connection gets a unique `PoseDetector` instance
- Detector state persists for connection lifetime
- Automatic cleanup on disconnect
- Supports multiple concurrent connections

### Processing Pipeline

```
WebSocket Message
    ↓
Base64 Decode
    ↓
OpenCV Frame (BGR)
    ↓
RGB Conversion
    ↓
MediaPipe Processing
    ↓
Landmark Extraction (33 points)
    ↓
Exercise Analysis
    ↓
Feedback Generation
    ↓
Skeleton Drawing
    ↓
Frame Encoding (JPEG)
    ↓
Base64 Encoding
    ↓
WebSocket Response
```

### Performance

- **Processing Time:** ~100-200ms per frame
- **Frame Rate:** Handles ~15 FPS
- **Memory:** ~200MB per connection
- **CPU:** 20-40% typical usage

---

## Configuration

### Port Configuration

Edit `main.py`:
```python
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)  # Change port here
```

### CORS Configuration

Edit `main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    # Add your origins here
)
```

### MediaPipe Configuration

Edit `pose_detector.py`:
```python
self.pose = self.mp_pose.Pose(
    min_detection_confidence=0.5,  # Detection threshold
    min_tracking_confidence=0.5,   # Tracking threshold
    model_complexity=0  # 0=fast, 1=balanced, 2=accurate
)
```

---

## Error Handling

### Common Errors

**Invalid Image Data:**
- Returns error response if base64 decoding fails
- Validates image data length
- Checks for empty frames

**MediaPipe Errors:**
- Handles processing failures gracefully
- Returns neutral feedback on detection failure
- Logs errors for debugging

**Connection Errors:**
- Automatic cleanup on disconnect
- Resource deallocation
- Error logging

---

## Testing

### Run Backend Tests

```bash
python test_backend.py
```

**Tests:**
- Pose detector creation
- Frame processing
- Feedback generation
- Resource cleanup

### Manual Testing

1. Start server: `python main.py`
2. Connect via WebSocket client
3. Send test frame
4. Verify response structure
5. Check feedback accuracy

---

## Performance Optimization

### Image Compression

- **Format:** JPEG
- **Quality:** 70%
- **Optimization:** Reduce resolution if needed

### Frame Processing

- **Async Processing:** Non-blocking WebSocket handler
- **Queue Management:** Process frames sequentially
- **Resource Cleanup:** Automatic detector cleanup

### MediaPipe Settings

- **Model Complexity:** 0 (fastest)
- **Confidence Thresholds:** 0.5 (balanced)

---

## Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

### MediaPipe Installation Issues

**Windows:**
- Install Visual C++ Redistributable
- Use Python 3.8-3.11

**macOS:**
- Install Xcode Command Line Tools: `xcode-select --install`

**Linux:**
```bash
sudo apt-get install python3-dev python3-pip
```

### Dependencies Not Installing

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

---

## Development

### Adding New Exercises

1. Add analysis function to `pose_detector.py`:
   ```python
   def analyze_new_exercise(self, landmarks, width, height):
       # Implement analysis logic
       feedback = []
       # Calculate angles
       # Generate feedback
       return feedback
   ```

2. Add to `process_frame()` method:
   ```python
   elif exercise_type == "new_exercise":
       feedback = self.analyze_new_exercise(...)
   ```

3. Update frontend to support new exercise type

### Adjusting Feedback Thresholds

Edit angle ranges in analysis functions:
```python
# Example: Change squat depth threshold
if avg_knee_angle > 130:  # Change from 120
    feedback.append({
        "type": "warning",
        "message": "Go deeper!"
    })
```

---

## Security Considerations

### Development (Current)

- Localhost only
- No authentication
- Plain WebSocket (ws://)

### Production Recommendations

- **HTTPS/WSS:** Encrypt all communications
- **Authentication:** Implement user authentication
- **Rate Limiting:** Prevent abuse
- **Input Validation:** Sanitize all inputs
- **CORS:** Proper origin restrictions

---

## References

- [MediaPipe Pose Documentation](https://google.github.io/mediapipe/solutions/pose.html)
- [FastAPI WebSocket Guide](https://fastapi.tiangolo.com/advanced/websockets/)
- [OpenCV Documentation](https://docs.opencv.org/)

---

## License

MIT License - Same as main project

---

**For frontend integration, see:** [../README.md](../README.md)

**For architecture details, see:** [../ARCHITECTURE.md](../ARCHITECTURE.md)
