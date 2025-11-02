"use client";
import { ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmployeeSettingsProps {
  onBack: () => void;
  onLogout: () => void;
}

export function EmployeeSettings({ onBack, onLogout }: EmployeeSettingsProps) {
  return (
    <div className="w-full h-full bg-gray-50 flex flex-col pt-[72px]">
      <div className="bg-white border-b px-6 py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">Settings & Configuration</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
            <p className="text-gray-600">Profile photo, credentials, contact info, and digital signature settings.</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
            <p className="text-gray-600">Configure alerts for patient missed sessions, pain escalation, video reviews, etc.</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Working Hours</h2>
            <p className="text-gray-600">Set availability calendar and buffer times between appointments.</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Security & Privacy</h2>
            <p className="text-gray-600">Two-factor authentication, password change, and data retention policies.</p>
          </Card>

          <Card className="p-6 border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Logout</h2>
                <p className="text-gray-600">Sign out of your account</p>
              </div>
              <Button variant="destructive" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

