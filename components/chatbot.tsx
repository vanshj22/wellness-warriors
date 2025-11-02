"use client";
import { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Button,
} from "@mui/material";
import { Send, Close, Chat } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

interface ChatbotProps {
  open: boolean;
  onClose: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function Chatbot({ open, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your virtual physiotherapist assistant. I'm here to support you with your exercises, answer questions about your rehabilitation, and help you stay motivated on your recovery journey. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");
    setLoading(true);

    try {
      // System instruction for physiotherapist persona
      const systemInstruction = `You are an experienced and empathetic physiotherapist assistant. Your role is to:
- ONLY answer questions related to physiotherapy, rehabilitation, exercises, pain management, mobility, and physical wellness
- If asked about topics outside of physiotherapy (like cooking, coding, general knowledge, etc.), politely decline and redirect them back to physiotherapy topics
- Provide helpful, evidence-based advice about exercises and rehabilitation
- Encourage patients and celebrate their progress
- Answer questions about pain, mobility, and recovery
- Offer modifications for exercises if someone is experiencing discomfort
- Remind patients about proper form and technique
- Be supportive and motivating, but also remind them to consult their healthcare provider for medical concerns
- Use simple, clear language that patients can understand
- Show genuine care for their wellbeing

IMPORTANT: If the user asks about anything unrelated to physiotherapy, politely say something like "I'm here to help with your physiotherapy and rehabilitation. Let's focus on your recovery - is there anything about your exercises or physical wellness I can help with?"

Keep responses concise (2-3 sentences maximum unless explaining exercises). Be warm and professional.`;

      // Build conversation history for context
      const conversationHistory = [
        {
          role: "user",
          parts: [{ text: systemInstruction }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I'll act as a supportive physiotherapist assistant, providing helpful guidance while being warm, professional, and concise." }],
        },
        ...messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      ];

      // Add current user message
      conversationHistory.push({
        role: "user",
        parts: [{ text: currentInput }],
      });

      // Use Gemini API with gemini-2.0-flash model (latest)
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSyDQxBNb7mOipQ_xw_GgPbn_dZMa1VekF88`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: conversationHistory,
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error:", errorData);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Check for errors in response
      if (data.error) {
        throw new Error(data.error.message || "API returned an error");
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that request.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Chatbot error:", error);
      let errorMessage = "I'm having trouble connecting right now. Please try again in a moment.";
      
      if (error?.message?.includes("API Error: 400")) {
        errorMessage = "There was an issue with the request. Please try rephrasing your question.";
      } else if (error?.message?.includes("API Error: 403")) {
        errorMessage = "API access issue. Please check the configuration.";
      } else if (error?.message?.includes("API Error: 429")) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      }
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        sx={{
          position: "absolute",
          bottom: 100,
          right: 16,
          width: "calc(100% - 32px)",
          maxWidth: 340,
          height: 500,
          zIndex: 2000,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          border: "1px solid #e0e0e0",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Chat sx={{ fontSize: 20, color: "#ffffff" }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a1a1a" }}>
              Wellness Assistant
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: "#1a1a1a",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
            }}
            size="small"
          >
            <Close />
          </IconButton>
        </Box>

        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: message.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  maxWidth: "80%",
                  backgroundColor: message.role === "user" ? "#000000" : "#f5f5f5",
                  color: message.role === "user" ? "#ffffff" : "#1a1a1a",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "16px",
                    lineHeight: 1.6,
                    wordWrap: "break-word",
                  }}
                >
                  {message.content}
                </Typography>
              </Paper>
            </Box>
          ))}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" sx={{ color: "#666666", fontSize: "16px" }}>
                  Thinking...
                </Typography>
              </Paper>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input */}
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            gap: 1,
            backgroundColor: "#ffffff",
          }}
        >
          <TextField
            fullWidth
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "16px",
                borderRadius: 2,
                "& fieldset": {
                  borderColor: "#e0e0e0",
                },
              },
            }}
          />
          <IconButton
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            sx={{
              backgroundColor: "#000000",
              color: "#ffffff",
              width: 48,
              height: 48,
              "&:hover": {
                backgroundColor: "#1a1a1a",
              },
              "&:disabled": {
                backgroundColor: "#e0e0e0",
                color: "#999999",
              },
            }}
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </AnimatePresence>
  );
}
