"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Fade,
} from "@mui/material";
import {
  Phone,
  MenuBook,
  Help as HelpIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

interface HelpScreenProps {
  onBack: () => void;
}

export function HelpScreen({ onBack }: HelpScreenProps) {
  const helpOptions = [
    {
      title: "Live Support",
      description: "Talk to a real person right now",
      icon: Phone,
      gradient: "linear-gradient(135deg, #014f86 0%, #2a6f97 100%)",
      action: "Call 1-800-HELP-123",
    },
    {
      title: "Guided Tutorials",
      description: "Watch step-by-step videos",
      icon: MenuBook,
      gradient: "linear-gradient(135deg, #012a4a 0%, #01497c 100%)",
      action: "Watch Tutorial",
    },
    {
      title: "FAQs",
      description: "Common questions answered",
      icon: HelpIcon,
      gradient: "linear-gradient(135deg, #468faf 0%, #61a5c2 100%)",
      action: "Browse FAQs",
    },
  ];

  return (
    <Box
      className="hide-scrollbar"
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100%",
        background: "linear-gradient(135deg, #014f86 0%, #2a6f97 100%)",
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
          background: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.12) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.08) 0%, transparent 50%)",
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
              Need Help?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontWeight: 400,
              }}
            >
              We're here for you!
            </Typography>
          </Box>
        </Fade>

        {/* Help Options */}
        <Box sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          {helpOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <Card
                  sx={{
                    cursor: "pointer",
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
                      transform: "translateY(-6px) scale(1.02)",
                      "&::before": {
                        height: 6,
                      },
                      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.2)",
                    },
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <CardContent sx={{ p: 3.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                      <Box
                        sx={{
                          p: 2.5,
                          borderRadius: 4,
                          background: option.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: 72,
                          height: 72,
                          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.1) rotate(5deg)",
                          },
                        }}
                      >
                        <Icon sx={{ fontSize: 36, color: "white" }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "text.primary",
                            mb: 0.5,
                          }}
                        >
                          {option.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", mb: 1.5 }}
                        >
                          {option.description}
                        </Typography>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            size="small"
                            variant="contained"
                            sx={{
                              background: option.gradient,
                              color: "white",
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 600,
                              px: 2.5,
                              py: 1,
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                              "&:hover": {
                                background: option.gradient,
                                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3)",
                                transform: "translateY(-1px)",
                              },
                            }}
                          >
                            {option.action}
                          </Button>
                        </motion.div>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </Box>

        {/* Emergency Contact */}
        <Fade in timeout={1200}>
          <Card
            sx={{
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(10px)",
              border: "3px solid #ef4444",
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(239, 68, 68, 0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 32px rgba(239, 68, 68, 0.3)",
              },
            }}
          >
            <CardContent sx={{ p: 3.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #01497c 0%, #013a63 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <WarningIcon sx={{ fontSize: 40, color: "#ffffff" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#dc2626",
                      mb: 0.5,
                    }}
                  >
                    Emergency?
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#991b1b" }}>
                    Call 911 or your doctor immediately
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
