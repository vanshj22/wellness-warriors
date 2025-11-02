"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import {
  LocationOn,
  FilterList,
  Search,
  People,
  CalendarToday,
  Accessible,
  Person,
  Directions,
  Star,
  FiberNew,
} from "@mui/icons-material";

interface CommunityScreenProps {
  onBack?: () => void;
}

interface Group {
  id: string;
  name: string;
  condition: string;
  conditionColor: string;
  distance: string;
  members: number;
  meets: string;
  ageRange: string;
  description: string;
  location: string;
  isMember: boolean;
  isRecommended?: boolean;
  isNew?: boolean;
}

export function CommunityScreen({ onBack }: CommunityScreenProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const filterOptions = [
    { id: "near-me", label: "Near Me", icon: LocationOn },
    { id: "my-condition", label: "My Condition", icon: Person },
    { id: "similar-age", label: "Similar Age", icon: Accessible },
  ];

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleApplyFilters = () => {
    setShowFilterModal(false);
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
  };

  const groups: Group[] = [
    {
      id: "1",
      name: "Knee Recovery Support - Sydney",
      condition: "ACL Rehabilitation",
      conditionColor: "#10b981",
      distance: "2.3 km away",
      members: 12,
      meets: "Meets weekly",
      ageRange: "55-70 years",
      description: "Friendly group for knee replacement recovery. We share progress, tips, and meet for gentle walks at Centennial Park.",
      location: "Centennial Park, Sydney",
      isMember: false,
      isRecommended: true,
    },
    {
      id: "2",
      name: "Back Pain Support Group",
      condition: "Lower Back Pain",
      conditionColor: "#2563eb",
      distance: "5.1 km away",
      members: 18,
      meets: "Meets weekly",
      ageRange: "50-75 years",
      description: "Supportive community for managing lower back pain through gentle exercises and shared experiences.",
      location: "Bondi Beach, Sydney",
      isMember: true,
    },
    {
      id: "3",
      name: "Shoulder Rehabilitation Circle",
      condition: "Shoulder Rehabilitation",
      conditionColor: "#f59e0b",
      distance: "3.8 km away",
      members: 8,
      meets: "Meets fortnightly",
      ageRange: "60-75 years",
      description: "Small group focused on shoulder recovery exercises and sharing recovery journeys.",
      location: "Parramatta, Sydney",
      isMember: false,
      isNew: true,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100%",
        background: "#ffffff",
        pb: 10,
        position: "relative",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none !important",
        },
      }}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      } as React.CSSProperties}
    >
      <Container maxWidth="sm" sx={{ py: 3, px: 3, position: "relative" }}>
      {/* Header */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", height: 72 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1a1a1a",
              fontSize: "28px",
              letterSpacing: "-0.02em",
            }}
          >
            Community
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <IconButton
              onClick={() => setShowFilterModal(true)}
              sx={{
                width: 40,
                height: 40,
                color: "#1a1a1a",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
              }}
              aria-label="Filter"
            >
              <FilterList />
            </IconButton>
            <IconButton
              onClick={() => setShowSearch(true)}
              sx={{
                width: 40,
                height: 40,
                color: "#1a1a1a",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
              }}
              aria-label="Search"
            >
              <Search />
            </IconButton>
          </Box>
        </Box>


        {/* Group Cards */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {groups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: 2,
                  border: group.isMember ? "1px solid #10b981" : "1px solid #e0e0e0",
                  borderLeft: group.isMember ? "4px solid #10b981" : "none",
                  p: 2,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  position: "relative",
                }}
              >
                {/* Badges */}
                {(group.isRecommended || group.isNew || group.isMember) && (
                  <Box sx={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 0.5 }}>
                    {group.isRecommended && (
                      <Star sx={{ fontSize: 20, color: "#fbbf24" }} />
                    )}
                    {group.isNew && (
                      <Box
                        sx={{
                          backgroundColor: "#2563eb",
                          color: "#ffffff",
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          fontWeight: 600,
                        }}
                      >
                        N
                      </Box>
                    )}
                    {group.isMember && (
                      <Box
                        sx={{
                          backgroundColor: "#10b981",
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </Box>
                )}

                {/* Top Section */}
                <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: `${group.conditionColor}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <People sx={{ fontSize: 32, color: group.conditionColor }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#1a1a1a",
                        fontSize: "20px",
                        mb: 0.5,
                      }}
                    >
                      {group.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "inline-block",
                        backgroundColor: group.conditionColor,
                        color: "#ffffff",
                        px: 1.2,
                        py: 0.3,
                        borderRadius: 1.5,
                        fontSize: "12px",
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      {group.condition}
                    </Box>
                  </Box>
                </Box>

                {/* Quick Stats */}
                <Box sx={{ display: "flex", gap: 2, mb: 1.5, alignItems: "center" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <LocationOn sx={{ fontSize: 18, color: "#666666" }} />
                    <Typography variant="body2" sx={{ color: "#666666", fontSize: "14px" }}>
                      {group.distance}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <People sx={{ fontSize: 18, color: "#666666" }} />
                    <Typography variant="body2" sx={{ color: "#666666", fontSize: "14px" }}>
                      {group.members}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <CalendarToday sx={{ fontSize: 18, color: "#666666" }} />
                    <Typography variant="body2" sx={{ color: "#666666", fontSize: "14px" }}>
                      Weekly
                    </Typography>
                  </Box>
                </Box>

                {/* Action Button */}
                <Button
                  fullWidth
                  sx={{
                    backgroundColor: group.isMember ? "#ffffff" : "#000000",
                    color: group.isMember ? "#1a1a1a" : "#ffffff",
                    border: group.isMember ? "1px solid #e0e0e0" : "none",
                    height: 44,
                    fontSize: "16px",
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: group.isMember ? "#f5f5f5" : "#1a1a1a",
                    },
                  }}
                >
                  {group.isMember ? "View" : "Join"}
                  </Button>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>

      {/* Filter Modal */}
      <Dialog
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxWidth: { xs: "90%", sm: 500 },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#1a1a1a",
            pb: 2,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          Filters
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {filterOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedFilters.includes(option.id);
              return (
            <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Box
                    onClick={() => handleFilterToggle(option.id)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: 2,
                      border: isSelected ? "2px solid #000000" : "1px solid #e0e0e0",
                      backgroundColor: isSelected ? "#f9f9f9" : "#ffffff",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        borderColor: isSelected ? "#000000" : "#d0d0d0",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: isSelected ? "#000000" : "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: 20,
                          color: isSelected ? "#ffffff" : "#1a1a1a",
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "#1a1a1a",
                        }}
                      >
                        {option.label}
                      </Typography>
                    </Box>
                    <Checkbox
                      checked={isSelected}
                      sx={{
                        color: "#000000",
                        "&.Mui-checked": {
                          color: "#000000",
                        },
                      }}
                    />
                  </Box>
            </motion.div>
              );
            })}
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions
          sx={{
            p: 2.5,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button
            onClick={handleClearFilters}
            sx={{
              color: "#666666",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.05)",
              },
            }}
          >
            Clear All
          </Button>
          <Button
            onClick={handleApplyFilters}
            variant="contained"
            sx={{
              backgroundColor: "#000000",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "16px",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#1a1a1a",
              },
            }}
          >
            Apply Filters
            {selectedFilters.length > 0 && ` (${selectedFilters.length})`}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}