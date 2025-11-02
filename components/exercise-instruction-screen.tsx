"use client";
import { motion } from "framer-motion";
import { Play, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

  // Video URLs - replace these with actual exercise instruction video URLs
  // You can use YouTube embed URLs (format: https://www.youtube.com/embed/VIDEO_ID)
  // or direct video URLs
  const videoUrls: Record<string, string> = {
    squats: "", // Add YouTube embed URL or direct video URL here
    "assisted-shoulder-flexion": "", // Add video URL here
    "scaption-strengthening": "" // Add video URL here
  };

  const videoId = exercise.id.toLowerCase().replace(/\s+/g, "-");
  const videoUrl = exercise.videoUrl || videoUrls[videoId] || null;

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-y-auto">
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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{exercise.name}</h1>
        <p className="text-lg text-gray-600">{exercise.description}</p>
      </div>

      {/* Video Section */}
      <div className="px-6 mb-4">
        <Card className="p-6 bg-white border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Play className="w-6 h-6 text-blue-600" />
            Watch How to Do This Exercise
          </h2>
          
          {videoUrl ? (
            <div className="relative w-full rounded-xl overflow-hidden bg-black aspect-video mb-4">
              <iframe
                src={videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${exercise.name} instruction video`}
              />
              <div className="absolute bottom-4 right-4">
                <Button
                  onClick={() => setHasWatchedVideo(true)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  I've Watched This
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 aspect-video mb-4 flex items-center justify-center">
              <div className="text-center text-white p-6">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <p className="text-xl font-semibold mb-2">Instruction Video</p>
                <p className="text-sm text-gray-300 mb-4">
                  {exercise.name} demonstration video will appear here
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  (Add video URL in exercise-instruction-screen.tsx)
                </p>
                <Button
                  onClick={() => setHasWatchedVideo(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Continue to Recording
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Instructions */}
      <div className="px-6 mb-4">
        <Card className="p-6 bg-blue-50 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Step-by-Step Instructions</h3>
          <ol className="space-y-3">
            {exercise.instructions.map((instruction, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3 text-base text-gray-700"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <span className="flex-1 pt-1">{instruction}</span>
              </motion.li>
            ))}
          </ol>
        </Card>
      </div>

      {/* Tips */}
      <div className="px-6 mb-4">
        <Card className="p-6 bg-yellow-50 border-2 border-yellow-200">
          <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            💡 Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <span>Keep your core engaged throughout the movement</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <span>Move slowly and with control</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <span>Breathe naturally - don't hold your breath</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <span>Focus on proper form over speed or reps</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Start Recording Button - Sticky at bottom */}
      <div className="sticky bottom-0 left-0 right-0 p-4 pb-6 bg-gradient-to-t from-white via-white/95 to-transparent z-50 mt-auto">
        <Button
          onClick={() => onStartRecording(exercise.id)}
          size="lg"
          disabled={videoUrl ? !hasWatchedVideo : false}
          className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="mr-3 w-7 h-7" />
          Start Recording
        </Button>
        {videoUrl && !hasWatchedVideo && (
          <p className="text-sm text-gray-500 text-center mt-2">
            Please watch the instruction video before starting
          </p>
        )}
      </div>
    </div>
  );
}

