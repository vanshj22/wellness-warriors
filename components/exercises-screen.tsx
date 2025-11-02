"use client";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Chip,
  Fade,
  Paper,
} from "@mui/material";
import {
  PlayCircle,
  FitnessCenter,
  Accessible,
  ArrowForward,
  VolumeUp,
  Lightbulb,
  Visibility,
  Timer,
  LocalFireDepartment,
  WbSunny,
  Videocam,
  Straighten,
  HealthAndSafety,
} from "@mui/icons-material";
import { useNarration } from "@/hooks/use-narration";

interface ExercisesScreenProps {
  onBack: () => void;
  onStartRecording: () => void;
  onSelectExercise?: (exercise: any) => void;
}

const prescribedExercises = [
  {
    id: "squats",
    name: "Squats",
    description: "Lower body strength exercise",
    icon: FitnessCenter,
    color: "#2563eb",
    gradient: "linear-gradient(135deg, #012a4a 0%, #01497c 100%)",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower your body by bending your knees and pushing your hips back",
      "Keep your chest up and core engaged",
      "Lower until thighs are parallel to floor",
      "Push through heels to return to starting position",
    ],
  },
  {
    id: "assisted-shoulder-flexion",
    name: "Assisted Shoulder Flexion",
    description: "Shoulder mobility and strength",
    icon: Accessible,
    color: "#10b981",
    gradient: "linear-gradient(135deg, #01497c 0%, #012a4a 100%)",
    instructions: [
      "Stand or sit with good posture",
      "Raise your arm forward and upward",
      "Keep your elbow straight throughout the movement",
      "Lift as high as comfortable without pain",
      "Slowly lower back to starting position",
    ],
  },
  {
    id: "scaption-strengthening",
    name: "Scaption Strengthening",
    description: "Shoulder stabilization exercise",
    icon: PlayCircle,
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #468faf 0%, #61a5c2 100%)",
    instructions: [
      "Stand with arms at your sides",
      "Lift arms at a 45-degree angle (scapular plane)",
      "Thumbs should point up",
      "Raise to shoulder height or as high as comfortable",
      "Control the descent",
    ],
  },
  {
    id: "pec-stretch",
    name: "Pec Stretch (Neck, Right Shoulder)",
    description: "3 sets × 30 seconds daily",
    icon: Straighten,
    color: "#10b981",
    gradient: "linear-gradient(135deg, #2a6f97 0%, #61a5c2 100%)",
    instructions: [
      "Stand in a doorway with your arm at a 90-degree angle",
      "Gently lean forward until you feel a stretch in your chest",
      "Hold the stretch without causing shoulder pain",
      "Hold for 30 seconds, then release",
      "Repeat for 3 sets",
    ],
    importance: "Helps relieve tension in the pectoral muscles and improve posture.",
    frequency: "3 sets × 30 seconds daily",
  },
  {
    id: "neck-retractions",
    name: "Neck Retractions (Neck)",
    description: "3 sets × 10 reps daily",
    icon: HealthAndSafety,
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #01497c 0%, #2a6f97 100%)",
    instructions: [
      "Sit or stand with your back straight",
      "Gently pull your head back, keeping your chin tucked",
      "Hold for a moment, then release",
      "Repeat for 10 repetitions",
      "Complete 3 sets total",
    ],
    importance: "Improves neck posture and reduces strain on the cervical spine.",
    frequency: "3 sets × 10 reps daily",
  },
  {
    id: "scapular-retractions",
    name: "Scapular Retractions (Right Shoulder)",
    description: "3 sets × 10 reps daily",
    icon: FitnessCenter,
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #468faf 0%, #014f86 100%)",
    instructions: [
      "Stand or sit with your arms at your sides",
      "Squeeze your shoulder blades together",
      "Hold for a moment, then release",
      "Repeat for 10 repetitions",
      "Complete 3 sets total",
    ],
    importance: "Strengthens the muscles around the shoulder blades to improve posture.",
    frequency: "3 sets × 10 reps daily",
  },
];

const exerciseTips = [
  {
    icon: Lightbulb,
    title: "Proper Form",
    tip: "Focus on maintaining correct posture throughout each movement. Quality over quantity!",
    color: "#f59e0b",
  },
  {
    icon: Visibility,
    title: "Full Body Visibility",
    tip: "Make sure your entire body is visible in the frame before starting. Stand 6-8 feet from the camera.",
    color: "#06b6d4",
  },
  {
    icon: Timer,
    title: "Controlled Movements",
    tip: "Move slowly and deliberately. Don't rush through exercises - take your time with each rep.",
    color: "#8b5cf6",
  },
  {
    icon: LocalFireDepartment,
    title: "Warm Up First",
    tip: "Do a quick 2-3 minute warm-up before recording. Light stretching or gentle movements help prevent injury.",
    color: "#ef4444",
  },
  {
    icon: WbSunny,
    title: "Breathing",
    tip: "Don't hold your breath! Breathe naturally throughout the exercise. Inhale on the easier phase, exhale on exertion.",
    color: "#10b981",
  },
  {
    icon: Videocam,
    title: "Lighting & Space",
    tip: "Record in a well-lit area with enough space around you. Ensure good visibility of your body position.",
    color: "#2563eb",
  },
];

export function ExercisesScreen({
  onBack,
  onStartRecording,
  onSelectExercise,
}: ExercisesScreenProps) {
  const { speak } = useNarration(true);

  const narrateScreen = () => {
    speak(
      "My Exercises screen. Select an exercise to view instructions and start recording."
    );
  };

  const handleExerciseSelect = (exercise: any) => {
    if (onSelectExercise) {
      onSelectExercise(exercise);
    }
  };

  return (
    <Box
      className="hide-scrollbar"
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100%",
        background: "#ffffff",
        pb: 10,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none !important",
        },
      }}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      } as React.CSSProperties}
    >
      <Container maxWidth="sm" sx={{ py: 3, px: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button
            onClick={onBack}
            sx={{
              color: "#1a1a1a",
              textTransform: "none",
              fontWeight: 500,
              minWidth: "auto",
              px: 1,
              "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
            }}
          >
            ← Back
          </Button>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            Exercises
          </Typography>
          <Box sx={{ width: 64 }} /> {/* Spacer for centering */}
        </Box>
        
        {/* Exercise List - Hevy Style */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {prescribedExercises.map((exercise, index) => {
            const Icon = exercise.icon;
            return (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <Button
                  onClick={() => handleExerciseSelect(exercise)}
                  fullWidth
                  sx={{
                    cursor: "pointer",
                    background: "#ffffff",
                    color: "#1a1a1a",
                    borderRadius: 2,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    border: "1px solid #e0e0e0",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    px: 2.5,
                    py: 2.5,
                    minHeight: 80,
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      borderColor: "#d0d0d0",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        background: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: 56,
                        height: 56,
                      }}
                    >
                      <Icon sx={{ fontSize: 28, color: "#1a1a1a" }} />
                    </Box>
                    <Box sx={{ flex: 1, textAlign: "left" }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          color: "#1a1a1a",
                          mb: 0.25,
                        }}
                      >
                        {exercise.name}
                      </Typography>
                      {exercise.frequency && (
                        <Typography
                          variant="caption"
                          sx={{ color: "#666666", fontSize: "0.75rem" }}
                        >
                          {exercise.frequency}
                        </Typography>
                      )}
                    </Box>
                    <ArrowForward sx={{ color: "#999999", fontSize: 20 }} />
                  </Box>
                </Button>
              </motion.div>
            );
          })}
        </Box>


      </Container>
    </Box>
  );
}
