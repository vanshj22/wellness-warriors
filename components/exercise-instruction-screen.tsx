"use client";
import { motion } from "framer-motion";
import { Play, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ExerciseInstructionScreenProps {
  exercise: {
    id: string;
    name: string;
    description: string;
    videoUrl?: string;
    instructions: string[];
  };
  onBack: () => void;
  onStartRecording: (exerciseType?: string) => void;
}

export function ExerciseInstructionScreen({
  exercise,
  onBack,
  onStartRecording
}: ExerciseInstructionScreenProps) {
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);

  // Video URLs - can be local files in public folder or external URLs
  const videoUrls: Record<string, string> = {
    squats: "/videos/squat.mp4",
    "assisted-shoulder-flexion": "",
    "scaption-strengthening": ""
  };

  const videoId = exercise.id.toLowerCase().replace(/\s+/g, "-");
  const videoUrl = exercise.videoUrl || videoUrls[videoId] || null;
  const isLocalVideo = videoUrl && !videoUrl.startsWith("http");

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-y-auto">
      {/* Header */}
      <div className="pt-16 px-6 pb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">{exercise.name}</h1>
      </div>

      {/* Video Section */}
      {videoUrl && (
        <div className="px-6 mb-4">
          <div className="relative w-full rounded-xl overflow-hidden bg-black aspect-video">
            {isLocalVideo ? (
              <video
                src={videoUrl}
                controls
                className="w-full h-full object-contain"
                onPlay={() => setHasWatchedVideo(true)}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${exercise.name} instruction video`}
              />
            )}
          </div>
        </div>
      )}

      {/* Instructions - Simplified */}
      <div className="px-6 mb-4">
        <div className="space-y-3">
          {exercise.instructions.slice(0, 3).map((instruction, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-3 text-lg text-gray-700"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-lg font-bold">
                {index + 1}
              </span>
              <span className="flex-1">{instruction}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Start Recording Button - Sticky at bottom */}
      <div className="sticky bottom-0 left-0 right-0 p-4 pb-6 bg-gradient-to-t from-white via-white/95 to-transparent z-50 mt-auto">
        <Button
          onClick={() => onStartRecording(exercise.id)}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-black hover:bg-gray-800 text-white shadow-lg"
        >
          <Play className="mr-2 w-5 h-5" />
          Start Recording
        </Button>
      </div>
    </div>
  );
}

