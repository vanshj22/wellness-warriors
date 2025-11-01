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
import { useState } from "react";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showRecording, setShowRecording] = useState(false);

  // Handle navigation
  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
    setShowRecording(false);
  };

  const handleBack = () => {
    if (showRecording) {
      setShowRecording(false);
    } else {
      setCurrentScreen('home');
    }
  };

  const handleStartRecording = () => {
    setShowRecording(true);
  };

  const handleRecordingComplete = (videoBlob: Blob) => {
    // Here you can save the video blob or do something with it
    console.log("Video recorded:", videoBlob);
    setShowRecording(false);
    setCurrentScreen('exercises');
  };

  // Main app navigation
  const renderScreen = () => {
    if (showRecording) {
      return (
        <RecordingScreen
          onBack={handleBack}
          onComplete={handleRecordingComplete}
        />
      );
    }

    switch (currentScreen) {
      case 'exercises':
        return <ExercisesScreen onBack={handleBack} onStartRecording={handleStartRecording} />;
      case 'plan':
        return <PlanScreen onBack={handleBack} />;
      case 'community':
        return <CommunityScreen onBack={handleBack} />;
      case 'measurements':
        return <MeasurementsScreen onBack={handleBack} />;
      case 'help':
        return <HelpScreen onBack={handleBack} />;
      case 'profile':
        return <ProfileScreen onBack={handleBack} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <PhoneFrame>
      {showWelcome ? (
        <WelcomeScreen onComplete={() => setShowWelcome(false)} />
      ) : (
        <>
          {renderScreen()}
          {!showRecording && ['home', 'help', 'profile'].includes(currentScreen) && (
            <BottomNav activeTab={currentScreen} onNavigate={handleNavigate} />
          )}
        </>
      )}
    </PhoneFrame>
  );
}
