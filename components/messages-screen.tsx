"use client";
import { Box, Container, Typography, Button, Avatar, Badge } from "@mui/material";
import { Chat, ArrowBack } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useState } from "react";

interface MessagesScreenProps {
  onBack: () => void;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  group: string;
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "SC",
    lastMessage: "Hey! Are you planning to join the walk this Saturday at Centennial Park?",
    time: "2h ago",
    unread: 2,
    group: "Knee Recovery Support",
  },
  {
    id: "2",
    name: "Michael Torres",
    avatar: "MT",
    lastMessage: "Thanks for the tips on the exercises. Would love to meet up and practice together!",
    time: "5h ago",
    unread: 0,
    group: "Back Pain Support Group",
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "EW",
    lastMessage: "Can you tell me more about the group? I'm interested in joining the next meetup.",
    time: "1d ago",
    unread: 1,
    group: "Shoulder Rehabilitation Circle",
  },
  {
    id: "4",
    name: "David Park",
    avatar: "DP",
    lastMessage: "Are we still meeting tomorrow at 3pm? I can bring some exercise mats.",
    time: "1d ago",
    unread: 0,
    group: "Knee Recovery Support",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    avatar: "LA",
    lastMessage: "How long have you been part of this group? Would love to hear about your progress!",
    time: "2d ago",
    unread: 0,
    group: "Back Pain Support Group",
  },
  {
    id: "6",
    name: "James Thompson",
    avatar: "JT",
    lastMessage: "Planning a weekend meetup next week. Would you be interested?",
    time: "3d ago",
    unread: 0,
    group: "Shoulder Rehabilitation Circle",
  },
];

export function MessagesScreen({ onBack }: MessagesScreenProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const getAvatarColor = (initials: string) => {
    const colors = [
      "#10b981",
      "#2563eb",
      "#f59e0b",
      "#8b5cf6",
      "#ec4899",
      "#06b6d4",
    ];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

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
      <Container maxWidth="sm" sx={{ py: 2, px: 2, position: "relative" }}>
        {/* Header */}
        <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center", height: 72 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#1a1a1a",
              fontSize: "28px",
              letterSpacing: "-0.02em",
            }}
          >
            Messages
          </Typography>
        </Box>

        {/* Conversation List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {conversations.map((conversation, index) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Box
                onClick={() => setSelectedConversation(conversation.id)}
                sx={{
                  display: "flex",
                  gap: 2,
                  p: 2,
                  borderRadius: 2,
                  cursor: "pointer",
                  backgroundColor: selectedConversation === conversation.id ? "#f5f5f5" : "#ffffff",
                  border: "1px solid #e0e0e0",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                    borderColor: "#d0d0d0",
                  },
                }}
              >
                {/* Avatar */}
                <Badge
                  badgeContent={conversation.unread > 0 ? conversation.unread : 0}
                  color="error"
                  invisible={conversation.unread === 0}
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "11px",
                      fontWeight: 600,
                      minWidth: 18,
                      height: 18,
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      backgroundColor: getAvatarColor(conversation.avatar),
                      color: "#ffffff",
                      fontSize: "18px",
                      fontWeight: 600,
                    }}
                  >
                    {conversation.avatar}
                  </Avatar>
                </Badge>

                {/* Message Content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: "#1a1a1a",
                        fontSize: "16px",
                      }}
                    >
                      {conversation.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#666666",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        ml: 1,
                      }}
                    >
                      {conversation.time}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#666666",
                      fontSize: "12px",
                      display: "block",
                      mb: 0.5,
                    }}
                  >
                    {conversation.group}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: conversation.unread > 0 ? "#1a1a1a" : "#666666",
                      fontSize: "14px",
                      fontWeight: conversation.unread > 0 ? 500 : 400,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {conversation.lastMessage}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
