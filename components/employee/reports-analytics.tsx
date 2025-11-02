"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ReportsAnalyticsProps {
  onBack: () => void;
}

export function ReportsAnalytics({ onBack }: ReportsAnalyticsProps) {
  return (
    <div className="w-full h-full bg-gray-50 flex flex-col pt-[72px]">
      <div className="bg-white border-b px-6 py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          <Card className="p-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Reports & Analytics</h2>
              <p className="text-gray-600 mb-8">
                This section includes Individual Patient Reports, Cohort Analysis, Clinic Performance Summary, and Compliance Reports.
              </p>
              <Button onClick={onBack}>Return to Dashboard</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

