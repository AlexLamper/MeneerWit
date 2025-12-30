"use client";

import { useState, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";

export function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setIsSupported(document.fullscreenEnabled);
    });

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
    }
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={toggleFullscreen}
      className="w-10 h-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center hover:bg-secondary/80 transition-colors shadow-md"
      title={isFullscreen ? "Verlaat volledig scherm" : "Volledig scherm"}
    >
      {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
    </button>
  );
}
