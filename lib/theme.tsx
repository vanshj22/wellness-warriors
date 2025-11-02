"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#000000", // Black
      light: "#1a1a1a",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f97316", // Orange
      light: "#ff6b35",
      dark: "#ea580c",
      contrastText: "#ffffff",
    },
    success: {
      main: "#22c55e", // Green
      light: "#10b981",
      dark: "#16a34a",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f97316", // Orange
      light: "#fb923c",
      dark: "#ea580c",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ef4444", // Red
      light: "#f87171",
      dark: "#dc2626",
      contrastText: "#ffffff",
    },
    info: {
      main: "#1a1a1a", // Dark gray
      light: "#666666",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff", // White
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a", // Dark gray
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "1rem",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "1rem",
          fontWeight: 600,
          boxShadow: "none",
          textTransform: "none",
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          backgroundColor: "#000000",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#1a1a1a",
          },
        },
        outlined: {
          borderColor: "#e0e0e0",
          color: "#1a1a1a",
          "&:hover": {
            backgroundColor: "#f5f5f5",
            borderColor: "#d0d0d0",
          },
        },
        sizeLarge: {
          padding: "12px 32px",
          fontSize: "1.125rem",
        },
        sizeSmall: {
          padding: "6px 16px",
          fontSize: "0.875rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "none",
          border: "1px solid #e0e0e0",
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "none",
          border: "1px solid #e0e0e0",
        },
        elevation1: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        },
        elevation2: {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#ffffff",
            "& fieldset": {
              borderColor: "#e0e0e0",
            },
            "&:hover fieldset": {
              borderColor: "#d0d0d0",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#000000",
            },
          },
        },
      },
    },
  },
});

export function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default theme;

