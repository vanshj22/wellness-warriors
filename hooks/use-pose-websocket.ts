"use client";
import { useEffect, useRef, useState, useCallback } from "react";

interface PoseFeedback {
  type: "good" | "warning" | "error" | "neutral";
  message: string;
}

interface PoseResponse {
  type: "feedback" | "error";
  feedback?: PoseFeedback[];
  annotated_frame?: string;
  exercise_detected?: string;
  rep_count?: number;
  message?: string;
}

export function usePoseWebSocket(enabled: boolean, exerciseType: string = "auto") {
  const [feedback, setFeedback] = useState<PoseFeedback[]>([]);
  const [annotatedFrame, setAnnotatedFrame] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [repCount, setRepCount] = useState<number>(0);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const frameQueueRef = useRef<string[]>([]);
  const processingRef = useRef(false);
  const exerciseTypeRef = useRef(exerciseType);
  
  // Keep exerciseType ref updated
  useEffect(() => {
    exerciseTypeRef.current = exerciseType;
  }, [exerciseType]);

  const connect = useCallback(() => {
    if (!enabled || wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const ws = new WebSocket("ws://localhost:8000/ws/pose");

      ws.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
        setError(null);
      };

      ws.onmessage = (event) => {
        try {
          const data: PoseResponse = JSON.parse(event.data);

          if (data.type === "feedback" && data.feedback) {
            setFeedback(data.feedback);
            if (data.annotated_frame) {
              // Use requestAnimationFrame to update frame smoothly
              requestAnimationFrame(() => {
                setAnnotatedFrame(data.annotated_frame || null);
              });
            }
            if (data.rep_count !== undefined) {
              // Always update rep count, even if it's the same value
              // This ensures the UI stays in sync
              setRepCount(prevCount => {
                if (data.rep_count !== undefined && data.rep_count !== prevCount) {
                  console.log(`Rep count updated: ${prevCount} -> ${data.rep_count}`);
                }
                return data.rep_count;
              });
            }
          } else if (data.type === "error") {
            console.error("Pose detection error:", data.message);
            setError(data.message || "Unknown error");
          }

          // Mark processing as complete and process next frame in queue
          processingRef.current = false;
          
          // Process next frame if available
          if (frameQueueRef.current.length > 0) {
            processingRef.current = true;
            const frame = frameQueueRef.current.shift();
            
            if (frame && ws.readyState === WebSocket.OPEN) {
              const message = {
                type: "frame",
                data: frame,
                exercise: exerciseTypeRef.current,
              };
              
              // Log exercise type on first frame
              if (!window.exerciseTypeLogged) {
                console.log(`[WebSocket] Sending frames with exercise type: ${exerciseTypeRef.current}`);
                window.exerciseTypeLogged = true;
              }
              
              try {
                ws.send(JSON.stringify(message));
              } catch (err) {
                console.error("Failed to send frame:", err);
                processingRef.current = false;
              }
            } else {
              processingRef.current = false;
            }
          }
        } catch (err) {
          console.error("Failed to parse WebSocket message:", err);
          processingRef.current = false;
        }
      };

      ws.onerror = (event) => {
        console.error("WebSocket error:", event);
        setError("Connection error - is the backend running?");
        setIsConnected(false);
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);
        wsRef.current = null;

        // Attempt to reconnect after 3 seconds if still enabled
        if (enabled) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log("Attempting to reconnect...");
            connect();
          }, 3000);
        }
      };

      wsRef.current = ws;
    } catch (err) {
      console.error("Failed to create WebSocket:", err);
      setError("Failed to connect to pose detection service");
    }
  }, [enabled]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setIsConnected(false);
    setFeedback([]);
    setAnnotatedFrame(null);
  }, []);

  const sendFrame = useCallback(
    (frameData: string) => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        return;
      }

      // Add to queue
      frameQueueRef.current.push(frameData);

      // Process queue if not already processing
      if (!processingRef.current && frameQueueRef.current.length > 0) {
        processingRef.current = true;
        const frame = frameQueueRef.current.shift();

        if (frame) {
          const message = {
            type: "frame",
            data: frame,
            exercise: exerciseTypeRef.current,
          };

          try {
            wsRef.current.send(JSON.stringify(message));
          } catch (err) {
            console.error("Failed to send frame:", err);
            processingRef.current = false;
          }
        }
      }

      // Keep only the latest frame in queue to avoid lag
      // Aggressively drop old frames to maintain smooth video
      if (frameQueueRef.current.length > 1) {
        frameQueueRef.current = [frameQueueRef.current[frameQueueRef.current.length - 1]];
      }
    },
    [exerciseType]
  );

  useEffect(() => {
    if (enabled) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [enabled, connect, disconnect]);

  return {
    feedback,
    annotatedFrame,
    isConnected,
    error,
    sendFrame,
    repCount,
  };
}

