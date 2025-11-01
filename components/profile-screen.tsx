"use client";
import { motion } from "framer-motion";
import { User, Settings, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProfileScreenProps {
  onBack: () => void;
}

export function ProfileScreen({ onBack }: ProfileScreenProps) {
  const profileOptions = [
    {
      title: "My Account",
      icon: User,
      color: "bg-blue-500"
    },
    {
      title: "Settings",
      icon: Settings,
      color: "bg-gray-500"
    },
    {
      title: "Notifications",
      icon: Bell,
      color: "bg-purple-500"
    },
    {
      title: "Sign Out",
      icon: LogOut,
      color: "bg-red-500"
    }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-50 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="pt-16 px-6 pb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 -ml-2"
        >
          ← Back
        </Button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
      </div>

      {/* Profile Header */}
      <div className="px-6 mb-6">
        <Card className="p-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white border-0">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl">
              👤
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-1">John Doe</h2>
              <p className="text-indigo-100 text-lg">Member since 2024</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Profile Options */}
      <div className="flex-1 px-6 space-y-3 overflow-y-auto">
        {profileOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-5 bg-white border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-all active:scale-95">
                <div className="flex items-center gap-4">
                  <div className={`${option.color} p-3 rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 flex-1">
                    {option.title}
                  </h3>
                  <span className="text-gray-400">›</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Achievement Badge */}
      <div className="px-6 mt-6 mb-4">
        <Card className="p-6 bg-yellow-50 border-2 border-yellow-300">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🏆</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Keep It Up!</h3>
              <p className="text-base text-gray-700">
                You've completed 12 exercises this week
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

