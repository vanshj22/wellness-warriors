"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, Bell, Plus, Search, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmployeeTopNavProps {
  onMenuClick: () => void;
  onNotificationClick: () => void;
  onProfileClick: () => void;
  activePatientCount: number;
  onQuickAddPatient: () => void;
  onLogout?: () => void;
}

export function EmployeeTopNav({
  onMenuClick,
  onNotificationClick,
  onProfileClick,
  activePatientCount,
  onQuickAddPatient,
  onLogout,
}: EmployeeTopNavProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notificationCount] = useState(5);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="w-10 h-10"
        >
          <Menu className="w-6 h-6" />
        </Button>
        <div className="text-xl font-bold text-gray-900">Wellness Warriors</div>
      </div>

      {/* Center - Date/Time */}
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-900">{currentDate}</div>
          <div className="text-xs text-gray-600">{currentTime}</div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onNotificationClick}
          className="relative w-10 h-10"
        >
          <Bell className="w-6 h-6" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>

        {/* Quick Add Patient */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onQuickAddPatient}
          className="w-10 h-10"
          title="Quick Add Patient"
        >
          <Plus className="w-6 h-6" />
        </Button>

        {/* Search */}
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10"
        >
          <Search className="w-6 h-6" />
        </Button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="w-10 h-10 rounded-full"
          >
            <User className="w-6 h-6" />
          </Button>
          
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button
                onClick={() => {
                  onProfileClick();
                  setShowProfileDropdown(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button
                onClick={() => {
                  setShowProfileDropdown(false);
                  if (onLogout) onLogout();
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

