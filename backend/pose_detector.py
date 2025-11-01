"""
Pose detection and analysis using MediaPipe
Based on: https://github.com/twixupmysleeve/Posture
"""
import cv2
import mediapipe as mp
import numpy as np
from typing import List, Dict, Tuple, Optional
import math


class PoseDetector:
    def __init__(self):
        self.mp_pose = mp.solutions.pose
        self.mp_drawing = mp.solutions.drawing_utils
        self.pose = self.mp_pose.Pose(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5,
            model_complexity=1
        )
        
    def calculate_angle(self, a: Tuple[float, float], b: Tuple[float, float], c: Tuple[float, float]) -> float:
        """Calculate angle between three points"""
        a = np.array(a)
        b = np.array(b)
        c = np.array(c)
        
        radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
        angle = np.abs(radians * 180.0 / np.pi)
        
        if angle > 180.0:
            angle = 360 - angle
            
        return angle
    
    def get_landmark_coords(self, landmarks, landmark_id: int, width: int, height: int) -> Tuple[float, float]:
        """Get normalized coordinates for a landmark"""
        landmark = landmarks.landmark[landmark_id]
        return (landmark.x * width, landmark.y * height)
    
    def analyze_squat(self, landmarks, width: int, height: int) -> List[Dict[str, str]]:
        """Analyze squat form and provide feedback"""
        feedback = []
        
        try:
            # Get key landmarks for squat analysis
            # Left side
            left_hip = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.LEFT_HIP.value, width, height)
            left_knee = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.LEFT_KNEE.value, width, height)
            left_ankle = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.LEFT_ANKLE.value, width, height)
            left_shoulder = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.LEFT_SHOULDER.value, width, height)
            
            # Right side
            right_hip = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.RIGHT_HIP.value, width, height)
            right_knee = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.RIGHT_KNEE.value, width, height)
            right_ankle = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.RIGHT_ANKLE.value, width, height)
            right_shoulder = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.RIGHT_SHOULDER.value, width, height)
            
            # Calculate angles
            left_knee_angle = self.calculate_angle(left_hip, left_knee, left_ankle)
            right_knee_angle = self.calculate_angle(right_hip, right_knee, right_ankle)
            left_hip_angle = self.calculate_angle(left_shoulder, left_hip, left_knee)
            right_hip_angle = self.calculate_angle(right_shoulder, right_hip, right_knee)
            
            avg_knee_angle = (left_knee_angle + right_knee_angle) / 2
            avg_hip_angle = (left_hip_angle + right_hip_angle) / 2
            
            # Check squat depth
            if avg_knee_angle > 160:
                feedback.append({
                    "type": "neutral",
                    "message": "Standing position - ready to squat"
                })
            elif avg_knee_angle > 120:
                feedback.append({
                    "type": "warning",
                    "message": "Go deeper! Squat to at least 90 degrees"
                })
            elif avg_knee_angle >= 80 and avg_knee_angle <= 120:
                feedback.append({
                    "type": "good",
                    "message": "Perfect squat depth! ✓"
                })
            elif avg_knee_angle < 80:
                feedback.append({
                    "type": "warning",
                    "message": "Too deep - risk of injury"
                })
            
            # Check knee alignment (knees shouldn't cave inward)
            knee_distance = abs(left_knee[0] - right_knee[0])
            ankle_distance = abs(left_ankle[0] - right_ankle[0])
            
            if knee_distance < ankle_distance * 0.8:
                feedback.append({
                    "type": "error",
                    "message": "Keep knees aligned with toes!"
                })
            else:
                feedback.append({
                    "type": "good",
                    "message": "Good knee alignment ✓"
                })
            
            # Check back angle (should stay relatively upright)
            if avg_hip_angle < 45:
                feedback.append({
                    "type": "error",
                    "message": "Keep your chest up! Back too bent"
                })
            elif avg_hip_angle < 60:
                feedback.append({
                    "type": "warning",
                    "message": "Try to keep chest more upright"
                })
            else:
                feedback.append({
                    "type": "good",
                    "message": "Great posture! ✓"
                })
            
            # Check if knees go past toes
            if left_knee[0] > left_ankle[0] + 30 or right_knee[0] < right_ankle[0] - 30:
                feedback.append({
                    "type": "warning",
                    "message": "Knees going past toes - push hips back"
                })
                
        except Exception as e:
            feedback.append({
                "type": "error",
                "message": f"Unable to analyze pose: {str(e)}"
            })
        
        return feedback
    
    def analyze_pushup(self, landmarks, width: int, height: int) -> List[Dict[str, str]]:
        """Analyze push-up form and provide feedback"""
        feedback = []
        
        try:
            # Get key landmarks
            left_shoulder = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.LEFT_SHOULDER.value, width, height)
            left_elbow = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.LEFT_ELBOW.value, width, height)
            left_wrist = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.LEFT_WRIST.value, width, height)
            left_hip = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.LEFT_HIP.value, width, height)
            left_knee = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.LEFT_KNEE.value, width, height)
            
            # Calculate elbow angle
            elbow_angle = self.calculate_angle(left_shoulder, left_elbow, left_wrist)
            
            # Calculate body alignment (shoulder-hip-knee should be straight)
            body_angle = self.calculate_angle(left_shoulder, left_hip, left_knee)
            
            # Check push-up depth
            if elbow_angle > 160:
                feedback.append({
                    "type": "neutral",
                    "message": "Starting position - arms extended"
                })
            elif elbow_angle > 100:
                feedback.append({
                    "type": "warning",
                    "message": "Go lower! Aim for 90 degrees"
                })
            elif elbow_angle >= 70 and elbow_angle <= 100:
                feedback.append({
                    "type": "good",
                    "message": "Perfect depth! ✓"
                })
            
            # Check body alignment
            if body_angle < 160:
                feedback.append({
                    "type": "error",
                    "message": "Keep your body straight! No sagging"
                })
            else:
                feedback.append({
                    "type": "good",
                    "message": "Great body alignment! ✓"
                })
                
        except Exception as e:
            feedback.append({
                "type": "error",
                "message": f"Unable to analyze pose: {str(e)}"
            })
        
        return feedback
    
    def detect_exercise_type(self, landmarks, width: int, height: int) -> str:
        """Detect what type of exercise is being performed"""
        try:
            left_hip = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.LEFT_HIP.value, width, height)
            left_shoulder = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.LEFT_SHOULDER.value, width, height)
            left_ankle = self.get_landmark_coords(landmarks, self.mp_pose.PoseLandmark.LEFT_ANKLE.value, width, height)
            
            # If hips are significantly higher than shoulders, likely push-up position
            if left_hip[1] < left_shoulder[1] - 50:
                return "pushup"
            # If person is relatively upright, likely squat
            elif abs(left_hip[1] - left_shoulder[1]) < 200:
                return "squat"
            else:
                return "unknown"
        except:
            return "unknown"
    
    def process_frame(self, frame: np.ndarray, exercise_type: str = "auto") -> Tuple[Optional[np.ndarray], List[Dict[str, str]]]:
        """
        Process a frame and return annotated frame with feedback
        
        Args:
            frame: Input frame (BGR format from OpenCV)
            exercise_type: Type of exercise ("squat", "pushup", or "auto" for auto-detection)
            
        Returns:
            Tuple of (annotated_frame, feedback_list)
        """
        # Convert BGR to RGB
        image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image_rgb.flags.writeable = False
        
        # Process the image
        results = self.pose.process(image_rgb)
        
        # Convert back to BGR for rendering
        image_rgb.flags.writeable = True
        image_bgr = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2BGR)
        
        feedback = []
        
        if results.pose_landmarks:
            # Draw pose landmarks
            self.mp_drawing.draw_landmarks(
                image_bgr,
                results.pose_landmarks,
                self.mp_pose.POSE_CONNECTIONS,
                self.mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                self.mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
            )
            
            height, width, _ = frame.shape
            
            # Auto-detect exercise type if needed
            if exercise_type == "auto":
                exercise_type = self.detect_exercise_type(results.pose_landmarks, width, height)
            
            # Analyze based on exercise type
            if exercise_type == "squat":
                feedback = self.analyze_squat(results.pose_landmarks, width, height)
            elif exercise_type == "pushup":
                feedback = self.analyze_pushup(results.pose_landmarks, width, height)
            else:
                feedback.append({
                    "type": "neutral",
                    "message": "Position yourself for squat or push-up"
                })
        else:
            feedback.append({
                "type": "warning",
                "message": "No pose detected - make sure your whole body is visible"
            })
        
        return image_bgr, feedback
    
    def close(self):
        """Clean up resources"""
        self.pose.close()

