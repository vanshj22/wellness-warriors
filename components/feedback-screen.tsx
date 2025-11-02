"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, CheckCircle, AlertCircle, Activity, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FeedbackScreenProps {
  onBack: () => void;
}

export function FeedbackScreen({ onBack }: FeedbackScreenProps) {
  const [formData, setFormData] = useState({
    painLevel: 0,
    difficulty: "",
    painTiming: [] as string[]
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    "Pain Level",
    "Difficulty",
    "Pain Timing"
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePainTiming = (timing: string) => {
    setFormData(prev => ({
      ...prev,
      painTiming: prev.painTiming.includes(timing)
        ? prev.painTiming.filter(t => t !== timing)
        : [...prev.painTiming, timing]
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send data to backend
    console.log("Feedback submitted:", formData);
    setSubmitted(true);
    
    // Simulate API call
    setTimeout(() => {
      // Could navigate back or show success
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Pain Level
        return (
          <motion.div
            key="pain"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
                <Heart className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Pain Level</h2>
              <p className="text-gray-600 text-lg">On a scale of 0-10, how would you rate your pain?</p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-white to-red-50 border-2">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-pink-500 text-white mb-4">
                    <span className="text-5xl font-bold">{formData.painLevel}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formData.painLevel === 0 && "No pain"}
                    {formData.painLevel >= 1 && formData.painLevel <= 3 && "Mild pain"}
                    {formData.painLevel >= 4 && formData.painLevel <= 6 && "Moderate pain"}
                    {formData.painLevel >= 7 && formData.painLevel <= 9 && "Severe pain"}
                    {formData.painLevel === 10 && "Unbearable pain"}
                  </p>
                </div>

                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.painLevel}
                  onChange={(e) => updateFormData("painLevel", parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  style={{
                    background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${formData.painLevel * 10}%, #e5e7eb ${formData.painLevel * 10}%, #e5e7eb 100%)`
                  }}
                />

                <div className="flex justify-between text-xs text-gray-500 px-2">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
            </Card>
          </motion.div>
        );

      case 1: // Difficulty
        return (
          <motion.div
            key="difficulty"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 mb-4">
                <Activity className="w-10 h-10 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Exercise Difficulty</h2>
              <p className="text-gray-600 text-lg">How difficult were the exercises this week?</p>
            </div>

            <div className="space-y-2">
              {[
                { value: "very-easy", label: "Very Easy", emoji: "😊", color: "bg-green-500" },
                { value: "easy", label: "Easy", emoji: "🙂", color: "bg-green-400" },
                { value: "moderate", label: "Moderate", emoji: "😐", color: "bg-yellow-500" },
                { value: "difficult", label: "Difficult", emoji: "😓", color: "bg-orange-500" },
                { value: "very-difficult", label: "Very Difficult", emoji: "😰", color: "bg-red-500" }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => updateFormData("difficulty", option.value)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-3 rounded-lg border-2 transition-all ${
                    formData.difficulty === option.value
                      ? `border-blue-500 ${option.color} text-white shadow-md`
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{option.emoji}</span>
                    <span className="text-base font-medium flex-1 text-left">{option.label}</span>
                    {formData.difficulty === option.value && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 2: // Pain Timing
        return (
          <motion.div
            key="timing"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 mb-4">
                <AlertCircle className="w-10 h-10 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">When Does Pain Occur?</h2>
              <p className="text-gray-600 text-lg">Select all that apply</p>
            </div>

            <div className="space-y-2">
              {[
                { value: "during", label: "During exercises", emoji: "💪" },
                { value: "after", label: "After exercises", emoji: "😴" },
                { value: "morning", label: "In the morning", emoji: "🌅" },
                { value: "evening", label: "In the evening", emoji: "🌙" },
                { value: "constant", label: "Constant/ongoing", emoji: "⚠️" },
                { value: "none", label: "No pain", emoji: "✅" }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => togglePainTiming(option.value)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-3 rounded-lg border-2 transition-all ${
                    formData.painTiming.includes(option.value)
                      ? "border-blue-500 bg-blue-500 text-white shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{option.emoji}</span>
                    <span className="text-base font-medium flex-1 text-left">{option.label}</span>
                    {formData.painTiming.includes(option.value) && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-6 pb-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-green-500 mb-6">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-xl text-gray-600 mb-8">
            Your feedback has been submitted successfully.
          </p>
          <Button
            onClick={onBack}
            size="lg"
            className="w-full max-w-md h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500"
          >
            Done
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="pt-16 px-6 pb-4 sticky top-0 bg-gradient-to-b from-blue-50/95 to-transparent backdrop-blur-sm z-10">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Weekly Feedback</h1>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="px-6 py-4 border-t-2 border-gray-200 bg-white">
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="lg"
              className="flex-1 h-12 text-base font-semibold"
            >
              Previous
            </Button>
          )}
          <Button
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            size="lg"
            className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-500"
            disabled={
              (currentStep === 1 && !formData.difficulty) ||
              (currentStep === 2 && formData.painTiming.length === 0)
            }
          >
            {currentStep === steps.length - 1 ? "Submit Feedback" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

