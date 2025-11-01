"use client";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NarrationButtonProps {
  enabled: boolean;
  onToggle: () => void;
}

export function NarrationButton({ enabled, onToggle }: NarrationButtonProps) {
  return (
    <Button
      onClick={onToggle}
      variant={enabled ? "default" : "outline"}
      size="sm"
      className="h-12"
    >
      {enabled ? (
        <>
          <Volume2 className="mr-2 w-5 h-5" />
          Narration ON
        </>
      ) : (
        <>
          <VolumeX className="mr-2 w-5 h-5" />
          Narration OFF
        </>
      )}
    </Button>
  );
}

