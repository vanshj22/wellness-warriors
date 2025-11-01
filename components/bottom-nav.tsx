"use client";
import { Home, HelpCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "help", label: "Help", icon: HelpCircle },
    { id: "profile", label: "Profile", icon: User }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all",
                isActive 
                  ? "text-blue-600 font-semibold" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Icon className={cn(
                "w-6 h-6 transition-all",
                isActive && "scale-110"
              )} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
      {/* Safe area for home indicator */}
      <div className="h-4" />
    </div>
  );
}

