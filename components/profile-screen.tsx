"use client";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Fade,
  Avatar,
} from "@mui/material";
import {
  Logout,
  Chat,
} from "@mui/icons-material";

interface ProfileScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
}

export function ProfileScreen({ onBack, onNavigate, onLogout }: ProfileScreenProps) {
  const profileOptions = [
    {
      title: "Weekly Feedback",
      icon: Chat,
      gradient: "linear-gradient(135deg, #61a5c2 0%, #89c2d9 100%)",
      action: "feedback",
    },
    {
      title: "Sign Out",
      icon: Logout,
      gradient: "linear-gradient(135deg, #2a6f97 0%, #014f86 100%)",
      action: "logout",
    },
  ];

  return (
    <Box
      className="hide-scrollbar"
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100%",
        background: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
        pb: 10,
        position: "relative",
        overflowY: "auto",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 25% 30%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.08) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        },
        "&::-webkit-scrollbar": {
          display: "none !important", // Chrome, Safari, Opera
        },
      }}
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE and Edge
      } as React.CSSProperties}
    >
      <Container maxWidth="sm" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Fade in timeout={600}>
          <Box sx={{ mb: 4 }}>
            <Button
              onClick={onBack}
              sx={{
                color: "white",
                mb: 2,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              ← Back
            </Button>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "white",
                mb: 1,
                textShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              My Profile
            </Typography>
          </Box>
        </Fade>

        {/* Profile Header */}
        <Fade in timeout={800}>
          <Card
            sx={{
              mb: 3,
              background: "linear-gradient(135deg, #012a4a 0%, #01497c 100%)",
              border: "3px solid rgba(255,255,255,0.3)",
              boxShadow: "0 12px 40px rgba(1, 42, 74, 0.3)",
              borderRadius: 4,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 16px 48px rgba(1, 42, 74, 0.4)",
              },
            }}
          >
            <CardContent sx={{ p: 3.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                <Avatar
                  sx={{
                    width: 88,
                    height: 88,
                    bgcolor: "rgba(255,255,255,0.25)",
                    fontSize: "2.75rem",
                    border: "3px solid rgba(255,255,255,0.4)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  👤
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: "white",
                      mb: 0.5,
                    }}
                  >
                    John Doe
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    Member since 2024
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>

        {/* Profile Options */}
        <Box sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
          {profileOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card
                  onClick={() => {
                    if (option.action === "feedback" && onNavigate) {
                      onNavigate("feedback");
                    } else if (option.action === "logout" && onLogout) {
                      onLogout();
                    }
                  }}
                  sx={{
                    cursor: option.action ? "pointer" : "default",
                    background: "rgba(255, 255, 255, 0.98)",
                    backdropFilter: "blur(10px)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 5,
                      background: option.gradient,
                      transition: "height 0.3s ease",
                    },
                    "&:hover": {
                      transform: option.action ? "translateY(-4px) scale(1.02)" : "none",
                      "&::before": {
                        height: option.action ? 6 : 5,
                      },
                      boxShadow: option.action ? "0 12px 32px rgba(0, 0, 0, 0.15)" : "none",
                    },
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 2.5 }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          background: option.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: 56,
                          height: 56,
                          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: option.action ? "scale(1.1) rotate(5deg)" : "none",
                          },
                        }}
                      >
                        <Icon sx={{ fontSize: 28, color: "white" }} />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                          flex: 1,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {option.title}
                      </Typography>
                      <Typography 
                        sx={{ 
                          color: "text.secondary", 
                          fontSize: "1.5rem",
                          fontWeight: 300,
                          transition: "all 0.3s ease",
                          ".MuiCard-root:hover &": {
                            transform: "translateX(4px)",
                            color: "primary.main",
                          },
                        }}
                      >
                        ›
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </Box>

        {/* Achievement Badge */}
        <Fade in timeout={1500}>
          <Card
            sx={{
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(10px)",
              border: "3px solid #fbbf24",
              borderRadius: 4,
              boxShadow: "0 8px 24px rgba(137, 194, 217, 0.25)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 32px rgba(137, 194, 217, 0.35)",
              },
            }}
          >
            <CardContent sx={{ p: 3.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                <Box
                  sx={{
                    fontSize: "3.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #89c2d9 0%, #a9d6e5 100%)",
                    boxShadow: "0 6px 16px rgba(137, 194, 217, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1) rotate(10deg)",
                    },
                  }}
                >
                  🏆
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      mb: 0.5,
                    }}
                  >
                    Keep It Up!
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    You've completed 12 exercises this week
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
}
