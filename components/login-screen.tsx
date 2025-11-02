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
  Person,
  LocalHospital,
  Login,
  PersonOutline,
  Favorite,
  Security,
} from "@mui/icons-material";

interface LoginScreenProps {
  onPatientLogin: () => void;
  onEmployeeLogin: () => void;
}

export function LoginScreen({ onPatientLogin, onEmployeeLogin }: LoginScreenProps) {
  const patientGradient = "linear-gradient(135deg, #012a4a 0%, #01497c 100%)";
  const employeeGradient = "linear-gradient(135deg, #2a6f97 0%, #61a5c2 100%)";

  return (
    <Box
      className="hide-scrollbar"
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100%",
        background: "linear-gradient(135deg, #012a4a 0%, #01497c 50%, #2a6f97 100%)",
        position: "relative",
        overflowY: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pb: 4,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: [
            "radial-gradient(circle at 15% 25%, rgba(255,255,255,0.15) 0%, transparent 40%)",
            "radial-gradient(circle at 85% 75%, rgba(255,255,255,0.12) 0%, transparent 40%)",
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)",
          ].join(", "),
          pointerEvents: "none",
          zIndex: 0,
        },
        "&::-webkit-scrollbar": {
          display: "none !important",
        },
      }}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      } as React.CSSProperties}
    >
      <Container
        maxWidth="sm"
        sx={{
          pt: 40,
          pb: 4,
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100%",
        }}
      >
        {/* Header with Logo/Brand */}
        <Fade in timeout={600}>
          <Box
            sx={{
              textAlign: "center",
              mb: 5,
              position: "relative",
              mt: 20,
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    background: "rgba(255, 255, 255, 0.25)",
                    backdropFilter: "blur(10px)",
                    border: "3px solid rgba(255, 255, 255, 0.4)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
                    fontSize: "3.5rem",
                  }}
                >
                  <Favorite sx={{ fontSize: 56, color: "#ffffff" }} />
                </Avatar>
              </Box>
            </motion.div>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: "white",
                mb: 1,
                textShadow: "0 4px 12px rgba(0,0,0,0.2)",
                letterSpacing: "-0.03em",
                fontSize: { xs: "2.5rem", sm: "3rem" },
              }}
            >
              Wellness Warriors
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.95)",
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}
            >
              Choose your login type to continue
            </Typography>
          </Box>
        </Fade>

        {/* Login Cards */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mb: 4,
          }}
        >
          {/* Patient Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card
              sx={{
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(20px)",
                borderRadius: 4,
                border: "2px solid rgba(1, 42, 74, 0.2)",
                boxShadow: "0 8px 32px rgba(1, 42, 74, 0.25)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 6,
                  background: patientGradient,
                  transition: "height 0.3s ease",
                },
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 16px 48px rgba(1, 42, 74, 0.35)",
                  borderColor: "rgba(1, 42, 74, 0.4)",
                  "&::before": {
                    height: 8,
                  },
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Box
                      sx={{
                        width: 88,
                        height: 88,
                        borderRadius: 4,
                        background: patientGradient,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        boxShadow: "0 8px 24px rgba(1, 42, 74, 0.4)",
                      }}
                    >
                      <Person sx={{ fontSize: 48, color: "white" }} />
                    </Box>
                  </motion.div>

                  {/* Title & Description */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      mb: 1.5,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Patient Login
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mb: 4,
                      lineHeight: 1.7,
                      maxWidth: "90%",
                    }}
                  >
                    Access your exercise plans, track progress, and communicate
                    with your therapist
                  </Typography>

                  {/* Buttons */}
                  <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={onPatientLogin}
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<Login sx={{ fontSize: 20 }} />}
                        sx={{
                          background: patientGradient,
                          color: "white",
                          py: 2,
                          borderRadius: 3,
                          textTransform: "none",
                          fontWeight: 700,
                          fontSize: "1.125rem",
                          boxShadow: "0 8px 24px rgba(1, 42, 74, 0.4)",
                          "&:hover": {
                            background: patientGradient,
                            boxShadow: "0 12px 32px rgba(1, 42, 74, 0.5)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                    Sign In as Patient
                  </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                  <Button
                    onClick={onPatientLogin}
                        fullWidth
                        variant="outlined"
                        size="large"
                        startIcon={<PersonOutline sx={{ fontSize: 20 }} />}
                        sx={{
                          borderColor: "rgba(1, 42, 74, 0.3)",
                          color: "text.primary",
                          py: 1.75,
                          borderRadius: 3,
                          textTransform: "none",
                          fontWeight: 600,
                          borderWidth: 2,
                          "&:hover": {
                            borderColor: "rgba(1, 42, 74, 0.5)",
                            backgroundColor: "rgba(1, 42, 74, 0.05)",
                            borderWidth: 2,
                          },
                        }}
                      >
                        Continue as Guest
                  </Button>
                    </motion.div>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* Employee Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card
              sx={{
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(20px)",
                borderRadius: 4,
                border: "2px solid rgba(42, 111, 151, 0.2)",
                boxShadow: "0 8px 32px rgba(42, 111, 151, 0.25)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 6,
                  background: employeeGradient,
                  transition: "height 0.3s ease",
                },
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 16px 48px rgba(42, 111, 151, 0.35)",
                  borderColor: "rgba(42, 111, 151, 0.4)",
                  "&::before": {
                    height: 8,
                  },
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Box
                      sx={{
                        width: 88,
                        height: 88,
                        borderRadius: 4,
                        background: employeeGradient,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        boxShadow: "0 8px 24px rgba(42, 111, 151, 0.4)",
                      }}
                    >
                      <LocalHospital sx={{ fontSize: 48, color: "white" }} />
                    </Box>
                  </motion.div>

                  {/* Title & Description */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      mb: 1.5,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Employee Login
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mb: 4,
                      lineHeight: 1.7,
                      maxWidth: "90%",
                    }}
                  >
                    Manage patients, review exercises, create plans, and track
                    clinic performance
                  </Typography>

                  {/* Buttons */}
                  <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={onEmployeeLogin}
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<Security sx={{ fontSize: 20 }} />}
                        sx={{
                          background: employeeGradient,
                          color: "white",
                          py: 2,
                          borderRadius: 3,
                          textTransform: "none",
                          fontWeight: 700,
                          fontSize: "1.125rem",
                          boxShadow: "0 8px 24px rgba(42, 111, 151, 0.4)",
                          "&:hover": {
                            background: employeeGradient,
                            boxShadow: "0 12px 32px rgba(42, 111, 151, 0.5)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                    Sign In as Employee
                  </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                  <Button
                    onClick={onEmployeeLogin}
                        fullWidth
                        variant="outlined"
                        size="large"
                        startIcon={<PersonOutline sx={{ fontSize: 20 }} />}
                        sx={{
                          borderColor: "rgba(42, 111, 151, 0.3)",
                          color: "text.primary",
                          py: 1.75,
                          borderRadius: 3,
                          textTransform: "none",
                          fontWeight: 600,
                          borderWidth: 2,
                          "&:hover": {
                            borderColor: "rgba(42, 111, 151, 0.5)",
                            backgroundColor: "rgba(42, 111, 151, 0.05)",
                            borderWidth: 2,
                          },
                        }}
                      >
                        Continue as Guest
                  </Button>
                    </motion.div>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        {/* Footer */}
        <Fade in timeout={1000}>
          <Box
            sx={{
              textAlign: "center",
              mt: 2,
              px: 3,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.75rem",
                lineHeight: 1.6,
              }}
            >
              Continue as guest to explore the platform without creating an account
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

