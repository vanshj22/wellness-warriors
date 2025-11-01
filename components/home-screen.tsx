"use client";
import { motion } from "framer-motion";
import { PlayCircle, Calendar, Users, Home, HelpCircle, User, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNarration } from "@/hooks/use-narration";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { speak } = useNarration(true);

  const narrateScreen = () => {
    speak("Welcome to Wellness Warriors. You can record exercises, view your plan, or connect with the community. Tap any option to get started.");
  };
  const features = [
    {
      id: "exercises",
      title: "My Exercises",
      description: "Record and review form",
      icon: PlayCircle,
      color: "bg-blue-500",
      onClick: () => {
        onNavigate("exercises");
      }
    },
    {
      id: "plan",
      title: "My Plan",
      description: "See schedule",
      icon: Calendar,
      color: "bg-purple-500",
      onClick: () => {
        onNavigate("plan");
      }
    },
    {
      id: "community",
      title: "My Community",
      description: "Meet others",
      icon: Users,
      color: "bg-green-500",
      onClick: () => {
        onNavigate("community");
      }
    }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="pt-16 px-6 pb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Wellness Warriors</h1>
        <p className="text-lg text-gray-600">Stay active, stay healthy!</p>
      </div>

      {/* Need Help Button - Prominent */}
      <div className="px-6 mb-4">
        <Button
          onClick={() => onNavigate("help")}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg"
        >
          <HelpCircle className="mr-2 w-6 h-6" />
          Need Help?
        </Button>
      </div>

      {/* Narrate Button */}
      <div className="px-6 mb-6">
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

      {/* Main Options Grid */}
      <div className="flex-1 px-6 space-y-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card
                onClick={feature.onClick}
                className="p-6 bg-white border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-all active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <div className={`${feature.color} p-4 rounded-2xl`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {feature.title}
                    </h2>
                    <p className="text-base text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Options */}
      <div className="px-6 mt-6 mb-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => onNavigate("measurements")}
            variant="outline"
            size="lg"
            className="w-full h-14 text-base font-semibold border-2"
          >
            📊 Track My Progress
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

