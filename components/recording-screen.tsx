"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, CheckCircle, Volume2, Activity } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNarration } from "@/hooks/use-narration";
import { usePoseWebSocket } from "@/hooks/use-pose-websocket";

interface RecordingScreenProps {
  onBack: () => void;
  onComplete: (videoBlob: Blob) => void;
}

export function RecordingScreen({ onBack, onComplete }: RecordingScreenProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [poseDetectionEnabled, setPoseDetectionEnabled] = useState(true);
  const [exerciseType, setExerciseType] = useState<"auto" | "squat" | "pushup">("auto");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { speak } = useNarration(true);
  const { feedback, annotatedFrame, isConnected, error: wsError, sendFrame } = usePoseWebSocket(
    poseDetectionEnabled && !showPreview,
    exerciseType
  );

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
  const captureAndSendFrame = () => {
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

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to base64
    const frameData = canvas.toDataURL("image/jpeg", 0.8);
    
    // Validate that we got actual image data
    if (!frameData || frameData.length < 100) {
      return; // Invalid frame data
    }

    // Send to backend
    sendFrame(frameData);
  };

  // Initialize camera
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 640, height: 480 },
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
      if (frameIntervalRef.current) {
        clearInterval(frameIntervalRef.current);
      }
    };
  }, []);

  // Start/stop frame capture based on pose detection state
  useEffect(() => {
    if (poseDetectionEnabled && !showPreview && isConnected) {
      // Send frames every 200ms (5 fps) to avoid overwhelming the backend
      frameIntervalRef.current = setInterval(captureAndSendFrame, 200);
    } else {
      if (frameIntervalRef.current) {
        clearInterval(frameIntervalRef.current);
        frameIntervalRef.current = null;
      }
    }

    return () => {
      if (frameIntervalRef.current) {
        clearInterval(frameIntervalRef.current);
      }
    };
  }, [poseDetectionEnabled, showPreview, isConnected, sendFrame]);

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

  const startRecording = () => {
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
      if (isRecording && mediaRecorderRef.current?.state === 'recording') {
        stopRecording();
      }
    }, 60000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleSave = () => {
    if (recordedBlob) {
      onComplete(recordedBlob);
      onBack();
    }
  };

  const handleRetake = () => {
    setShowPreview(false);
    setRecordedBlob(null);
    chunksRef.current = [];
  };

  // Handle countdown completion
  useEffect(() => {
    if (countdown === null && !isRecording && !showPreview) {
      // Countdown finished, start recording
      startRecording();
    }
  }, [countdown]);

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
          {/* Original video (hidden if we have annotated frame) */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`w-full h-full object-cover ${annotatedFrame && poseDetectionEnabled ? 'hidden' : ''}`}
          />
          
          {/* Annotated frame from pose detection */}
          {annotatedFrame && poseDetectionEnabled && (
            <img
              src={annotatedFrame}
              alt="Pose detection"
              className="w-full h-full object-cover"
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

        {/* Recording indicator */}
        {isRecording && (
          <div className="absolute top-16 right-4 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full pointer-events-auto">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="font-semibold">Recording...</span>
          </div>
        )}

        {/* Real-time pose feedback */}
        {poseDetectionEnabled && feedback.length > 0 && !countdown && !showPreview && (
          <div className="absolute top-28 right-4 bg-black/80 backdrop-blur-sm rounded-2xl p-4 max-w-xs space-y-2 pointer-events-auto">
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
                  onClick={handleRetake}
                  variant="outline"
                  size="lg"
                  className="flex-1 h-14 text-lg font-semibold border-2 border-white/50 text-white hover:bg-white/20"
                >
                  Record Again
                </Button>
                <Button
                  onClick={handleSave}
                  size="lg"
                  className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600"
                >
                  Save Video
                </Button>
              </div>
            </>
          ) : isRecording ? (
            <Button
              onClick={stopRecording}
              size="lg"
              className="w-full h-16 text-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg"
            >
              <Camera className="mr-3 w-7 h-7" />
              Stop Recording
            </Button>
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
                <div className="text-5xl mb-4">📋</div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Get Ready!
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  Stand in the frame. Make sure your whole body is visible. When ready, tap Start Recording.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">AI Pose Detection</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    Real-time feedback on your form will appear on screen. Toggle the pose detection button to turn it on/off.
                  </p>
                </div>
                <Button
                  onClick={() => setShowInstructions(false)}
                  size="lg"
                  className="w-full mt-6 h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Got It!
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

