"use client";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { WelcomeScreen } from "@/components/welcome-screen";
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
  const [showWelcome, setShowWelcome] = useState(true);
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

  const handleRecordingComplete = (videoBlob: Blob, repCount?: number) => {
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
            repCount: repCount || 0
          };
          savedVideos.push(videoData);
          localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
          console.log("Video saved successfully:", videoData.id, `Reps: ${repCount || 0}`);
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
        }} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  // Handle login
  const handlePatientLogin = () => {
    setUserType("patient");
    setShowWelcome(true);
  };

  const handleEmployeeLogin = () => {
    setUserType("employee");
  };

  const handleLogout = () => {
    setUserType(null);
    setShowWelcome(true);
    setCurrentScreen('home');
    setShowRecording(false);
    setShowFeedback(false);
    setSelectedExercise(null);
  };

  // Show login screen if no user type is selected
  if (userType === null) {
    return (
      <PhoneFrame>
        <LoginScreen
          onPatientLogin={handlePatientLogin}
          onEmployeeLogin={handleEmployeeLogin}
        />
      </PhoneFrame>
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
      {showWelcome ? (
        <WelcomeScreen onComplete={() => setShowWelcome(false)} />
      ) : (
        <>
          {renderScreen()}
          {!showRecording && !showFeedback && !selectedExercise && ['home', 'help', 'profile'].includes(currentScreen) && (
            <BottomNav activeTab={currentScreen} onNavigate={handleNavigate} />
          )}
        </>
      )}
    </PhoneFrame>
  );
}
