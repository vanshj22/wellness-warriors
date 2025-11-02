"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

export const PhoneFrame = ({ children, className }: PhoneFrameProps) => {
  return (
    <>
      {/* Mobile: Full screen, no frame */}
      <div className={cn("md:hidden w-full h-screen overflow-hidden", className)}>
        <div className="w-full h-full bg-black overflow-auto hide-scrollbar">
          {children}
        </div>
      </div>

      {/* Desktop/Tablet: Show phone frame */}
      <div className={cn("hidden md:flex items-center justify-center min-h-screen p-4", className)}>
        {/* Phone Container */}
        <div className="relative w-[375px] h-[812px] max-h-[90vh] max-w-full bg-gray-900 rounded-[3rem] shadow-2xl p-2">
          {/* Phone Bezel */}
          <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[30px] bg-black rounded-b-3xl z-20" />
            
            {/* Status Bar Area */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-800/20 to-transparent z-10 flex items-center justify-between px-8 pt-2">
              <div className="text-white text-xs font-semibold">9:41</div>
              <div className="flex items-center gap-2">
                {/* Signal bars */}
                <div className="flex items-end gap-0.5">
                  <div className="w-[3px] h-[4px] bg-white rounded-t" />
                  <div className="w-[3px] h-[6px] bg-white rounded-t" />
                  <div className="w-[3px] h-[8px] bg-white rounded-t" />
                  <div className="w-[3px] h-[10px] bg-white rounded-t" />
                </div>
                {/* Battery */}
                <div className="flex items-center gap-0.5">
                  <div className="w-[22px] h-[11px] border border-white rounded-sm">
                    <div className="w-[16px] h-[7px] bg-white rounded-sm m-[2px]" />
                  </div>
                  <div className="w-[2px] h-[6px] bg-white rounded-r" />
                </div>
              </div>
            </div>

            {/* Screen Content */}
            <div className="relative w-full h-full bg-transparent overflow-auto rounded-[2.5rem] hide-scrollbar">
              {children}
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/50 rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
};

