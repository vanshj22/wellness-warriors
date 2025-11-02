"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, CheckCircle, Volume2, Activity, AlertTriangle } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNarration } from "@/hooks/use-narration";
import { usePoseWebSocket } from "@/hooks/use-pose-websocket";

interface RecordingScreenProps {
  onBack: () => void;
  onComplete: (videoBlob: Blob, repCount?: number) => void;
  exerciseType?: "auto" | "squat" | "pushup";
}

export function RecordingScreen({ onBack, onComplete, exerciseType: propExerciseType }: RecordingScreenProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showPainAlert, setShowPainAlert] = useState(false);
  const [poseDetectionEnabled, setPoseDetectionEnabled] = useState(true);
  const [exerciseType, setExerciseType] = useState<"auto" | "squat" | "pushup">(propExerciseType || "auto");
  
  // Update exercise type when prop changes
  useEffect(() => {
    if (propExerciseType) {
      setExerciseType(propExerciseType);
    }
  }, [propExerciseType]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIntervalRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const frameSkipRef = useRef<number>(0);

  const { speak, isSpeaking } = useNarration(true);
  const { feedback, annotatedFrame, isConnected, error: wsError, sendFrame, repCount } = usePoseWebSocket(
    poseDetectionEnabled && !showPreview,
    exerciseType
  );
  
  // Store rep count with video data
  const repCountRef = useRef<number>(0);
  const lastRepCountRef = useRef<number>(0);
  
  useEffect(() => {
    repCountRef.current = repCount;
    
    // Provide encouragement at milestones
    if (repCount > lastRepCountRef.current && isRecording) {
      // Rep increased, provide milestone encouragement
      if (repCount === 4) {
        speak("Good job! Four reps completed. Keep it up!", { rate: 1.0, pitch: 1.1, volume: 1.0 });
      } else if (repCount === 10) {
        speak("Excellent work! Ten reps! You're doing great!", { rate: 1.0, pitch: 1.1, volume: 1.0 });
      } else if (repCount % 5 === 0 && repCount > 10) {
        speak(`Amazing! ${repCount} reps completed!`, { rate: 1.0, pitch: 1.1, volume: 1.0 });
      }
      lastRepCountRef.current = repCount;
    }
  }, [repCount, isRecording, speak]);

  // Voice feedback for posture issues and encouragement
  const lastSpokenMessageRef = useRef<string>("");
  const lastSpokenTimeRef = useRef<number>(0);
  const lastEncouragementTimeRef = useRef<number>(0);
  const VOICE_FEEDBACK_THROTTLE_MS = 3000; // Minimum 3 seconds between voice feedbacks
  const ENCOURAGEMENT_INTERVAL_MS = 10000; // Encourage every 10 seconds

  useEffect(() => {
    // Only provide voice feedback when recording and pose detection is enabled
    if (!isRecording || !poseDetectionEnabled || isSpeaking || showPreview) {
      return;
    }

    const now = Date.now();

    // Find the most critical feedback (error > warning > good > others)
    const errorFeedback = feedback.find(f => f.type === "error");
    const warningFeedback = feedback.find(f => f.type === "warning");
    const goodFeedback = feedback.filter(f => f.type === "good");
    
    // Prioritize errors and warnings for correction
    const criticalFeedback = errorFeedback || warningFeedback;
    
    if (criticalFeedback) {
      const message = criticalFeedback.message;
      
      // Throttle: Only speak if:
      // 1. It's a different message, OR
      // 2. It's been at least VOICE_FEEDBACK_THROTTLE_MS since last speech
      if (
        message !== lastSpokenMessageRef.current ||
        (now - lastSpokenTimeRef.current) >= VOICE_FEEDBACK_THROTTLE_MS
      ) {
        // Remove checkmark emojis and formatting for cleaner speech
        const cleanMessage = message
          .replace(/✓/g, "")
          .replace(/Rep \d+/g, "")
          .trim();
        
        if (cleanMessage && cleanMessage.length > 0) {
          speak(cleanMessage, { 
            rate: 1.2, // Slightly faster for real-time feedback
            pitch: criticalFeedback.type === "error" ? 0.9 : 1.0, // Lower pitch for errors
            volume: 1.0 
          });
          
          lastSpokenMessageRef.current = message;
          lastSpokenTimeRef.current = now;
        }
      }
    } 
    // If no errors/warnings and form is good, provide encouragement periodically
    else if (goodFeedback.length >= 3 && (now - lastEncouragementTimeRef.current) >= ENCOURAGEMENT_INTERVAL_MS) {
      const encouragements = [
        "Great form! Keep it up!",
        "Perfect technique! You're doing amazing!",
        "Excellent form! Stay focused!",
        "Outstanding! Your form is looking great!",
        "Keep going! Your form is perfect!"
      ];
      
      const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
      speak(randomEncouragement, { 
        rate: 1.1, 
        pitch: 1.1, // Higher pitch for positive feedback
        volume: 1.0 
      });
      
      lastEncouragementTimeRef.current = now;
      lastSpokenMessageRef.current = randomEncouragement;
      lastSpokenTimeRef.current = now;
    }
  }, [feedback, isRecording, poseDetectionEnabled, isSpeaking, showPreview, speak]);

  const narrateScreen = () => {
    if (showPreview) {
      speak("Video recorded successfully. Would you like to save or record again?");
    } else if (isRecording) {
      speak("Recording in progress. Tap Stop Recording when finished.");
    } else {
      speak("Stand in the frame and tap Start Recording when ready.");
    }
  };

  // Capture and send frames to backend for pose detection
  const captureAndSendFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !poseDetectionEnabled) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Check if video is ready and has valid dimensions
    if (video.readyState !== video.HAVE_ENOUGH_DATA || 
        video.videoWidth === 0 || 
        video.videoHeight === 0) {
      return; // Video not ready yet
    }

    // Limit resolution for faster processing (max 480p)
    const maxWidth = 640;
    const maxHeight = 480;
    const scale = Math.min(maxWidth / video.videoWidth, maxHeight / video.videoHeight, 1);
    
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;

    // Draw current video frame to canvas (scaled down)
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to base64 with lower quality for faster processing
    const frameData = canvas.toDataURL("image/jpeg", 0.6);
    
    // Validate that we got actual image data
    if (!frameData || frameData.length < 100) {
      return; // Invalid frame data
    }

    // Send to backend
    sendFrame(frameData);
  }, [poseDetectionEnabled, sendFrame]);

  // Initialize camera
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: "user", 
            width: { ideal: 640, max: 1280 },
            height: { ideal: 480, max: 720 },
            frameRate: { ideal: 30, max: 30 }
          },
          audio: true
        });
        
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    initCamera();

    return () => {
      // Cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (frameIntervalRef.current !== null) {
        cancelAnimationFrame(frameIntervalRef.current);
      }
    };
  }, []);

  // Start/stop frame capture based on pose detection state
  useEffect(() => {
    if (!poseDetectionEnabled || showPreview || !isConnected) {
      if (frameIntervalRef.current !== null) {
        cancelAnimationFrame(frameIntervalRef.current);
        frameIntervalRef.current = null;
      }
      return;
    }

    // Use requestAnimationFrame for smoother video capture
    // Skip every other frame to maintain ~15-20fps for pose detection
    const captureFrameLoop = (currentTime: number) => {
      // Throttle to ~15fps (every ~66ms) for pose detection
      if (currentTime - lastFrameTimeRef.current >= 66) {
        // Skip every other frame to reduce load
        frameSkipRef.current += 1;
        if (frameSkipRef.current % 2 === 0) {
          captureAndSendFrame();
        }
        lastFrameTimeRef.current = currentTime;
      }
      
      if (poseDetectionEnabled && !showPreview && isConnected) {
        frameIntervalRef.current = requestAnimationFrame(captureFrameLoop);
      }
    };

    frameIntervalRef.current = requestAnimationFrame(captureFrameLoop);

    return () => {
      if (frameIntervalRef.current !== null) {
        cancelAnimationFrame(frameIntervalRef.current);
        frameIntervalRef.current = null;
      }
    };
  }, [poseDetectionEnabled, showPreview, isConnected, captureAndSendFrame]);

  const startCountdown = () => {
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownInterval);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startRecording = useCallback(() => {
    if (!streamRef.current || !videoRef.current) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: 'video/webm;codecs=vp8'
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setRecordedBlob(blob);
      setShowPreview(true);
      setIsRecording(false);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);

    // Auto-stop after 60 seconds
    setTimeout(() => {
      // Use ref to get current state value to avoid stale closure
      if (mediaRecorderRef.current?.state === 'recording') {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
      }
    }, 60000);
  }, []);

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleSave = () => {
    if (recordedBlob) {
      // Save video and navigate - parent component will handle showing feedback
      onComplete(recordedBlob, repCountRef.current);
      // Don't call onBack here - let the parent component handle navigation
    }
  };

  const handleRetake = () => {
    // Stop any ongoing recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    // Reset all state
    setShowPreview(false);
    setRecordedBlob(null);
    setIsRecording(false);
    setCountdown(null);
    chunksRef.current = [];
    
    // Clean up media recorder
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null;
    }
    
    // Rep count will reset automatically when recording starts again
  };

  const handleExcessivePain = () => {
    // Stop the recording immediately
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    
    // Show the pain alert dialog
    setShowPainAlert(true);
    
    // Here you would typically send an alert to the backend/physio
    // For now, we'll just log it
    console.log("🚨 EXCESSIVE PAIN ALERT: User stopped exercise due to excessive pain");
    
    // Speak the message
    speak("Exercise stopped. Your physiotherapist has been alerted and will contact you as soon as possible.", {
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0
    });
  };

  const handlePainAlertClose = () => {
    setShowPainAlert(false);
    // Navigate back after showing the alert
    setTimeout(() => {
      onBack();
    }, 500);
  };

  // Handle countdown completion
  useEffect(() => {
    // Only start recording if countdown was actually running (went from a number to null)
    // Don't auto-start if countdown is null but we're not in a recording state
    if (countdown === null && !isRecording && !showPreview && recordedBlob === null) {
      // Countdown finished, start recording
      startRecording();
    }
  }, [countdown, isRecording, showPreview, recordedBlob, startRecording]);

  return (
    <div className="w-full h-full flex flex-col bg-black relative overflow-hidden">
      {/* Hidden canvas for frame capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Video fills entire screen */}
      {showPreview && recordedBlob ? (
        <video
          src={URL.createObjectURL(recordedBlob)}
          controls
          className="w-full h-full object-cover"
          autoPlay
          loop
        />
      ) : (
        <div className="relative w-full h-full">
          {/* Original video - always visible for smooth playback */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Annotated frame overlay from pose detection */}
          {annotatedFrame && poseDetectionEnabled && (
            <img
              src={annotatedFrame}
              alt="Pose detection overlay"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ opacity: 0.9 }}
            />
          )}
        </div>
      )}

      {/* Overlay controls */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        {/* Top bar with controls */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-auto gap-2">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-white hover:bg-white/20"
            size="sm"
          >
            ← Back
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={() => setPoseDetectionEnabled(!poseDetectionEnabled)}
              variant={poseDetectionEnabled ? "default" : "ghost"}
              className={poseDetectionEnabled ? "bg-blue-600 hover:bg-blue-700" : "text-white hover:bg-white/20"}
              size="sm"
              title="Toggle pose detection"
            >
              <Activity className="w-5 h-5" />
            </Button>
            <Button
              onClick={narrateScreen}
              variant="ghost"
              className="text-white hover:bg-white/20"
              size="sm"
            >
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Connection status */}
        {poseDetectionEnabled && !isConnected && (
          <div className="absolute top-16 left-4 bg-yellow-500/90 text-white px-3 py-2 rounded-lg text-sm pointer-events-auto">
            ⚠️ Connecting to pose detection...
          </div>
        )}

        {/* WebSocket error */}
        {wsError && (
          <div className="absolute top-16 left-4 bg-red-500/90 text-white px-3 py-2 rounded-lg text-sm pointer-events-auto max-w-xs">
            ❌ {wsError}
          </div>
        )}

        {/* Recording indicator and Rep Counter */}
        {isRecording && (
          <div className="absolute top-16 right-4 flex flex-col items-end gap-3 pointer-events-auto z-50">
            <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <span className="font-semibold">Recording...</span>
            </div>
            {/* Rep Counter - Always show when recording */}
            <motion.div
              key={`rep-${repCount}`}
              initial={{ scale: repCount > 0 ? 1.3 : 1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`px-6 py-4 rounded-xl shadow-2xl min-w-[100px] ${
                repCount > 0 ? "bg-green-500" : poseDetectionEnabled ? "bg-gray-700" : "bg-blue-600"
              } text-white border-2 border-white/20`}
            >
              <div className="text-center">
                <div className="text-xs font-semibold mb-1 tracking-wider uppercase">REPS</div>
                <div className="text-4xl font-bold">{repCount}</div>
                {!poseDetectionEnabled && (
                  <div className="text-[10px] mt-1 opacity-75">Enable pose detection for auto-count</div>
                )}
                {poseDetectionEnabled && isConnected && repCount === 0 && (
                  <div className="text-[10px] mt-1 opacity-75">Ready to count</div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Real-time pose feedback */}
        {poseDetectionEnabled && feedback.length > 0 && !countdown && !showPreview && (
          <div className={`absolute ${isRecording ? 'top-52' : 'top-28'} right-4 bg-black/80 backdrop-blur-sm rounded-2xl p-4 max-w-xs space-y-2 pointer-events-auto transition-all duration-300`}>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold text-sm">Live Feedback</span>
            </div>
            {feedback.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`px-3 py-2 rounded-lg text-sm ${
                  item.type === 'good' 
                    ? 'bg-green-500/30 text-green-200 border border-green-400/50' 
                    : item.type === 'warning'
                    ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50'
                    : item.type === 'error'
                    ? 'bg-red-500/30 text-red-200 border border-red-400/50'
                    : 'bg-blue-500/30 text-blue-200 border border-blue-400/50'
                }`}
              >
                {item.message}
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom controls */}
        <div className="mt-auto p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-auto space-y-3">
          {showPreview && recordedBlob ? (
            <>
              <div className="flex items-center justify-center gap-4 mb-4">
                <CheckCircle className="w-12 h-12 text-green-400" />
                <span className="text-2xl font-bold text-white">Video Recorded!</span>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    handleRetake();
                  }}
                  variant="outline"
                  size="lg"
                  className="flex-1 h-14 text-lg font-semibold border-2 border-white/80 text-white hover:bg-white/30 hover:border-white bg-white/10 backdrop-blur-sm"
                >
                  Record Again
                </Button>
                <Button
                  onClick={handleSave}
                  size="lg"
                  className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  Save Video
                </Button>
              </div>
            </>
          ) : isRecording ? (
            <>
              {/* Excessive Pain Stop Button - Prominent below Stop Recording */}
              <Button
                onClick={handleExcessivePain}
                size="lg"
                className="w-full h-14 text-lg font-bold bg-red-600/90 hover:bg-red-700 text-white border-2 border-red-400/50 shadow-lg"
                title="Stop if experiencing excessive pain"
              >
                <AlertTriangle className="mr-2 w-6 h-6" />
                Stop Exercise - Excessive Pain
              </Button>
              <Button
                onClick={stopRecording}
                size="lg"
                className="w-full h-16 text-xl font-bold bg-gray-700 hover:bg-gray-600 text-white shadow-lg"
              >
                <Camera className="mr-3 w-7 h-7" />
                Stop Recording
              </Button>
            </>
          ) : (
            <Button
              onClick={startCountdown}
              size="lg"
              className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            >
              <Camera className="mr-3 w-7 h-7" />
              Start Recording
            </Button>
          )}
        </div>
      </div>

      {/* Countdown Overlay */}
      <AnimatePresence>
        {countdown !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 flex items-center justify-center z-50"
          >
            <div className="text-center">
              <motion.div
                key={countdown}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-9xl font-bold text-white mb-4"
              >
                {countdown}
              </motion.div>
              <p className="text-2xl text-white">Get ready...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions Popup */}
      <AnimatePresence>
        {showInstructions && !isRecording && !countdown && !showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 p-6"
            onClick={() => setShowInstructions(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-sm w-full"
            >
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Get Ready
                </h2>
                <p className="text-base text-gray-600">
                  Stand in frame. Tap Start when ready.
                </p>
                <Button
                  onClick={() => setShowInstructions(false)}
                  size="lg"
                  className="w-full mt-4 h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Got It
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Excessive Pain Alert Dialog */}
      <AnimatePresence>
        {showPainAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 flex items-center justify-center z-[100] p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="bg-red-100 rounded-full p-4">
                    <AlertTriangle className="w-12 h-12 text-red-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Exercise Stopped
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Your exercise has been stopped. Your physiotherapist has been <strong>alerted</strong> about your excessive pain and will get back to you <strong>as soon as possible</strong>.
                  </p>
                  <p className="text-sm text-gray-500 mt-4">
                    Please rest and avoid any activities that cause pain.
                  </p>
                </div>
                <Button
                  onClick={handlePainAlertClose}
                  size="lg"
                  className="w-full mt-6 h-12 text-base font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                >
                  Understood
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

