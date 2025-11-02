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
      main: "#012a4a", // Prussian blue
      light: "#01497c",
      dark: "#000c14",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#2a6f97", // UCLA Blue
      light: "#61a5c2",
      dark: "#013a63",
      contrastText: "#ffffff",
    },
    success: {
      main: "#61a5c2", // Air superiority blue
      light: "#89c2d9",
      dark: "#468faf",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#2c7da0", // Cerulean
      light: "#61a5c2",
      dark: "#014f86",
      contrastText: "#ffffff",
    },
    error: {
      main: "#468faf", // Air Force blue
      light: "#61a5c2",
      dark: "#2a6f97",
      contrastText: "#ffffff",
    },
    info: {
      main: "#01497c", // Indigo dye
      light: "#2a6f97",
      dark: "#012a4a",
      contrastText: "#ffffff",
    },
    background: {
      default: "#a9d6e5", // Light blue
      paper: "#ffffff",
    },
    text: {
      primary: "#012a4a", // Prussian blue
      secondary: "#013a63",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
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
          borderRadius: 12,
          padding: "10px 24px",
          fontSize: "1rem",
          fontWeight: 600,
          boxShadow: "none",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
          },
        },
        sizeLarge: {
          padding: "14px 32px",
          fontSize: "1.125rem",
        },
        sizeSmall: {
          padding: "8px 16px",
          fontSize: "0.875rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          "&:hover": {
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-4px)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            transform: "translateY(-2px) scale(1.05)",
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

