"use client";
import { Box, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home, Help, Person } from "@mui/icons-material";
import { motion } from "framer-motion";

interface BottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "help", label: "Help", icon: Help },
    { id: "profile", label: "Profile", icon: Person },
  ];

  return (
    <Paper
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
        borderRadius: "0 0 2.5rem 2.5rem",
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderTop: "1px solid rgba(0, 0, 0, 0.05)",
      }}
      elevation={0}
    >
      <BottomNavigation
        value={activeTab}
        onChange={(_, newValue) => onNavigate(newValue)}
        sx={{
          backgroundColor: "transparent",
          height: 70,
          "& .MuiBottomNavigationAction-root": {
            color: "text.secondary",
            minWidth: 60,
            padding: "8px 12px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&.Mui-selected": {
              color: "primary.main",
              fontWeight: 700,
              transform: "translateY(-2px)",
            },
            "& .MuiSvgIcon-root": {
              fontSize: "1.75rem",
              transition: "all 0.3s ease",
            },
            "&:hover": {
              backgroundColor: "rgba(1, 42, 74, 0.08)",
              borderRadius: 2,
            },
          },
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <BottomNavigationAction
              key={tab.id}
              label={tab.label}
              value={tab.id}
              icon={
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon />
                </motion.div>
              }
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  );
}
