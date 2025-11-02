"use client";
import { Box, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home, Groups, Person } from "@mui/icons-material";
import { motion } from "framer-motion";

interface BottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "community", label: "Community", icon: Groups },
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
        borderRadius: { xs: "24px 24px 0 0", sm: "0" },
        backgroundColor: "#ffffff",
        borderTop: "1px solid rgba(0, 0, 0, 0.08)",
      }}
      elevation={0}
    >
      <BottomNavigation
        value={activeTab}
        onChange={(_, newValue) => onNavigate(newValue)}
        sx={{
          backgroundColor: "transparent",
          height: { xs: 80, sm: 80 },
          "& .MuiBottomNavigationAction-root": {
            color: "#666666",
            minWidth: { xs: 60, sm: 60 },
            padding: { xs: "8px 4px", sm: "8px 4px" },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&.Mui-selected": {
              color: "#000000",
              backgroundColor: "#f5f5f5",
              borderRadius: "12px 12px 0 0",
              fontWeight: 600,
            },
            "& .MuiSvgIcon-root": {
              fontSize: { xs: "32px", sm: "32px" },
              transition: "all 0.3s ease",
              marginBottom: "4px",
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: 500,
              marginTop: "4px",
              "&.Mui-selected": {
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: 600,
              },
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
