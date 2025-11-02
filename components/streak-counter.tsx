"use client";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { LocalFireDepartment } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface StreakCounterProps {
  className?: string;
}

export function StreakCounter({ className }: StreakCounterProps) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Get streak from localStorage or initialize with default
    const savedStreak = localStorage.getItem("streak");
    const lastExerciseDate = localStorage.getItem("lastExerciseDate");
    const today = new Date().toDateString();

    if (!savedStreak && !lastExerciseDate) {
      // Initialize with a sample streak for demo
      const initialStreak = 3;
      setStreak(initialStreak);
      localStorage.setItem("streak", initialStreak.toString());
      localStorage.setItem("lastExerciseDate", today);
      return;
    }

    if (lastExerciseDate === today) {
      // Already exercised today, keep current streak
      setStreak(savedStreak ? parseInt(savedStreak) : 0);
    } else {
      // Check if last exercise was yesterday (consecutive)
      if (lastExerciseDate) {
        const lastDate = new Date(lastExerciseDate);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate.toDateString() === yesterday.toDateString()) {
          // Consecutive day, increment streak
          const newStreak = savedStreak ? parseInt(savedStreak) + 1 : 1;
          setStreak(newStreak);
          localStorage.setItem("streak", newStreak.toString());
          localStorage.setItem("lastExerciseDate", today);
        } else if (lastDate.toDateString() !== today) {
          // Broken streak, reset to 1
          setStreak(1);
          localStorage.setItem("streak", "1");
          localStorage.setItem("lastExerciseDate", today);
        }
      } else {
        // First time, use saved streak
        setStreak(savedStreak ? parseInt(savedStreak) : 0);
      }
    }
  }, []);

  if (streak === 0) {
    return null; // Don't show if no streak
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={className}
    >
      <Box
        sx={{
          background: "linear-gradient(135deg, #ff6b35 0%, #f97316 50%, #ea580c 100%)",
          borderRadius: 3,
          p: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 2,
          boxShadow: "0 4px 12px rgba(249, 115, 22, 0.25)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
            pointerEvents: "none",
          },
        }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: "2px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <LocalFireDepartment sx={{ fontSize: 32, color: "#ffffff", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }} />
          </Box>
        </motion.div>
        <Box sx={{ flex: 1, position: "relative", zIndex: 1 }}>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.9)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              mb: 0.25,
            }}
          >
            Daily Streak
          </Typography>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75 }}>
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1,
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              {streak}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.95)",
                lineHeight: 1,
              }}
            >
              day{streak !== 1 ? "s" : ""}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.95)",
              mt: 0.5,
              letterSpacing: "0.02em",
            }}
          >
            Keep it up! 💪
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}

