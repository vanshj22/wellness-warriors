"use client";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Fade,
} from "@mui/material";
import {
  PlayCircle,
  CalendarToday,
  People,
  Help,
  VolumeUp,
  TrendingUp,
  Chat,
  Person,
} from "@mui/icons-material";
import { useNarration } from "@/hooks/use-narration";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { speak } = useNarration(true);

  const narrateScreen = () => {
    speak(
      "Welcome to Wellness Warriors. You can record exercises, view your plan, or connect with the community. Tap any option to get started."
    );
  };

  const features = [
    {
      id: "exercises",
      title: "My Exercises",
      description: "Record and review form",
      icon: PlayCircle,
      color: "primary",
      gradient: "linear-gradient(135deg, #012a4a 0%, #01497c 100%)",
      onClick: () => onNavigate("exercises"),
    },
      {
        id: "plan",
        title: "My Plan",
        description: "See schedule",
        icon: CalendarToday,
        color: "secondary",
        gradient: "linear-gradient(135deg, #2a6f97 0%, #468faf 100%)",
        onClick: () => onNavigate("plan"),
      },
  ];

  return (
    <Box
      className="hide-scrollbar"
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100%",
        background: "linear-gradient(135deg, #012a4a 0%, #01497c 50%, #2a6f97 100%)",
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
          background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)",
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
      <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 }, position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Fade in timeout={600}>
          <Box sx={{ mb: 4, textAlign: "center", position: "relative" }}>
            <IconButton
              onClick={() => onNavigate("profile")}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                color: "white",
                backgroundColor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.25)",
                  borderColor: "rgba(255,255,255,0.5)",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
              aria-label="My Profile"
              title="My Profile"
              size="small"
            >
              <Person sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton
              onClick={narrateScreen}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                color: "white",
                backgroundColor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.25)",
                  borderColor: "rgba(255,255,255,0.5)",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
              aria-label="Narrate screen content"
              title="Narrate screen content"
              size="small"
            >
              <VolumeUp sx={{ fontSize: 20 }} />
            </IconButton>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "white",
                mb: 1,
                textShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              Wellness Warriors
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontWeight: 400,
              }}
            >
              Stay active, stay healthy!
            </Typography>
          </Box>
        </Fade>

        {/* Need Help Button - Prominent */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 2 }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => onNavigate("help")}
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(135deg, #014f86 0%, #2a6f97 100%)",
                  color: "white",
                  py: 2.5,
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  boxShadow: "0 8px 24px rgba(1, 79, 134, 0.4)",
                  borderRadius: 3,
                  textTransform: "none",
                  letterSpacing: "0.02em",
                  "&:hover": {
                    background: "linear-gradient(135deg, #01497c 0%, #014f86 100%)",
                    boxShadow: "0 12px 32px rgba(1, 79, 134, 0.5)",
                  },
                }}
                startIcon={<Help sx={{ fontSize: 24 }} />}
              >
                Need Help?
              </Button>
            </motion.div>
          </Box>
        </Fade>


        {/* Main Options Grid */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid item xs={12} key={feature.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  <Card
                    onClick={feature.onClick}
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
                        background: feature.gradient,
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
                            background: feature.gradient,
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
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: "text.primary",
                              mb: 0.5,
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ 
                              color: "text.secondary",
                              lineHeight: 1.6,
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>

        {/* Additional Options */}
        <Fade in timeout={1200}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                onClick={() => onNavigate("measurements")}
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "rgba(255,255,255,0.4)",
                  color: "white",
                  py: 2,
                  borderWidth: 2.5,
                  borderRadius: 3,
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.6)",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    borderWidth: 2.5,
                  },
                }}
                startIcon={<TrendingUp sx={{ fontSize: 20 }} />}
              >
                Track My Progress
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                onClick={() => onNavigate("feedback")}
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "rgba(255,255,255,0.4)",
                  color: "white",
                  py: 2,
                  borderWidth: 2.5,
                  borderRadius: 3,
                  backdropFilter: "blur(10px)",
                  background: "rgba(255,255,255,0.08)",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.6)",
                    backgroundColor: "rgba(255,255,255,0.18)",
                    borderWidth: 2.5,
                  },
                }}
                startIcon={<Chat sx={{ fontSize: 20 }} />}
              >
                Weekly Feedback
              </Button>
            </motion.div>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
