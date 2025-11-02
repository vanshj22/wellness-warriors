"use client";
import { useState } from "react";
import { EmployeeTopNav } from "./employee-top-nav";
import { EmployeeHomeDashboard } from "./employee-home-dashboard";
import { PatientDetailView } from "./patient-detail-view";
import { ExercisePlanBuilder } from "./exercise-plan-builder";
import { ReportsAnalytics } from "./reports-analytics";
import { EmployeeSettings } from "./employee-settings";
import { ScheduleAppointment } from "./schedule-appointment";
import { ReviewPendingVideos } from "./review-pending-videos";

interface EmployeeDashboardProps {
  onLogout: () => void;
}

type DashboardView = "home" | "patient-detail" | "plan-builder" | "reports" | "settings" | "schedule" | "videos";

export function EmployeeDashboard({ onLogout }: EmployeeDashboardProps) {
  const [currentView, setCurrentView] = useState<DashboardView>("home");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient);
    setCurrentView("patient-detail");
  };

  const handleBack = () => {
    if (currentView !== "home") {
      setCurrentView("home");
      setSelectedPatient(null);
    }
  };

  const handleScheduleAppointment = () => setCurrentView("schedule");
  const handleCreatePlan = () => setCurrentView("plan-builder");
  const handleReviewVideos = () => setCurrentView("videos");
  const handleGenerateReports = () => setCurrentView("reports");

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50 overflow-hidden">
      <EmployeeTopNav
        onNotificationClick={() => {}}
        onProfileClick={() => setCurrentView("settings")}
        activePatientCount={12}
        onQuickAddPatient={() => {}}
        onLogout={onLogout}
      />
      
      <div className="flex-1 overflow-hidden">
        {currentView === "home" && (
          <EmployeeHomeDashboard 
            onPatientSelect={handlePatientSelect}
            onScheduleAppointment={handleScheduleAppointment}
            onCreatePlan={handleCreatePlan}
            onReviewVideos={handleReviewVideos}
            onGenerateReports={handleGenerateReports}
          />
        )}
        
        {currentView === "patient-detail" && selectedPatient && (
          <PatientDetailView
            patient={selectedPatient}
            onBack={handleBack}
          />
        )}
        
        {currentView === "schedule" && (
          <ScheduleAppointment
            onBack={handleBack}
            onScheduleComplete={() => setCurrentView("home")}
          />
        )}
        
        {currentView === "plan-builder" && (
          <ExercisePlanBuilder
            onBack={handleBack}
            onComplete={() => setCurrentView("home")}
          />
        )}
        
        {currentView === "videos" && (
          <ReviewPendingVideos
            onBack={handleBack}
            onPatientSelect={handlePatientSelect}
          />
        )}
        
        {currentView === "reports" && (
          <ReportsAnalytics onBack={handleBack} />
        )}
        
        {currentView === "settings" && (
          <EmployeeSettings onBack={handleBack} onLogout={onLogout} />
        )}
      </div>
    </div>
  );
}

