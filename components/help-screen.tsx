"use client";
import { motion } from "framer-motion";
import { Phone, BookOpen, CircleHelp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface HelpScreenProps {
  onBack: () => void;
}

export function HelpScreen({ onBack }: HelpScreenProps) {
  const helpOptions = [
    {
      title: "Live Support",
      description: "Talk to a real person right now",
      icon: Phone,
      color: "bg-red-500",
      action: "Call 1-800-HELP-123"
    },
    {
      title: "Guided Tutorials",
      description: "Watch step-by-step videos",
      icon: BookOpen,
      color: "bg-blue-500",
      action: "Watch Tutorial"
    },
    {
      title: "FAQs",
      description: "Common questions answered",
      icon: CircleHelp,
      color: "bg-purple-500",
      action: "Browse FAQs"
    }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-orange-50 via-white to-red-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="pt-16 px-6 pb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 -ml-2"
        >
          ← Back
        </Button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Need Help?</h1>
        <p className="text-lg text-gray-600">We're here for you!</p>
      </div>

      {/* Help Options */}
      <div className="flex-1 px-6 space-y-4 overflow-y-auto">
        {helpOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-white border-2 border-gray-200 hover:border-orange-400 cursor-pointer transition-all active:scale-95">
                <div className="flex items-center gap-4">
                  <div className={`${option.color} p-4 rounded-2xl`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {option.title}
                    </h2>
                    <p className="text-base text-gray-600 mb-2">
                      {option.description}
                    </p>
                    <Button
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      {option.action}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Emergency Contact */}
      <div className="px-6 mt-6 mb-4">
        <Card className="p-6 bg-red-50 border-2 border-red-300">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🚨</div>
            <div>
              <h3 className="text-xl font-bold text-red-900 mb-1">Emergency?</h3>
              <p className="text-base text-red-800">
                Call 911 or your doctor immediately
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

