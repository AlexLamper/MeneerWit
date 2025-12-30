"use client";

import { useState, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";

interface DocumentWithFullscreen extends Document {
  webkitFullscreenEnabled?: boolean;
  webkitFullscreenElement?: Element;
  webkitExitFullscreen?: () => Promise<void>;
}

interface HTMLElementWithFullscreen extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
}

export function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      // Check for standard or webkit prefixed support
      const doc = document as DocumentWithFullscreen;
      const enabled = doc.fullscreenEnabled || doc.webkitFullscreenEnabled;
      setIsSupported(!!enabled);
    });

    const handleFullscreenChange = () => {
      // Check for standard or webkit prefixed fullscreen element
      const doc = document as DocumentWithFullscreen;
      const isFull = !!doc.fullscreenElement || !!doc.webkitFullscreenElement;
      setIsFullscreen(isFull);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      const doc = document as DocumentWithFullscreen;
      const docEl = document.documentElement as HTMLElementWithFullscreen;

      if (!doc.fullscreenElement && !doc.webkitFullscreenElement) {
        if (docEl.requestFullscreen) {
          await docEl.requestFullscreen();
        } else if (docEl.webkitRequestFullscreen) {
          await docEl.webkitRequestFullscreen();
        }
      } else {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        }
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
