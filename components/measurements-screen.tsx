"use client";
import { motion } from "framer-motion";
import { TrendingUp, Weight, Ruler, Target } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProgressGraph } from "./progress-graph";
import { Box } from "@mui/material";

interface MeasurementsScreenProps {
  onBack: () => void;
}

export function MeasurementsScreen({ onBack }: MeasurementsScreenProps) {
  const [step, setStep] = useState<'weight' | 'height' | 'complete'>('weight');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  
  const hasData = weight && height;

  const handleNext = () => {
    if (step === 'weight' && weight) {
      setStep('height');
    } else if (step === 'height' && height) {
      setStep('complete');
    }
  };

  const handleBackToForm = () => {
    setStep('weight');
  };

  // Progress animation values
  const strengthProgress = 75; // "Getting stronger" indicator

  if (step === 'complete' && hasData) {
    return (
      <div className="w-full h-full flex flex-col bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-20 overflow-y-auto">
        {/* Header */}
        <div className="pt-16 px-6 pb-4">
          <Button
            onClick={handleBackToForm}
            variant="ghost"
            className="mb-4 -ml-2"
          >
            ← Back
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Progress</h1>
        </div>

        {/* Progress Cards */}
        <div className="px-6 space-y-4 mb-6">
          <Card className="p-6 bg-green-50 border-2 border-green-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-green-900">Getting Stronger!</h2>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg text-green-800">Your strength</span>
                <span className="text-2xl font-bold text-green-900">{strengthProgress}%</span>
              </div>
              {/* Animated progress bar */}
              <div className="h-6 bg-green-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${strengthProgress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-green-400 to-green-600"
                />
              </div>
            </div>
          </Card>

          {/* Weight Card */}
          <Card className="p-6 bg-white border-2 border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Weight className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Weight</h3>
                <p className="text-3xl font-bold text-blue-600">{weight} lbs</p>
                <p className="text-sm text-gray-500 mt-1">Last updated today</p>
              </div>
            </div>
          </Card>

          {/* Height Card */}
          <Card className="p-6 bg-white border-2 border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Ruler className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Height</h3>
                <p className="text-3xl font-bold text-purple-600">{height}"</p>
                <p className="text-sm text-gray-500 mt-1">Last updated today</p>
              </div>
            </div>
          </Card>

          {/* Progress Graph with Details */}
          <Box sx={{ mt: 2 }}>
            <ProgressGraph showDetail={true} />
          </Box>

          {/* Achievement Card */}
          <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🎉</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Keep Going!</h3>
                <p className="text-base text-gray-700">You're on track for your fitness goals</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Button */}
        <div className="px-6">
          <Button
            onClick={handleBackToForm}
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600"
          >
            Update Measurements
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="pt-16 px-6 pb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 -ml-2"
        >
          ← Back
        </Button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Body Measurements</h1>
        <p className="text-lg text-gray-600">Track your progress</p>
      </div>

      {/* Progress Steps */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className={`flex-1 h-2 rounded-full ${step === 'weight' ? 'bg-green-500' : 'bg-gray-200'}`} />
          <div className={`w-2 h-2 rounded-full mx-2 ${step === 'height' ? 'bg-green-500' : 'bg-gray-200'}`} />
          <div className={`flex-1 h-2 rounded-full ${step === 'complete' ? 'bg-green-500' : 'bg-gray-200'}`} />
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Weight</span>
          <span>Height</span>
          <span>Done</span>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <Card className="w-full max-w-md p-8 bg-white border-2 border-green-200">
          <div className="text-center space-y-6">
            {step === 'weight' && (
              <motion.div
                key="weight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-6xl">⚖️</div>
                <h2 className="text-3xl font-bold text-gray-900">Enter Your Weight</h2>
                <Input
                  type="number"
                  placeholder="Weight in lbs"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="text-2xl text-center h-16 text-gray-900"
                />
                <p className="text-base text-gray-600">
                  For example: 150
                </p>
                <Button
                  onClick={handleNext}
                  disabled={!weight}
                  size="lg"
                  className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 disabled:opacity-50"
                >
                  Next
                </Button>
              </motion.div>
            )}

            {step === 'height' && (
              <motion.div
                key="height"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-6xl">📏</div>
                <h2 className="text-3xl font-bold text-gray-900">Now, Your Height</h2>
                <Input
                  type="number"
                  placeholder="Height in inches"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="text-2xl text-center h-16 text-gray-900"
                />
                <p className="text-base text-gray-600">
                  For example: 65
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setStep('weight')}
                    variant="outline"
                    size="lg"
                    className="flex-1 h-16 text-xl font-semibold border-2"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!height}
                    size="lg"
                    className="flex-1 h-16 text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 disabled:opacity-50"
                  >
                    Done
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </Card>
      </div>

      {/* Camera Option */}
      <div className="px-6 pb-4">
        <Card className="p-4 bg-blue-50 border-2 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📷</div>
            <p className="text-base text-blue-900">
              Optional: Use camera for measurements (coming soon)
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

