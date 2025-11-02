"use client";
import { motion } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";
import { Person } from "@mui/icons-material";

interface LoginScreenProps {
  onPatientLogin: () => void;
  onEmployeeLogin: () => void; // Still needed for interface compatibility
}

export function LoginScreen({ onPatientLogin }: LoginScreenProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 6,
        px: 3,
        pt: { xs: 12, sm: 16 },
        pb: 8,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: [
            "radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)",
          ].join(", "),
          pointerEvents: "none",
        },
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          left: "15%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "-0.02em",
            fontSize: { xs: "2.5rem", sm: "3.5rem" },
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          Wellness Warriors
        </Typography>
        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.95)",
            textAlign: "center",
            fontSize: "1.1rem",
            mt: 1,
            fontWeight: 500,
          }}
        >
          Your Journey to Better Health
        </Typography>
      </motion.div>

      {/* Patient Login Button */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onPatientLogin}
            fullWidth
            variant="contained"
            startIcon={<Person sx={{ fontSize: 28 }} />}
            sx={{
              background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
              color: "#667eea",
              py: 3.5,
              borderRadius: 3,
              fontSize: "1.25rem",
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #ffffff 0%, #e8e8e8 100%)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Start Your Journey
          </Button>
        </motion.div>

        {/* Decorative particles around button */}
        <Box
          sx={{
            position: "absolute",
            top: -10,
            left: -10,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.6)",
            animation: "float 3s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -15,
            right: -15,
            width: 25,
            height: 25,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.5)",
            animation: "float 4s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />
      </Box>
    </Box>
  );
}

