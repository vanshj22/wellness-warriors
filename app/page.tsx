"use client";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { HomeScreen } from "@/components/home-screen";
import { BottomNav } from "@/components/bottom-nav";
import { ExercisesScreen } from "@/components/exercises-screen";
import { RecordingScreen } from "@/components/recording-screen";
import { PlanScreen } from "@/components/plan-screen";
import { MeasurementsScreen } from "@/components/measurements-screen";
import { CommunityScreen } from "@/components/community-screen";
import { HelpScreen } from "@/components/help-screen";
import { ProfileScreen } from "@/components/profile-screen";
import { FeedbackScreen } from "@/components/feedback-screen";
import { ExerciseInstructionScreen } from "@/components/exercise-instruction-screen";
import { LoginScreen } from "@/components/login-screen";
import { EmployeeDashboard } from "@/components/employee/employee-dashboard";
import { useState } from "react";

type UserType = null | "patient" | "employee";

export default function Home() {
  const [userType, setUserType] = useState<UserType>(null);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showRecording, setShowRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [currentExerciseType, setCurrentExerciseType] = useState<"auto" | "squat" | "pushup">("auto");

  // Handle navigation
  const handleNavigate = (screen: string) => {
    if (screen === "feedback") {
      setShowFeedback(true);
    } else {
      setCurrentScreen(screen);
    }
    setShowRecording(false);
  };

  const handleBack = () => {
    if (showRecording) {
      setShowRecording(false);
    } else if (showFeedback) {
      setShowFeedback(false);
    } else if (selectedExercise) {
      setSelectedExercise(null);
    } else {
      setCurrentScreen('home');
    }
  };

  const handleStartRecording = (exerciseType?: string) => {
    // Set exercise type based on selected exercise
    if (exerciseType) {
      if (exerciseType === "squats" || exerciseType === "assisted-shoulder-flexion" || exerciseType === "scaption-strengthening") {
        setCurrentExerciseType("squat");
      } else {
        setCurrentExerciseType("auto");
      }
    } else if (selectedExercise) {
      // Use selected exercise type
      const exerciseId = selectedExercise.id?.toLowerCase() || "";
      if (exerciseId.includes("squat") || exerciseId.includes("shoulder") || exerciseId.includes("scaption")) {
        setCurrentExerciseType("squat");
      } else {
        setCurrentExerciseType("auto");
      }
    }
    setShowRecording(true);
  };

  const handleRecordingComplete = (videoBlob: Blob, repCount?: number, stoppedDueToPain?: boolean) => {
    // If stopped due to pain, show a message and don't show feedback screen
    if (stoppedDueToPain) {
      setShowRecording(false);
      // The alert has already been stored in localStorage by RecordingScreen
      // In a real app, this would notify the physio immediately
      alert("Exercise stopped due to excessive pain. Your physiotherapist has been notified.");
      return;
    }
    
    // Show feedback immediately
    setShowRecording(false);
    setShowFeedback(true);
    
    // Save video asynchronously in the background
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          const base64Video = reader.result as string;
          // Save to localStorage
          const savedVideos = JSON.parse(localStorage.getItem('savedVideos') || '[]');
          const videoData = {
            id: Date.now().toString(),
            data: base64Video,
            timestamp: new Date().toISOString(),
            size: videoBlob.size,
            type: videoBlob.type,
            repCount: repCount || 0,
            stoppedDueToPain: stoppedDueToPain || false
          };
          savedVideos.push(videoData);
          localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
          console.log("Video saved successfully:", videoData.id, `Reps: ${repCount || 0}`, stoppedDueToPain ? "(Stopped due to pain)" : "");
        } catch (error) {
          console.error("Error saving video to localStorage:", error);
        }
      };
      reader.onerror = () => {
        console.error("Error reading video file");
      };
      reader.readAsDataURL(videoBlob);
    } catch (error) {
      console.error("Error initiating video save:", error);
    }
  };

  // Main app navigation
  const renderScreen = () => {
    if (showRecording) {
      return (
        <RecordingScreen
          onBack={handleBack}
          onComplete={handleRecordingComplete}
          exerciseType={currentExerciseType}
        />
      );
    }

    if (showFeedback) {
      return (
        <FeedbackScreen
          onBack={handleBack}
        />
      );
    }

    if (selectedExercise) {
      return (
        <ExerciseInstructionScreen
          exercise={selectedExercise}
          onBack={handleBack}
          onStartRecording={handleStartRecording}
        />
      );
    }

    switch (currentScreen) {
      case 'exercises':
        return (
          <ExercisesScreen 
            onBack={handleBack} 
            onStartRecording={handleStartRecording}
            onSelectExercise={(exercise) => setSelectedExercise(exercise)}
          />
        );
      case 'plan':
        return <PlanScreen onBack={handleBack} />;
      case 'community':
        return <CommunityScreen onBack={handleBack} />;
      case 'measurements':
        return <MeasurementsScreen onBack={handleBack} />;
      case 'help':
        return <HelpScreen onBack={handleBack} />;
      case 'profile':
        return <ProfileScreen onBack={handleBack} onNavigate={(screen) => {
          if (screen === "feedback") {
            setShowFeedback(true);
          } else {
            handleNavigate(screen);
          }
        }} onLogout={handleLogout} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} onSelectExercise={(exercise) => setSelectedExercise(exercise)} />;
    }
  };

  // Handle login
  const handlePatientLogin = () => {
    setUserType("patient");
  };

  const handleEmployeeLogin = () => {
    setUserType("employee");
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentScreen('home');
    setShowRecording(false);
    setShowFeedback(false);
    setSelectedExercise(null);
  };

  // Show login screen if no user type is selected
  if (userType === null) {
    return (
      <div className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-6000"></div>
        </div>
        
        {/* Phone Frame with Patient Login */}
        <PhoneFrame>
          <LoginScreen
            onPatientLogin={handlePatientLogin}
            onEmployeeLogin={handleEmployeeLogin}
          />
        </PhoneFrame>
        
        {/* Employee Login Button - Bottom Right Corner */}
        <button
          onClick={handleEmployeeLogin}
          className="fixed bottom-6 right-6 py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-base hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105 z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Employee Login
        </button>
      </div>
    );
  }

  // Show employee dashboard
  if (userType === "employee") {
    return (
      <div className="w-full h-screen">
        <EmployeeDashboard onLogout={handleLogout} />
      </div>
    );
  }

  // Show patient app (existing functionality)
  return (
    <PhoneFrame>
      <div className="w-full h-full">
        {renderScreen()}
          {!showRecording && !showFeedback && !selectedExercise && ['home', 'community', 'profile'].includes(currentScreen) && (
            <BottomNav activeTab={currentScreen} onNavigate={handleNavigate} />
          )}
      </div>
    </PhoneFrame>
  );
}
