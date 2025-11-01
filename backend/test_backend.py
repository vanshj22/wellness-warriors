"""
Quick test script to verify the backend is working correctly
"""
import cv2
import numpy as np
from pose_detector import PoseDetector

def test_pose_detector():
    print("Testing Pose Detector...")
    
    # Create a test detector
    detector = PoseDetector()
    
    # Create a blank test frame (640x480, black)
    test_frame = np.zeros((480, 640, 3), dtype=np.uint8)
    
    # Add some text to the frame
    cv2.putText(test_frame, "Test Frame", (200, 240), 
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
    
    print("✓ Pose detector created successfully")
    
    # Try processing the frame
    try:
        annotated_frame, feedback = detector.process_frame(test_frame, "auto")
        print("✓ Frame processing works")
        print(f"✓ Feedback received: {len(feedback)} messages")
        
        if feedback:
            for item in feedback:
                print(f"  - [{item['type']}] {item['message']}")
        
        detector.close()
        print("✓ Detector closed successfully")
        print("\n✅ All tests passed! Backend is ready to use.")
        return True
        
    except Exception as e:
        print(f"❌ Error processing frame: {e}")
        return False

if __name__ == "__main__":
    print("=" * 50)
    print("Wellness Warriors Backend Test")
    print("=" * 50)
    print()
    
    try:
        test_pose_detector()
    except Exception as e:
        print(f"❌ Test failed: {e}")
        print("\nMake sure all dependencies are installed:")
        print("  pip install -r requirements.txt")

