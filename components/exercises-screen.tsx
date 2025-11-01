"use client";
import { motion } from "framer-motion";
import { Play, Camera, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNarration } from "@/hooks/use-narration";

interface ExercisesScreenProps {
  onBack: () => void;
  onStartRecording: () => void;
}

export function ExercisesScreen({ onBack, onStartRecording }: ExercisesScreenProps) {
  const { speak } = useNarration(true);

  const narrateScreen = () => {
    speak("My Exercises screen. Tap Start Recording to begin recording your exercise. Make sure your whole body is visible in the frame.");
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="pt-16 px-6 pb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 -ml-2"
        >
          ← Back
        </Button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Exercises</h1>
        <p className="text-lg text-gray-600">Record and check your form</p>
      </div>

      {/* Instruction Card */}
      <div className="px-6 mb-6">
        <Card className="p-6 bg-blue-50 border-2 border-blue-300">
          <div className="flex items-start gap-3">
            <div className="text-3xl">📋</div>
            <div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Get Ready!
              </h3>
              <p className="text-base text-blue-800 leading-relaxed">
                Stand in the box and start your stretch. Make sure your whole body is visible in the frame.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Camera Preview Placeholder */}
      <div className="flex-1 px-6 mb-6">
        <div className="relative w-full h-full max-h-64 rounded-2xl overflow-hidden bg-gray-900 shadow-xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl">📷</div>
              <p className="text-white text-lg">Ready to record</p>
            </div>
          </div>
          
          {/* Person outline guide */}
          <div className="absolute inset-4 flex items-center justify-center">
            <div className="border-4 border-white/30 border-dashed rounded-xl h-3/4 w-2/3" />
          </div>
        </div>
      </div>

      {/* Narrate Button */}
      <div className="px-6 mb-4">
        <Button
          onClick={narrateScreen}
          variant="outline"
          size="sm"
          className="w-full h-12 border-2"
        >
          <Volume2 className="mr-2 w-5 h-5" />
          Narrate
        </Button>
      </div>

      {/* Start Recording Button */}
      <div className="px-6 pb-4">
        <Button
          onClick={onStartRecording}
          size="lg"
          className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
        >
          <Play className="mr-3 w-7 h-7" />
          Start Recording
        </Button>
      </div>
    </div>
  );
}

