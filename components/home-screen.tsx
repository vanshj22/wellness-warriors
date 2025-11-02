"use client";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import {
  PlayCircle,
  CalendarToday,
  Person,
  MoreVert,
} from "@mui/icons-material";
import { useState } from "react";
import { Menu, MenuItem, Fab } from "@mui/material";
import { useNarration } from "@/hooks/use-narration";
import { ProgressGraph } from "./progress-graph";
import { Chatbot } from "./chatbot";
import { StreakCounter } from "./streak-counter";
import { Chat } from "@mui/icons-material";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onSelectExercise?: (exercise: any) => void;
}

export function HomeScreen({ onNavigate, onSelectExercise }: HomeScreenProps) {
  const { speak } = useNarration(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const open = Boolean(anchorEl);

  // Define exercise plans for every alternate date
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDay);

  // Generate exercise plans for alternate dates in the current week
  const exercisePlans: Record<number, any[]> = {};
  
  for (let i = 0; i < 7; i += 2) { // Every alternate day (0, 2, 4, 6)
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    const day = currentDate.getDate();
    
    // Rotate through different exercise sets
    if (i === 0 || i === 4) {
      // Sunday and Thursday - Squats & Pec Stretch
      exercisePlans[day] = [
        {
          id: "squats",
          name: "Squats",
          description: "Lower body strength exercise",
          sets: 3,
          reps: 10,
          instructions: [
            "Stand with feet shoulder-width apart",
            "Lower your body by bending your knees and pushing your hips back",
            "Keep your chest up and core engaged",
            "Push through your heels to return to starting position"
          ]
        },
        {
          id: "pec-stretch",
          name: "Pec Stretch",
          description: "Chest and shoulder flexibility exercise",
          sets: 3,
          reps: 30,
          instructions: [
            "Stand in a doorway with your arm at a 90-degree angle",
            "Place your forearm against the door frame",
            "Gently lean forward until you feel a stretch in your chest",
            "Hold for 30 seconds, then switch sides"
          ]
        }
      ];
    } else if (i === 2) {
      // Tuesday - Shoulder Flexion & Planks
      exercisePlans[day] = [
        {
          id: "shoulder-flexion",
          name: "Shoulder Flexion",
          description: "Shoulder mobility exercise",
          sets: 3,
          reps: 12,
          instructions: [
            "Stand with feet hip-width apart",
            "Raise your arms straight in front of you to shoulder height",
            "Hold for a moment, then lower back down",
            "Keep your core engaged throughout the movement"
          ]
        },
        {
          id: "planks",
          name: "Planks",
          description: "Core strength exercise",
          sets: 3,
          reps: 30,
          instructions: [
            "Start in a forearm plank position",
            "Keep your body in a straight line from head to heels",
            "Engage your core and hold the position",
            "Breathe steadily throughout"
          ]
        }
      ];
    } else if (i === 6) {
      // Saturday - Leg Raises & Wall Push-ups
      exercisePlans[day] = [
        {
          id: "leg-raises",
          name: "Leg Raises",
          description: "Core and hip flexor exercise",
          sets: 3,
          reps: 10,
          instructions: [
            "Lie on your back with legs straight",
            "Place your hands under your lower back for support",
            "Raise your legs until they're perpendicular to the floor",
            "Lower them slowly without touching the ground"
          ]
        },
        {
          id: "wall-pushups",
          name: "Wall Push-ups",
          description: "Upper body strength exercise",
          sets: 2,
          reps: 8,
          instructions: [
            "Stand facing a wall with arms extended at shoulder height",
            "Place your palms flat against the wall",
            "Bend your elbows and lean toward the wall",
            "Push back to starting position"
          ]
        }
      ];
    }
  }

  const selectedExercises = exercisePlans[selectedDate] || [];

  const narrateScreen = () => {
    speak("Tap Exercises to record or Plan to view your schedule.");
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleMoreOption = (screen: string) => {
    onNavigate(screen);
    handleMoreClose();
  };

  const handleExerciseClick = (exercise: any) => {
    if (onSelectExercise) {
      onSelectExercise(exercise);
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
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
      <Container maxWidth="sm" sx={{ py: 4, px: 3, position: "relative" }}>
        {/* Header */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <IconButton
            onClick={() => onNavigate("profile")}
              sx={{
              color: "#1a1a1a",
                "&:hover": {
                backgroundColor: "rgba(0,0,0,0.05)",
                },
              }}
            aria-label="Profile"
            >
            <Person />
            </IconButton>
            <Typography
            variant="h5"
              sx={{
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
              }}
            >
              Wellness Warriors
            </Typography>
          <IconButton
            onClick={handleMoreClick}
              sx={{
              color: "#1a1a1a",
                  "&:hover": {
                backgroundColor: "rgba(0,0,0,0.05)",
                  },
                }}
            aria-label="More"
              >
            <MoreVert />
          </IconButton>
          </Box>

        {/* More Options Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMoreClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => handleMoreOption("help")}>Help</MenuItem>
          <MenuItem onClick={() => handleMoreOption("feedback")}>Weekly Feedback</MenuItem>
          <MenuItem onClick={narrateScreen}>Narrate</MenuItem>
        </Menu>

        {/* Streak Counter */}
        <Box sx={{ mb: 2 }}>
          <StreakCounter />
        </Box>

          {/* Calendar and Exercise Plan */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: 3,
                  border: "1px solid #e0e0e0",
                  overflow: "hidden",
                }}
              >
                {/* Calendar Header */}
                <Box
                  sx={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    p: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 700,
                    }}
                  >
                    {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </Typography>
                  <CalendarToday sx={{ fontSize: 24 }} />
                </Box>

                {/* Calendar Grid - Current Week Only */}
                <Box sx={{ p: 2 }}>
                  {/* Day Headers */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gap: 0.5,
                      mb: 1,
                    }}
                  >
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <Box
                        key={day}
                        sx={{
                          textAlign: "center",
                          py: 0.5,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#666666",
                            textTransform: "uppercase",
                          }}
                        >
                          {day}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Calendar Days - Current Week */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gap: 0.5,
                    }}
                  >
                    {(() => {
                      const today = new Date();
                      const currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday
                      
                      // Calculate the start of the current week (Sunday)
                      const startOfWeek = new Date(today);
                      startOfWeek.setDate(today.getDate() - currentDay);
                      
                      // Exercise data for calendar based on exercisePlans
                      const exerciseData: Record<number, { exercises: string[]; completed: boolean }> = {};
                      Object.keys(exercisePlans).forEach(dateStr => {
                        const date = parseInt(dateStr);
                        const exercises = exercisePlans[date];
                        const isCompleted = date < today.getDate(); // Past dates are completed
                        exerciseData[date] = {
                          exercises: exercises.map(ex => ex.name),
                          completed: isCompleted
                        };
                      });

                      const days = [];
                      
                      // Display 7 days (current week)
                      for (let i = 0; i < 7; i++) {
                        const currentDate = new Date(startOfWeek);
                        currentDate.setDate(startOfWeek.getDate() + i);
                        const day = currentDate.getDate();
                        
                        const isToday = day === today.getDate() && currentDate.getMonth() === today.getMonth();
                        const isSelected = day === selectedDate;
                        const hasExercises = exerciseData[day];
                        const isCompleted = hasExercises?.completed;

                        days.push(
                          <Box
                            key={day}
                            onClick={() => hasExercises && setSelectedDate(day)}
                            sx={{
                              aspectRatio: "1",
                              p: 0.5,
                              position: "relative",
                            }}
                          >
                            <Box
                              sx={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 1.5,
                                backgroundColor: isSelected ? "#000000" : hasExercises ? (isCompleted ? "#dcfce7" : "#f3f4f6") : "transparent",
                                border: hasExercises && !isSelected ? (isCompleted ? "1px solid #86efac" : "1px solid #e0e0e0") : isToday && !isSelected ? "2px solid #000000" : "none",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 0.5,
                                cursor: hasExercises ? "pointer" : "default",
                                transition: "all 0.2s",
                                "&:hover": hasExercises ? {
                                  transform: "scale(1.05)",
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                } : {},
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: isSelected || isToday ? 700 : 600,
                                  color: isSelected ? "#ffffff" : "#1a1a1a",
                                }}
                              >
                                {day}
                              </Typography>
                              {hasExercises && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: 0.3,
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                  }}
                                >
                                  {hasExercises.exercises.slice(0, 3).map((_, idx) => (
                                    <Box
                                      key={idx}
                                      sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: "50%",
                                        backgroundColor: isSelected ? "#ffffff" : (isCompleted ? "#22c55e" : "#f97316"),
                                      }}
                                    />
                                  ))}
                                </Box>
                              )}
                            </Box>
                          </Box>
                        );
                      }

                      return days;
                    })()}
                  </Box>
                </Box>

                {/* Selected Date's Exercises */}
                <Box sx={{ p: 3, pt: 2, borderTop: "1px solid #e0e0e0" }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      mb: 2,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {selectedDate === new Date().getDate() ? "Today's Exercises" : `Exercises for ${new Date(new Date().getFullYear(), new Date().getMonth(), selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                  </Typography>

                  {selectedExercises.length > 0 ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                      {selectedExercises.map((exercise, index) => (
              <Button
                        key={exercise.id}
                        onClick={() => handleExerciseClick(exercise)}
                fullWidth
                sx={{
                backgroundColor: "#f5f5f5",
                color: "#1a1a1a",
                          py: 2,
                          px: 2.5,
                          borderRadius: 2,
                  textTransform: "none",
                          justifyContent: "space-between",
                border: "1px solid #e0e0e0",
                  "&:hover": {
                  backgroundColor: "#ebebeb",
                            border: "1px solid #d0d0d0",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: "#f97316",
                            }}
                          />
                          <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
                            {exercise.name}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: "13px", color: "#666666" }}>
                          {exercise.sets} sets × {exercise.reps} reps
                        </Typography>
              </Button>
                      ))}
                    </Box>
                  ) : (
                    <Box sx={{ py: 3, textAlign: "center" }}>
                      <Typography sx={{ fontSize: "14px", color: "#666666" }}>
                        No exercises scheduled for this day
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </motion.div>

          {/* Progress Graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ProgressGraph />
          </motion.div>
        </Box>
      </Container>
      </Box>

      {/* Chatbot Floating Button - Fixed to bottom, outside scroll container */}
      <Fab
        onClick={() => setChatbotOpen(true)}
        sx={{
          position: "absolute",
          bottom: 100,
          right: 16,
          backgroundColor: "#000000",
          color: "#ffffff",
          width: 56,
          height: 56,
          zIndex: 1500,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          "&:hover": {
            backgroundColor: "#1a1a1a",
            boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
          },
        }}
        aria-label="Open chatbot"
      >
        <Chat />
      </Fab>

      {/* Chatbot */}
      <Chatbot open={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </Box>
  );
}
