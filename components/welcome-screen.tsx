"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, SkipForward } from "lucide-react";

interface WelcomeScreenProps {
  onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [step, setStep] = useState(0);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xl'>('large');
  
  const steps = [
    {
      title: "Welcome to Wellness Warriors!",
      description: "We'll help you stay active and check your exercise form.",
      highlight: true
    },
    {
      title: "Record Your Exercises",
      description: "Tap the button to record your exercise. The app will guide you through each movement.",
      tutorial: "Tap the record button when you're ready to start."
    },
    {
      title: "Get Real-time Feedback",
      description: "Our AI watches your form and gives you friendly tips to help you exercise safely.",
      tutorial: "Watch for green checkmarks when your form is perfect!"
    }
  ];

  const currentStep = steps[step];
  
  const textSizeClasses = {
    normal: 'text-2xl',
    large: 'text-4xl',
    xl: 'text-5xl'
  };

  const descSizeClasses = {
    normal: 'text-base',
    large: 'text-xl',
    xl: 'text-2xl'
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 pb-12 overflow-y-auto">
      {/* Accessibility Controls */}
      <div className="absolute top-16 right-4 z-30 flex flex-col gap-2">
        <button
          onClick={() => setTextSize(textSize === 'normal' ? 'large' : textSize === 'large' ? 'xl' : 'normal')}
          className="bg-white/90 backdrop-blur-sm shadow-lg px-3 py-2 rounded-full text-xs font-semibold text-gray-700 hover:bg-white transition-colors"
          aria-label="Adjust text size"
        >
          Aa {textSize.toUpperCase()}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full space-y-8">
        {/* Step Indicator */}
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === step ? 'w-8 bg-blue-600' : 'w-2 bg-blue-200'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-6 w-full"
        >
          {currentStep.highlight && (
            <div className="text-6xl mb-4">👋</div>
          )}
          
          <h1 className={`font-bold text-gray-900 leading-tight ${textSizeClasses[textSize]}`}>
            {currentStep.title}
          </h1>
          
          <p className={`text-gray-700 leading-relaxed px-4 ${descSizeClasses[textSize]}`}>
            {currentStep.description}
          </p>

          {currentStep.tutorial && (
            <div className="bg-blue-100/80 border-2 border-blue-300 rounded-2xl p-4 mt-6">
              <p className={`text-blue-900 font-medium ${descSizeClasses[textSize]}`}>
                💡 {currentStep.tutorial}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 w-full max-w-md">
        <Button
          onClick={handleSkip}
          variant="outline"
          size="lg"
          className="flex-1 h-14 text-lg font-semibold border-2"
        >
          <SkipForward className="mr-2 w-5 h-5" />
          Skip
        </Button>
        
        <Button
          onClick={handleNext}
          size="lg"
          className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600"
        >
          {step === steps.length - 1 ? 'Get Started' : 'Continue'}
          <Play className="ml-2 w-5 h-5" />
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="text-sm text-gray-500 font-medium">
        Step {step + 1} of {steps.length}
      </div>
    </div>
  );
}

