"""
FastAPI backend with WebSocket support for real-time pose detection
"""
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import base64
import json
from pose_detector import PoseDetector
import asyncio
from typing import Dict

app = FastAPI(title="Wellness Warriors Pose Detection API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store active pose detectors for each connection
pose_detectors: Dict[str, PoseDetector] = {}


@app.get("/")
async def root():
    return {"message": "Wellness Warriors Pose Detection API", "status": "running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.websocket("/ws/pose")
async def websocket_pose_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    # Create a unique detector for this connection
    connection_id = id(websocket)
    pose_detectors[connection_id] = PoseDetector()
    detector = pose_detectors[connection_id]
    
    print(f"WebSocket connection established: {connection_id}")
    
    try:
        while True:
            # Receive data from client
            data = await websocket.receive_text()
            message = json.loads(data)
            
            if message.get("type") == "frame":
                # Decode base64 image
                image_data = message.get("data", "")
                exercise_type = message.get("exercise", "auto")
                
                # Validate image data
                if not image_data or len(image_data) < 100:
                    await websocket.send_text(json.dumps({
                        "type": "error",
                        "message": "Invalid or empty image data"
                    }))
                    continue
                
                try:
                    # Remove data URL prefix if present
                    if "," in image_data:
                        image_data = image_data.split(",")[1]
                    
                    # Decode base64 to image
                    img_bytes = base64.b64decode(image_data)
                    
                    if len(img_bytes) == 0:
                        await websocket.send_text(json.dumps({
                            "type": "error",
                            "message": "Decoded image data is empty"
                        }))
                        continue
                    
                    nparr = np.frombuffer(img_bytes, np.uint8)
                    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                    
                    if frame is None:
                        await websocket.send_text(json.dumps({
                            "type": "error",
                            "message": "Failed to decode image"
                        }))
                        continue
                except Exception as e:
                    await websocket.send_text(json.dumps({
                        "type": "error",
                        "message": f"Image processing error: {str(e)}"
                    }))
                    continue
                
                if frame is not None:
                    # Process frame
                    annotated_frame, feedback = detector.process_frame(frame, exercise_type)
                    
                    # Encode annotated frame back to base64
                    _, buffer = cv2.imencode('.jpg', annotated_frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
                    annotated_base64 = base64.b64encode(buffer).decode('utf-8')
                    
                    # Send response
                    response = {
                        "type": "feedback",
                        "feedback": feedback,
                        "annotated_frame": f"data:image/jpeg;base64,{annotated_base64}",
                        "exercise_detected": exercise_type
                    }
                    
                    await websocket.send_text(json.dumps(response))
                else:
                    await websocket.send_text(json.dumps({
                        "type": "error",
                        "message": "Failed to decode frame"
                    }))
            
            elif message.get("type") == "ping":
                await websocket.send_text(json.dumps({"type": "pong"}))
                
    except WebSocketDisconnect:
        print(f"WebSocket disconnected: {connection_id}")
    except Exception as e:
        print(f"WebSocket error: {str(e)}")
        await websocket.send_text(json.dumps({
            "type": "error",
            "message": str(e)
        }))
    finally:
        # Cleanup
        if connection_id in pose_detectors:
            pose_detectors[connection_id].close()
            del pose_detectors[connection_id]
        print(f"Cleaned up detector for connection: {connection_id}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")

