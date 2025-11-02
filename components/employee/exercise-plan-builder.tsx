"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ExercisePlanBuilderProps {
  onBack: () => void;
  onComplete: () => void;
}

export function ExercisePlanBuilder({ onBack, onComplete }: ExercisePlanBuilderProps) {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col pt-[72px]">
      <div className="bg-white border-b px-6 py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">Exercise Plan Builder</h1>
        <div className="ml-auto flex gap-2">
          <span className="text-sm text-gray-600">Step {step} of 5</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Exercise Plan Builder</h2>
              <p className="text-gray-600 mb-8">
                This is a placeholder for the multi-step exercise plan builder.
                Steps include: Patient Selection, Template Selection, Exercise Library, Plan Configuration, and Review.
              </p>
              <Button onClick={onComplete}>Return to Dashboard</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

