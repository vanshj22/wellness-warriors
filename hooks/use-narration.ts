"use client";
import { useEffect, useRef, useState } from "react";

export function useNarration(enabled: boolean) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = (text: string, options?: { rate?: number; pitch?: number; volume?: number }) => {
    if (!enabled || !synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options?.rate ?? 1.3; // Faster rate for quicker narration
    utterance.pitch = options?.pitch ?? 1;
    utterance.volume = options?.volume ?? 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup: stop narration on unmount
      stop();
    };
  }, []);

  return { speak, stop, isSpeaking };
}

